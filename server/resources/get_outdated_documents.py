""" Module to get the outdated documents based on a certain time """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import datetime

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class GetOutdated(Resource):
    """ Class to get the outdated documents that belong to the user """

    def get(self, user):
        """ Get outdated documents """

        day_limit_to_update = 5  # Number of days before showing notification

        date = datetime.datetime.now() - datetime.timedelta(day_limit_to_update)

        query = {
            'responsable': user,
            'ultima_modificacion': {'$lt': date} 
        }
        documents = list(collection.find(query))
        if len(documents) > 0:
            documents = json.dumps(documents, default=json_util.default)
            result = json.loads(documents)
            documents = []
            for i in range(0, len(result)):
                documents.append(result[i]['titulo'])
            return documents
        else:
            return "No hay documentos desactualizados"


