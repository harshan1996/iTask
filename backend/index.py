from config import MONGODB_URI, COLLECTION_NAME, DATABASE_NAME
from pymongo import MongoClient
from flask import Flask, request
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

client = MongoClient(MONGODB_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]


@app.route('/')
def index():
    return {"message": "success"}


@app.route("/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        try:
            if 'file' not in request.files:
                return {"error": "No file uploaded", "status_code": 400}
            else:
                file = request.files['file']

                if file.filename.endswith("csv"):
                    global uploaded_filename
                    uploaded_filename = file.filename

                    file.save('uploads/' + uploaded_filename)
                    data = pd.read_csv(f"uploads/{uploaded_filename}")

                    # convert dataframe to list of dictionaries
                    data_dict = data.to_dict(orient='records')

                    # insert data into MongoDB
                    collection.insert_many(data_dict)

                    return {"message": "successfully saved", "filename": uploaded_filename, "status_code": 200}
                else:
                    return {"message": "please upload a CSV file", "status_code": 406}
        except Exception as e:
            return {"error": "unknown exception occurred", "status_code": 500}


@app.route("/fetch", methods=["GET"])
def fetch():
    try:
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")

        read_csv = pd.read_csv(f'uploads/{uploaded_filename}')

        filtered_rows = read_csv.loc[read_csv["timestamp"].between(
            start_date, end_date, inclusive="both")]

        all_details = list()
        for filtered_row in filtered_rows.iterrows():

            without_image = [filtered_row[1]["image_name"],
                             filtered_row[1]["objects_detected"]]
        # -------------------------Encoding the image---------------------------------

            if filtered_row[1]["image_name"] in os.listdir("images/"):
                with open(f"images/{filtered_row[1]['image_name']}", "rb") as image:
                    from base64 import b64encode
                    image_string = b64encode(image.read())
                    without_image.append(image_string.decode('ascii'))
                all_details.append(without_image)

        # -------------------------Generating report.csv------------------------------

        import csv
        from collections import Counter
        only_items = list()
        for data in all_details:
            stripped_items = data[1].split(",")
            only_items.extend(stripped_items)

        counting_items = Counter(only_items)

        with open("report.csv", "w", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['Threat', 'Occurrences'])

            # Write the data rows
            for item, count in counting_items.items():
                writer.writerow([item, count])

        return {"data": all_details, "status_code": 200}
    except Exception as e:
        return {"message": "unknown exception occurred", "status_code": 500}

#  This API is used to check the total documents in DB which were inserted from CSV file


@app.route("/check_database", methods=["GET"])
def check_database():
    data_from_db = list(collection.find({}))
    data_in_db = []
    for doc in data_from_db:
        doc["_id"] = str(doc["_id"])
        data_in_db.append(doc)
    return {"data": data_in_db}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5005)))
