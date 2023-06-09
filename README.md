# Getting Started

Clone or download the repository and start by typing the following commands.

## Running Flask Application

In one terminal you can start the python application by `backend/` being your root directory.

### Creating virtual environment

Create a virtual environment and activate it by following the commands (in Linux):

#### `python3 -m venv venv`

#### `source venv/bin/activate`

### Installing dependencies

Run the following command to install the dependencies.

#### `pip install -r requirements.txt`

The `config.py` consists of database configurations which needs to be filled. So create your own MongoDB database and collection and modify the variables provided.

### Starting the application

Run the following command to start the application

#### `python3 index.py`

It will open by default in the following URL:

http://localhost:5005

## Running React Application

In another terminal, make `frontend/` as your root directory and execute the following commands:

### For installing dependencies

#### `npm install`

### Starting the application

Run the following command to start the create-react-application

#### `npm start`

It runs the app in the development mode at the following URL:

http://localhost:3000

The `sample.png` is provided in the backend for your reference.

## Building Docker Images

After the application is running successfully by populating the table as per the user input , go to the root directory where docker-compose.yml file is present and run the following command:

#### `docker-compose up`

This will initiate building the Dockerimage for flask as well as for react as per the Dockerfile provided in the `frontend/` and `backend/` folders and start the containers automatically. This execution step will take around 5 minutes to finish.

After it is done, go to http://localhost:3000 and you should see the webpage displayed.

<p align="center">
  <img src="https://github.com/harshan1996/iTask/blob/production/backend/sample.png" width="900" title="UI">
</p>

## API documentation

We have 3 APIs in the flask application.

### API name

Upload file

### API endpoint

`/upload`

### API description

This will takes the uploaded CSV file upon clicking the `UPLOAD` button and stores the details contained in the CSV file in the MongoDB database. The CSV file is stored in the `uploads/`

### Request type

`POST`

### Request payload

```
form data:
KEY:file
VALUE:sample.csv

```

### Response payload

```
{
  "message": "successfully saved",
  "filename": uploaded_filename,
  "status_code": 200
 }
```

### API name

Fetch filtered items

### API endpoint

`/fetch`

### API description

This will get triggered when user selects the `start date` and `end date` and clicks the `Fetch Data And Generate Report` button.
The data is read and filtered from the CSV file as per the timestamps and accordingly images are taken from the `images/` folder. The fetched images are encoded and sent it to the react application. The report.csv file is generated which contains the `items` and the `occurrences` in the given dates.

### Request type

`GET`

### Request payload

```
params:
start_date=2021-10-20
end_date=2021-10-22
```

### Response payload

```
{
    "data": [
        [
            "20-10-2021-10-21-17-398092.jpg",
            "mobile,knife,e-cigarette",
            "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAKfAXkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/..truncated"
}
```

### API name

check documents in collection

### API endpoint

`/check_database`

### API description

This API is used to check the documents in the collection.

### Request type

`GET`
