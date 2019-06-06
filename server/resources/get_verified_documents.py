""" Module to get the verified documents """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

from datetime import datetime, timedelta

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class GetVerified(Resource):
    """ Class to get the verified documents """

    def get(self):
        """ Returns all the documents that are verified in the database """

        query = {"verificado": True}
        documents = list(collection.find(query, {"_id": 0}))
        if len(documents) > 0:
            documents = json.dumps(documents, default=GetVerified.myconverter)
            result = json.loads(documents)
            documents = []
            for i in range(0, len(result)):
                documents.append((result[i]['nombre'], result[i]['responsable'], result[i]['especialidad'], result[i]['area'], result[i]['datos'], result[i]['realizado'], result[i]['diferencia'], result[i]['porque'], result[i]['resultados'], result[i]['repeticion'], result[i]['validez']))
            return documents
        else:
            return "No hay documentos"

    def myconverter(o):
        if isinstance(o, datetime):
            return o.__str__()[0:10]   # Return date as string following the sintax YYYY-MM-DD