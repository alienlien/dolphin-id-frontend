import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../action'
// Ref: https://cloud.google.com/vision/automl/object-detection/docs/predict 

const projectId = 'photo-id-2021'
const location = 'us-central1'
const modelId = 'IOD7039540183707942912'
const predictUrl = `https://automl.googleapis.com/v1/projects/${projectId}/locations/${location}/models/${modelId}:predict`
const token = ''

function* predictRegions(action) {
    const imageUrl = action.imgPath
    console.log(imageUrl)
    const blob = yield call(
        () => fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => getBlob(blob))
    )
    const base64Data = blob.split(',')[1]
    const result = yield call(
        () => fetch(predictUrl, genPredictParams(base64Data, token))
            .then(response => response.json())
            .catch(error => console.log(error))
    )
    console.log(result)

    const payload = {
        regions: result.payload.map((box) => fromGCPBox(box)),
    }
    console.log(payload)

    yield put(actions.predictRegionsSuccess(payload))
}

function fromGCPBox(box) {
    console.log(box)
    const left_upper_point = box.imageObjectDetection.boundingBox.normalizedVertices[0]
    const right_lower_point = box.imageObjectDetection.boundingBox.normalizedVertices[1]
    const out = {
        x: left_upper_point.x * 100.0,
        y: left_upper_point.y * 100.0,
        width: (right_lower_point.x - left_upper_point.x) * 100.0,
        height: (right_lower_point.y - left_upper_point.y) * 100.0,
        labels: [
            toDolphinID(box.displayName, box.imageObjectDetection.score),
        ],
    }
    console.log(out)
    return out
}

function toDolphinID(name, score) {
    if (name.startsWith('ku')) {
        const kuId = parseInt(name.split('_')[1])
        return {
            kuId: kuId,
            prob: score,
        }
    }

    return {
        groupId: name,
        prob: score,
    }
}

function genPredictParams(base64Image, token) {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + String(token),
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            "payload": {
                "image": {
                    "imageBytes": base64Image,
                },
            },
            "params": {
                "score_threshold": "0.1",
                "max_bounding_box_count": "100",
            },
        }),
    }
}

function getBlob(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
}

function* predictRegionsSaga() {
    yield takeEvery(actions.REGIONS_PREDICT_BEGIN, predictRegions);
}
  
export default predictRegionsSaga;


//     const client = new PredictionServiceClient();
//     const request = {
//       name: client.modelPath(projectId, location, modelId),
//       payload: {
//         image: {
//           imageBytes: content,
//         },
//       },
//       params: {
//         score_threshold: '0.01',
//         max_bounding_box_count: '10',
//       },
//     };
//   
//     const [response] = yield call(
//         () => client.predict(request)
//     );
//   
//     for (const annotationPayload of response.payload) {
//       console.log(`Predicted class name: ${annotationPayload.displayName}`);
//       console.log(
//         `Predicted class score: ${annotationPayload.imageObjectDetection.score}`
//       );
//       console.log('Normalized vertices:');
//       for (const vertex of annotationPayload.imageObjectDetection.boundingBox
//         .normalizedVertices) {
//         console.log(`\tX: ${vertex.x}, Y: ${vertex.y}`);
//       }
//     }


//     const payload = {
//         regions: [
//             {   
//                 x: 10,
//                 y: 10,
//                 width: 20,
//                 height: 30,
//                 labels: [
//                     {
//                         ku_id: 100,
//                         prob: 0.99,
//                     },
//                     {
//                         trip_id: '20200101_13',
//                         prob: 0.01
//                     },
//                 ]
//             },
//             {
//                 x: 50,
//                 y: 5,
//                 width: 10,
//                 height: 40,
//                 labels: [
//                     {
//                         trip_id: '20050403_22',
//                         prob: 1.0,
//                     },
//                 ]
//             },
//             {
//                 x: 30,
//                 y: 80,
//                 width: 50,
//                 height: 5,
//                 labels: [
//                     {
//                         ku_id: 20,
//                         trip_id: '20100405_42',
//                         prob: 0.7,
//                     },
//                     {
//                         ku_id: 11,
//                         trip_id: '20130405_5',
//                         prob: 0.2,
//                     },
//                     {
//                         ku_id: 44,
//                         trip_id: '20160113_24',
//                         prob: 0.1,
//                     },
//                 ]
//             },
//         ],
//     }

// {
//     annotationSpecId: 5130976564132970496,
//     imageObjectDetection: {
//         boundingBox: {
//             "normalizedVertices": [
//                 {
//                     x: 0.62515473,
//                     y: 0.36490858
//                 },
//                 {
//                     x: 0.71434844,
//                     y: 0.4854888
//                 }
//             ]
//         },
//         score: 0.27356985
//     },
//     displayName: ku_018
// },

