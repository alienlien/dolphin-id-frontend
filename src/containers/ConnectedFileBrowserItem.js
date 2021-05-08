import { connect } from 'react-redux'
import * as actions from '../action'
import FileBrowserItem from '../components/FileBrowserItem'
import * as utils from '../utils'

function mapStateToProps(state) {
    return {
        imageData: state.image,
        regions: state.regions,
        aggData: state.aggData,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadFileGen: (imageData, regions) => {
            const fileExt = utils.getExtension(ownProps.path).toLowerCase()
            if (fileExt === 'json') {
                return (event) => {
                    event.preventDefault()
                    dispatch(actions.importViaFileBegin(ownProps.path))
                }
            }

            if ((fileExt === 'jpg') || (fileExt === 'jpeg')) {
                return (event) => {
                    event.preventDefault()
                    // Set img src (for display)
                    dispatch(actions.setImgSrc(
                        ownProps.path,
                    ))

                    // Set path to image data.
                    dispatch(actions.setImagePath(
                        ownProps.path,
                    ))

                    // Set agg data.
                    dispatch(actions.setAggData(
                        imageData,
                        regions,
                    ))

//                 // Load corresponding data for new path, which is provided
//                 // by the own props.
//                 dispatch(actions.setImageAll(
//                     newImageData,
//                 ))
//                 dispatch(actions.setRegions(
//                     newRegions,
//                 ))
                }
            }
        },
        setDataGen: (imageData, regions, newImageData, newRegions) => {
            return (event) => {
                event.preventDefault()
                // Set img src (for display)
                dispatch(actions.setImgSrc(
                    ownProps.path,
                ))

                // Set path to image data.
                dispatch(actions.setImagePath(
                    ownProps.path,
                ))

                // Set agg data.
                dispatch(actions.setAggData(
                    imageData,
                    regions,
                ))

//                 // Load corresponding data for new path, which is provided
//                 // by the own props.
//                 dispatch(actions.setImageAll(
//                     newImageData,
//                 ))
//                 dispatch(actions.setRegions(
//                     newRegions,
//                 ))
            }
        },
        fetchListFolderBegin: (event) => {
            dispatch(actions.fetchListFolderBegin(ownProps.path))
        },
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const newData = getImageRegionsData(ownProps, stateProps.aggData)
    return Object.assign(
        {},
        ownProps,
        {
            setData: dispatchProps.setDataGen(
                stateProps.imageData,
                stateProps.regions,
                newData.imageData,
                newData.regions,
            ),
            loadFile: dispatchProps.loadFileGen(
                stateProps.imageData,
                stateProps.regions,
            ),
            fetchListFolderBegin: dispatchProps.fetchListFolderBegin,
        },
    )
}

function getImageRegionsData(ownProps, aggData) {
    if (!ownProps.path || aggData === undefined) {
        return {
            imageData: {},
            regions: [],
        }
    }

    const newKey = utils.getBasename(ownProps.path)
    if (!(newKey in aggData)) {
        return {
            imageData: {},
            regions: [],
        }
    }
    
    const newData = aggData[newKey]
    return {
        imageData: newData.image,
        regions: newData.regions,
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FileBrowserItem)
