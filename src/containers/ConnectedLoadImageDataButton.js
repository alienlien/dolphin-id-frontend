import { connect } from 'react-redux'
import * as actions from '../action'
import LoadImageDataButton from '../components/LoadImageDataButton'
import * as utils from '../utils'

function mapStateToProps(state) {
    return {
        image: state.image,
        data: getDataFromAggData(state.image.path, state.aggData)
    }
}

function getDataFromAggData(path, aggData) {
    if (path === undefined) {
        return {
            image: {},
            regions: [],
        }
    }

    const key = utils.getBasename(path)
    if (!(key in aggData)) {
        return {
            image: {},
            regions: [],
        }
    }
    return aggData[key]
}

function mapDispatchToProps(dispatch) {
    return {
        loadDataGen: (image, regions) => {
            return (event) => {
                event.preventDefault()

                dispatch(actions.setImageAll(
                    image,
                ))

                dispatch(actions.setRegions(
                    regions,
                ))
            }
        }
    }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    const image = Object.assign(
        {},
        stateProps.data.data,
        stateProps.image,
    )
    const regionsFixed = stateProps.data.regions.map(function(region) {
        return fixRegionFromVia(
            region,
            stateProps.image.meta.width,
            stateProps.image.meta.height,
        )
    })
    return Object.assign(
        {},
        ownProps,
        {
            loadData: dispatchProps.loadDataGen(
                image,
                regionsFixed,
            ),
        }
    )
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
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(LoadImageDataButton)
