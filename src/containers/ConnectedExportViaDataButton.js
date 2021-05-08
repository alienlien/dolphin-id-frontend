import { connect } from 'react-redux'
import * as actions from '../action'
import ExportViaDataButton from '../components/ExportViaDataButton'
import * as utils from '../utils'

function mapStateToProps(state) {
    return {
        rootFolder: state.fileSystem.rootFolder,
        data: state.aggData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        exportDataBeginGen: (folder, data) => {
            return (event) => dispatch(actions.exportViaDataBegin(
                folder,
                data,
            ))
        },
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        exportViaDataBegin: dispatchProps.exportDataBeginGen(
            stateProps.rootFolder,
            utils.toViaAggData(stateProps.data),
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ExportViaDataButton)