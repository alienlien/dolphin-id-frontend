import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../action'

function* exportData(action) {
    console.log(action)
    const url = `${action.api}/save`
    const postInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'folder': action.folder,
            'data': action.data,
        }),
        mode: 'cors',
    }
    console.log(url)
    const contents = yield call(
        () => fetch(url, postInit)
            .then(response => response.json()),
    );
    yield put(actions.exportViaDataSuccess(contents));  
}

function* exportViaDataSaga() {
    yield takeEvery(actions.FILESYSTEM_EXPORT_VIA_DATA_BEGIN, exportData);
}

export default exportViaDataSaga;