import { all } from 'redux-saga/effects';
import fetchListFolderSaga from './fetchListFolderSaga';
import exportViaDataSaga from './exportViaDataBeginSaga'
import importViaFileSaga from './importViaFileSaga'
import predictRegionsSaga from './predictRegionsSaga'

function* rootSaga() {
    yield all([
        fetchListFolderSaga(),
        exportViaDataSaga(),
        importViaFileSaga(),
        predictRegionsSaga(),
    ]);
}

export default rootSaga;
