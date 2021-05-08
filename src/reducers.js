import { combineReducers } from 'redux'
import * as actions from './action'
import * as uuid from 'uuid'
import * as path from 'path'
import * as lodash from 'lodash'
import * as utils from './utils'

function setTarget(target = {}, action) {
    switch (action.type) {
        case actions.REGION_STATE_UNCHANGED:
            return {
                index: target.index,
                state: null,
            }
        case actions.REGION_STATE_MOVE:
            return {
                index: action.index,
                state: action.type,
                oldX: action.oldX,
                oldY: action.oldY,
                clientPosX: action.clientPosX,
                clientPosY: action.clientPosY,
            }
        case actions.REGION_STATE_RESIZE:
            return {
                index: action.index,
                state: action.type,
                resizeCornerDir: action.resizeCornerDir,
                oppositeCornerX: action.oppositeCornerX,
                oppositeCornerY: action.oppositeCornerY,
            }
        case actions.CREATE_REGION:
            return {
                index: action.index,
                state: null, 
            }
        case actions.DELETE_REGION:
            let new_index
            if (action.index < target.index) {
                new_index = target.index - 1
            } else if (action.index === target.index) {
                new_index = -1
            } else {
                new_index = target.index
            }

            return Object.assign(
                {},
                target,
                {
                    index: new_index,
                }
            )
        default:
            return target
    }
}

function fixDim(oldDim, shift, length) {
    let newDimRaw = oldDim + shift
    if ((newDimRaw + length) >= 100) {
        return 100 - length
    } else if (newDimRaw <= 0) {
        return 0
    } else {
        return newDimRaw
    }
}

function getRectFromOppositeCorners(
    corner1,
    corner2) {
        let x = Math.max(Math.min(corner1.x, corner2.x), 0)
        let y = Math.max(Math.min(corner1.y, corner2.y), 0)
        let lowerRightX = Math.min(Math.max(corner1.x, corner2.x), 100)
        let lowerRightY = Math.min(Math.max(corner1.y, corner2.y), 100)
        return {
            x: x,
            y: y,
            width: lowerRightX - x,
            height: lowerRightY - y,
        }
    }


function setRegions(regions = [], action) {
    let region
    let newRegion
    switch (action.type) {
        case actions.CREATE_REGION:
            region = {
    			x: action.x,
    			y: action.y,
    			width: action.width,
                height: action.height,
                index: regions.length,
    			new: true,
    			data: {},
    			isChanging: true
            }
            return [
                ...regions,
                region,
            ]
        case actions.MOVE_REGION:
            let oldRegion = regions[action.index]
            let newX = fixDim(action.oldX, action.newClientPosX - action.oldClientPosX, oldRegion.width)
            let newY = fixDim(action.oldY, action.newClientPosY - action.oldClientPosY, oldRegion.height)
            newRegion = Object.assign(
                {},
                regions[action.index],
                {
                    x: newX,
                    y: newY,
                    width: oldRegion.width,
                    height: oldRegion.height,
                }
            )
            return [
                ...regions.slice(0, action.index),
                newRegion,
                ...regions.slice(action.index+1) 
            ]
        case actions.RESIZE_REGION:
            region = regions[action.index]
            const oppositeCorner = {
                x: action.oppositeCornerX,
                y: action.oppositeCornerY,
            }
            const resizeCorner = {
                x: action.clientPosX,
                y: action.clientPosY,
            }
            let rect = getRectFromOppositeCorners(
                oppositeCorner,
                resizeCorner,
            )
            newRegion = Object.assign(
                {},
                region,
                {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                }
            )
            return [
                ...regions.slice(0, action.index),
                newRegion,
                ...regions.slice(action.index+1) 
            ]
        case actions.DELETE_REGION:
            let tailRegions = regions.slice(action.index+1).map((region) => 
                Object.assign(
                    {},
                    region,
                    {
                        'index': region.index - 1,
                    },
                )
            )
            return regions.slice(0, action.index).concat(tailRegions)
        case actions.IMAGE_SET_META:
            if (("width" in action.meta) && ("height" in action.meta)) {
                return regions.map(function(region) {
                    return fixRegionFromVia(
                        region,
                        action.meta.width,
                        action.meta.height,
                    ) 
                })
            }
            return regions
        case actions.SET_TRIP_DATE:
        case actions.SET_TRIP_NUMBER:
        case actions.SET_GROUP_ID:
        case actions.SET_KU_ID:
            return [
                ...regions.slice(0, action.index),
                updateRegion(regions[action.index], action),
                ...regions.slice(action.index+1)
            ]
        case actions.SET_REGIONS:
            return action.regions
        case actions.REGIONS_PREDICT_SUCCESS:
            const currentIndex = regions.length
            const predRegions = action.payload.regions.map(
                (region, idx) => toRegionFromPredictDatum(region, String(currentIndex + idx))
            )
            return regions.concat(predRegions)
        default:
            return regions
    }
}

function fixRegionFromVia(region, imageWidth, imageHeight) {
    if (!("via" in region.data)) {
        return region
    }

    // No need to fix.
    if (("x" in region) && ("y" in region) && ("width" in region) && ("height" in region)) {
        return region
    }

    const viaRegionData = region.data.via
    const x = (viaRegionData.x / imageWidth) * 100.0
    const y = (viaRegionData.y / imageHeight) * 100.0
    const width = (viaRegionData.width / imageWidth) * 100.0
    const height = (viaRegionData.height / imageHeight) * 100.0
    return Object.assign(
        {},
        region,
        {
            "x": x,
            "y": y,
            "width": width,
            "height": height,
        }
    )
}

function updateRegion(region, action) {
    return Object.assign(
        {},
        region,
        {
            'data': updateRegionData(
                region.data,
                action
            )
        }
    )
}

function updateRegionData(data, action) {
    switch (action.type) {
        case actions.SET_TRIP_DATE:
            return updateTripDateData(data, action.date)
        case actions.SET_TRIP_NUMBER:
            return updateTripNumberData(data, action.num)
        case actions.SET_GROUP_ID: 
            return updateGroupIDData(data, action.groupId)
        case actions.SET_KU_ID:
            return updateKUIDData(data, action.kuId)
        default:
            return data
    }
}

function updateTripDateData(data, date) {
    return Object.assign(
        {},
        data,
        {
            'tripDate': date,
        }
    )
}

function updateTripNumberData(data, num) {
    return Object.assign(
        {},
        data,
        {
            'tripNum': num
        }
    )
}

function updateGroupIDData(data, groupId) {
    return Object.assign(
        {},
        data,
        {
            'groupId': groupId,
        }
    )
}

function updateKUIDData(data, kuId) {
    return Object.assign(
        {},
        data,
        {
            'kuId': kuId,
        }
    )
}

function toRegionFromPredictDatum(datum, index) {
    const labels = datum.labels.map(function(label) {
        return {
            kuId: label.kuId,
            groupId: label.groupId,
            prob: label.prob,
        }
    })

    return {
        x: datum.x,
        y: datum.y,
        width: datum.width,
        height: datum.height,
        index: index,
        data: labels.length > 0 ? labels[0] : {},
        prediction: labels,
    }    
}

const DEFAULT_ROOT_FOLDER = '/Users/Alien/workspace/project/private/dolphin-id-backend/data/'
const DEFAULT_IMG_SRC = 'http://localhost:5000/img'

const DEFAULT_FILE_SYSTEM = {
    rootFolder: DEFAULT_ROOT_FOLDER,
    imgSrc: DEFAULT_IMG_SRC,
    fileContents: [],
}

function setFileSystem(state = DEFAULT_FILE_SYSTEM, action) {
    switch (action.type) {
        case actions.FILESYSTEM_SET_ROOT_FOLDER:
            return setRootFolder(state, action.rootFolder)
        case actions.FILESYSTEM_SET_IMG_SRC:
            return setImgSrc(state, action.path, action.api)
        case actions.FILESYSTEM_FETCH_LIST_SUCCESS:
            return setRootFolderContents(state, action.contents)
        default:
            return state
    }
}

function setRootFolder(data, rootFolder) {
    return Object.assign(
        {},
        data,
        {
            'rootFolder': rootFolder,
        },
    )
}

function setImgSrc(data, path, api) {
    return Object.assign(
        {},
        data,
        {
            'imgSrc': getImgSrcApi(path, api),
        },
    )
}

function getImgSrcApi(path, api) {
    return `${api}/img?img_path=${path}`
}

function setRootFolderContents(data, result) {
    const contents = toContentsFromResult(result)
    if (!data.fileContents || data.fileContents.length === 0) {
        return Object.assign(
           {},
           data,
           {
               'fileContents': contents.contents,
           },
        )
    }

    return updateSubFolder(data, contents)
}

function toContentsFromResult(result) {
    const rawContents = result.contents
    const dirs = rawContents.dirs.map(
        path => toFolderContent(path)
    ) 
    const files = rawContents.files.map(
        path => toFileContent(path)  
    )
    return {
        'targetFolder': result.root_dir,
        'contents': dirs.concat(files),
    }
}

function toFolderContent(path) {
    return {
        tp: 'folder',
        path: path,
        contents: [],
        id: uuid.v4(),
    } 
}

function toFileContent(path) {
    return {
        tp: 'file',
        path: path,
        id: uuid.v4(),
    }
}

function updateSubFolder(data, contents) {
    const targetFolder = contents.targetFolder
    const targetSubFolders = targetFolder
        .replace(data.rootFolder, "")
        .split('/')

    var baseFolder = data.rootFolder
    var oldContents = data.fileContents 
    for (var i = 0; i < targetSubFolders.length - 1; i++) {
        baseFolder = path.join(baseFolder, targetSubFolders[i])

        for (var j = 0; j < oldContents.length; j++) {
            if (oldContents[j].path === baseFolder) {
                oldContents = oldContents[j].contents
            }
        }
    }

    // Last one
    for (var k = 0; k < oldContents.length; k++) {
        if (oldContents[k].path === targetFolder) {
            oldContents[k].contents = contents.contents
        }
    }
    return lodash.cloneDeep(data)
}

function setImage(data = {}, action) {
    switch (action.type) {
        case actions.IMAGE_SET_PATH:
            return Object.assign(
                {},
                data,
                {
                    'path': action.path,
                },
            )
        case actions.IMAGE_SET_META:
            return Object.assign(
                {},
                data,
                {
                    'meta': action.meta,
                },
            )
        case actions.IMAGE_SET_TRIP_DATE:
            return Object.assign(
                {},
                data,
                {
                    'tripDate': action.date,
                },
           )
        case actions.IMAGE_SET_TRIP_NUMBER:
            return Object.assign(
                {},
                data,
                {
                    'tripNumber': action.number,
                }
            )
        case actions.IMAGE_SET_ALL:
            return action.data
        default:
            return data
    }
}

// FIXME: Fix the field `data` with `image` for sync.
function setAggData(data = {}, action) {
    switch (action.type) {
        case actions.AGG_SET_DATA:
            if (!action.imageData.hasOwnProperty('path')) {
                return data
            }
            const fileName = utils.getBasename(action.imageData.path)
            return Object.assign(
                {},
                data,
                {
                    [fileName]: {
                        'data': action.imageData,
                        'regions': action.regions,
                    },                 
                }
            )
        case actions.FILESYSTEM_IMPORT_VIA_FILE_SUCCESS:
            // TODO: Find a better way to merge both data.
            return Object.assign(
                {},
                data,
                utils.fromViaAggData(action.data),
            )
        default:
            return data
    }

}

export default combineReducers({
    image: setImage,
    regions: setRegions,
    target: setTarget,
    fileSystem: setFileSystem,
    aggData: setAggData,
})
