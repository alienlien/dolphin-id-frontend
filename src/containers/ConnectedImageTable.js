import { connect } from 'react-redux'
import * as actions from '../action'
import ImageTable from '../components/ImageTable'

function mapStateToProps(state) {
    return {
        image: state.image,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setImageTripDate: (event) => dispatch(actions.setImageTripDate(
            event.target.value,
        )),
        setImageTripNumber: (event) => dispatch(actions.setImageTripNumber(
            event.target.value,
        )),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTable)