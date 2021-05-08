import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../action'

function* importViaFile(action) {
    const url = `${action.api}/label?file_path=${action.path}`
    console.log(url)
    const contents = yield call(
        () => fetch(url)
            .then(response => response.json()),
    );
    yield put(actions.importViaFileSuccess(contents));  
}

function* importViaFileSaga() {
    yield takeEvery(actions.FILESYSTEM_IMPORT_VIA_FILE_BEGIN, importViaFile);
}
  
export default importViaFileSaga;