""" Module to get the documents from the data base """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import datetime

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class GetDocuments(Resource):

    def get(self):

        query = {"verificado": False}
        documents = list(collection.find(query, {"_id": 0}))
        if len(documents) > 0:
            documents = json.dumps(documents, default=json_util.default)
            result = json.loads(documents)
            documents = []
            for i in range(0, len(result)):
                documents.append((result[i]['titulo'], result[i]['responsable'], result[i]['especialidad'], result[i]['area'], result[i]['area']))
            return documents
        else:
            return "No hay documentos"