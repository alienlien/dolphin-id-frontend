# Dolphin-id-frontend

Create the front end for dolphin ID labeling platform. 
It provides the following functions 

- Label the dolphin fins and their corresponding ids.
- Load the old label data.
- Save the label data.
- Predict the regions and corresponding IDs (with GCP auto ML prediction API).

## Usage

- Start the frontend first (by following the steps below)

- Input the data folder to get its files list 

It returns all the images, label data (json) and sub-folders.

- Load the old label data

Select the label file (json) directly.
Note the format is of exactly the same format with the VIA v1.

[Reference](https://www.robots.ox.ac.uk/~vgg/software/via/)

- Label the image with IDs

- One can calls the `Predict image` function to get the prediction first.

Remember to enable the prediction function first by the following steps.

- Save/Export the label data 

The label data are exported with the same format as VIA v1.

[Reference](https://www.robots.ox.ac.uk/~vgg/software/via/)

- Remember to press the `Load Image Data` button when loading every image.

It would refresh the current label data and load the one for current image.


## Start the fronend 

- Runs the backend for local IO first.

Start the backend first by running the following script at `dolphin-id-backend` repo.
The details can be referred to the documents for `dolphin-id-backend`.

```
python3 -m script.run
```

- Start the frontend with npm

It should be started at port `3000`

```
$ npm run start

Compiled successfully!

You can now view dolphin-id-web-js in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

- Try to use the frontend 

```
http://localhost:3000/
```


## Enable the prediction function.

The frontend now uses GCP auto ml to prediction regions with their corresponding labels,
where the calling uses the REST API for auto ml.

### Set GCP cli tools.

- Install the GCP CLI tool

[Reference](https://cloud.google.com/storage/docs/gsutil_install)

- Check all the projects one can access. Make sure that `photo-id-2021` should be one of them.
 
```
$ gcloud projects list
PROJECT_ID                NAME            PROJECT_NUMBER
dolphin-for-test          Dolphin         392850099759
photo-id-2021             Photo ID        148229944099
```

- Switch to the project `photo-id-2021`

```
$ gcloud config set project photo-id-2021
Updated property [core/project].
```

- Check the project for now

```
$ gcloud config get-value project
photo-id-2021
```

### Set the env for GCP auto ml

- Remember to deploy the model first through CLI tools or web.

[Reference](https://cloud.google.com/vision/automl/object-detection/docs/quickstart)

- Create a service account to use the predict api for auto ML.
- Get the credential in the form of json file

Following the procedures on the official documents.

[Reference](https://cloud.google.com/vision/automl/docs/client-libraries)

- Export the env var `GOOGLE_APPLICATION_CREDENTIALS` for the key file (json)

```
export GOOGLE_APPLICATION_CREDENTIALS=./gcp_key.json
```

- Get the token

```
$ gcloud auth application-default print-access-token
ya29.c.Kp8B_geM9TyzcCxHJXDFe3ANbm0_t2Kkwg8AWPiJ4eUhC...
```

- Set the params with the token in `src/sagas/predictRegionsSaga.js`

```
const projectId = 'photo-id-2021'
const location = 'us-central1'
const modelId = 'IOD7039540183707942912'
const predictUrl = `https://automl.googleapis.com/v1/projects/${projectId}/locations/${location}/models/${modelId}:predict`
const token = 'ya29.c.Kp8B_gfgzRr7ZVQgjK9qUw_Eu....'
```

[Reference](https://cloud.google.com/vision/automl/docs/predict#automl_vision_classification_predict-drest)

- Try the prediction function on frontend.


