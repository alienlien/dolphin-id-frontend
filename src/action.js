export const SET_TRIP_DATE = 'SET_TRIP_DATE'
export const SET_TRIP_NUMBER = 'SET_TRIP_NUMBER'
export const SET_GROUP_ID = 'SET_GROUP_ID'
export const SET_KU_ID = 'SET_KU_ID'
export const SET_PREDICTION = 'SET_PREDICTION'

export const SET_REGIONS = 'SET_REGIONS'
export const SET_REGION_IS_CHANGING = 'SET_REGION_IS_CHANGING'

export const CREATE_REGION = 'CREATE_REGION'
export const RESIZE_REGION = 'RESIZE_REGION'
export const MOVE_REGION = 'MOVE_REGION'
export const DELETE_REGION = 'DELETE_REGION'

export const REGION_STATE_UNCHANGED = 'REGION_STATE_UNCHANGED'
export const REGION_STATE_MOVE = 'REGION_STATE_MOVE'
export const REGION_STATE_RESIZE = 'REGION_STATE_RESIZE'

export const FILESYSTEM_SET_ROOT_FOLDER = 'FILESYSTEM_SET_ROOT_FOLDER'
export const FILESYSTEM_FETCH_LIST_BEGIN = 'FILESYSTEM_FETCH_LIST_BEGIN'
export const FILESYSTEM_FETCH_LIST_SUCCESS = 'FILESYSTEM_FETCH_LIST_SUCCESS'
export const FILESYSTEM_SET_IMG_SRC = 'FILESYSTEM_SET_IMG_SRC'
export const FILESYSTEM_EXPORT_DATA_BEGIN = 'FILESYSTEM_EXPORT_DATA_BEGIN'
export const FILESYSTEM_EXPORT_DATA_SUCCESS = 'FILESYSTEM_EXPORT_DATA_SUCCESS'
export const FILESYSTEM_EXPORT_VIA_DATA_BEGIN = 'FILESYSTEM_EXPORT_VIA_DATA_BEGIN'
export const FILESYSTEM_EXPORT_VIA_DATA_SUCCESS = 'FILESYSTEM_EXPORT_VIA_DATA_SUCCESS'
export const FILESYSTEM_IMPORT_VIA_FILE_BEGIN = 'FILESYSTEM_IMPORT_VIA_FILE_BEGIN'
export const FILESYSTEM_IMPORT_VIA_FILE_SUCCESS = 'FILESYSTEM_IMPORT_VIA_FILE_SUCCESS'

export const REGIONS_PREDICT_BEGIN = 'REGIONS_PREDICT_BEGIN'
export const REGIONS_PREDICT_SUCCESS = 'REGIONS_PREDICT_SUCCESS'

export const IMAGE_SET_PATH = 'IMAGE_SET_PATH'
export const IMAGE_SET_META = 'IMAGE_SET_META'
export const IMAGE_SET_TRIP_DATE = 'IMAGE_SET_TRIP_DATE'
export const IMAGE_SET_TRIP_NUMBER = 'IMAGE_SET_TRIP_NUMBER'
export const IMAGE_SET_ALL = 'IMAGE_SET_ALL'

export const AGG_SET_DATA = 'AGG_SET_DATA'



const API_FILESYSTEM = 'http://localhost:5000'

export function createRegion(x, y, index) {
    return {
        type: CREATE_REGION,
        x: x,
        y: y,
        width: 10,
        height: 10,
        index: index,
    }
}

export function setRegionStateUnchanged(index) {
    return {
        type: REGION_STATE_UNCHANGED,
        index: index,
    }
}

export function setRegionStateMove(index, x, y, clientPosX, clientPosY) {
    return {
        type: REGION_STATE_MOVE,
        index: index,
        oldX: x,
        oldY: y,
        clientPosX: clientPosX,
        clientPosY: clientPosY,
    }
}

export function setRegionStateResize(
    index, 
    resizeCornerDir,
    oppositeCornerX,
    oppositeCornerY) {
    return {
        type: REGION_STATE_RESIZE,
        index: index,
        resizeCornerDir: resizeCornerDir,
        oppositeCornerX,
        oppositeCornerY,
    }
}


export function resizeRegion(
    index, 
    resizeCornerDir,
    oppositeCornerX,
    oppositeCornerY,
    clientPosX,
    clientPosY) {
    return {
        type: RESIZE_REGION,
        index: index,
        resizeCornerDir: resizeCornerDir,
        oppositeCornerX,
        oppositeCornerY,
        clientPosX: clientPosX,
        clientPosY: clientPosY,
    }
}

// TODO(alien): Use raw data in action, and leave the computation to reducer.
export function moveRegion(
    index,
    oldX,
    oldY, 
    oldClientPosX, 
    oldClientPosY, 
    newClientPosX, 
    newClientPosY) {
    return {
        type: MOVE_REGION,
        index: index,
        oldX,
        oldY,
        oldClientPosX: oldClientPosX,
        oldClientPosY: oldClientPosY,
        newClientPosX: newClientPosX,
        newClientPosY: newClientPosY,
    }
}

export function deleteRegion(index) {
    return {
        type: DELETE_REGION,
        index: index,
    }
}

export function modifyColor(color, index) {
    return {
        type: 'MODIFY_COLOR',
        color: color,
        index: index,
    }
}

export function setTripDate(date, index) {
    return {
        type: SET_TRIP_DATE,
        index: index,
        date: date,
    }
}

export function setTripNumber(num, index) {
    return {
        type: SET_TRIP_NUMBER,
        index: index,
        num: num,
    }
}

export function setGroupID(groupId, index) {
    return {
        type: SET_GROUP_ID,
        index: index,
        groupId: groupId, 
    }
}

export function setKUID(kuId, index) {
    return {
        type: SET_KU_ID,
        index: index,
        kuId: kuId, 
    }
}

export function setRegions(regions) {
    return {
        type: SET_REGIONS,
        regions: regions
    }
}

export function setRootFolder(rootFolder) {
    return {
        type: FILESYSTEM_SET_ROOT_FOLDER,
        rootFolder: rootFolder,
    }
}

export function fetchListFolderBegin(folder, api = API_FILESYSTEM) {
    return {
        type: FILESYSTEM_FETCH_LIST_BEGIN,
        folder: folder,
        api: api,
    }
}

export function fetchListFolderSuccess(contents) {
    return {
        type: FILESYSTEM_FETCH_LIST_SUCCESS,
        contents: contents,
    }
}

export function predictRegionsBegin(imgPath) {
    return {
        type: REGIONS_PREDICT_BEGIN,
        imgPath: imgPath,
    }
}

export function predictRegionsSuccess(payload) {
    return {
        type: REGIONS_PREDICT_SUCCESS,
        payload: payload,
    }
}

export function setImgSrc(path, api = API_FILESYSTEM) {
    return {
        type: FILESYSTEM_SET_IMG_SRC,
        path: path,
        api: api,
    }
}

export function setImagePath(path) {
    return {
        type: IMAGE_SET_PATH,
        path: path,
    }
}

export function setImageMeta(meta) {
    return {
        type: IMAGE_SET_META,
        meta: meta,
    }
}

export function setImageTripDate(date) {
    return {
        type: IMAGE_SET_TRIP_DATE,
        date: date,
    }
}

export function setImageTripNumber(number) {
    return {
        type: IMAGE_SET_TRIP_NUMBER,
        number: number,
    }
}

export function setImageAll(data) {
    return {
        type: IMAGE_SET_ALL,
        data: data,
    }
}

export function setAggData(imageData, regions) {
    return {
        type: AGG_SET_DATA,
        imageData: imageData,
        regions: regions,   
    }
}

export function exportDataBegin(folder, data, api = API_FILESYSTEM) { 
    return {
        type: FILESYSTEM_EXPORT_DATA_BEGIN,
        folder: folder,
        data: data,
        api: api,
    }
}

export function exportDataSuccess(contents) {
    alert(contents.comment)
    return {
        type: FILESYSTEM_EXPORT_DATA_SUCCESS,
        contents: contents,
    }
}

export function exportViaDataBegin(folder, data, api = API_FILESYSTEM) { 
    return {
        type: FILESYSTEM_EXPORT_VIA_DATA_BEGIN,
        folder: folder,
        data: data,
        api: api,
    }
}

export function exportViaDataSuccess(contents) {
    alert(contents.comment)
    return {
        type: FILESYSTEM_EXPORT_VIA_DATA_SUCCESS,
        contents: contents,
    }
}

export function importViaFileBegin(path, api = API_FILESYSTEM) {
    return {
        type: FILESYSTEM_IMPORT_VIA_FILE_BEGIN,
        path: path,
        api: api,
    }
}

export function importViaFileSuccess(contents) {
    if ("comment" in contents) {
        alert(contents.comment)
        return {
            type: FILESYSTEM_IMPORT_VIA_FILE_SUCCESS,
            data: {},
        }
    }
    console.log(contents)
    return {
        type: FILESYSTEM_IMPORT_VIA_FILE_SUCCESS,
        data: contents,
    }
}
