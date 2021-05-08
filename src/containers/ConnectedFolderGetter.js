import { connect } from 'react-redux'
import * as actions from '../action'
import FolderGetter from '../components/FolderGetter'

function mapStateToProps(state) {
    return {
        rootFolder: state.fileSystem.rootFolder,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRootFolder: (event) => dispatch(actions.setRootFolder(
            event.target.value,
        )),
        fetchListFolderBeginGen: (folder) => {
            return (event) => dispatch(actions.fetchListFolderBegin(
                folder,
            ))
        },
    }
}

function mergeProps(stateProps, dispatchProps) {
    return {
        rootFolder: stateProps.rootFolder,
        setRootFolder: dispatchProps.setRootFolder,
        fetchListFolderBegin: dispatchProps.fetchListFolderBeginGen(
            stateProps.rootFolder,
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FolderGetter)