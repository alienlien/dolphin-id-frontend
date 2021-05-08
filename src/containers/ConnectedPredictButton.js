import { connect} from 'react-redux'
import PredictButton from '../components/PredictButton'
import * as actions from '../action'

function mapStateToProps(state) {
    return {
        imgSrc: state.fileSystem.imgSrc,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        reqPredictGen: (imgSrc) => {
            return (event) => {
                dispatch(actions.predictRegionsBegin(
                    imgSrc,
                ))
            }
        },
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        imgSrc: stateProps.imgSrc,
        reqPredict: dispatchProps.reqPredictGen(stateProps.imgSrc),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PredictButton)