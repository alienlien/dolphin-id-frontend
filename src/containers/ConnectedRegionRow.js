import { connect } from 'react-redux'
import * as actions from '../action'
import RegionRow from '../components/RegionRow'


function mapStateToProps(state) {
    return {
        target: state.target,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setTripDate: (event) => dispatch(actions.setTripDate(
            event.target.value,
            ownProps.region.index,
        )),
        setTripNumber: (event) => dispatch(actions.setTripNumber(
            event.target.value,
            ownProps.region.index,
        )),
        setGroupID: (event) => dispatch(actions.setGroupID(
            event.target.value,
            ownProps.region.index,
        )),
        setKUID: (event) => dispatch(actions.setKUID(
            event.target.value,
            ownProps.region.index,
        )),
        deleteRegion: (event) => dispatch(actions.deleteRegion(
            ownProps.region.index,
        )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionRow)
