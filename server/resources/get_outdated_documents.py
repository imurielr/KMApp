""" Module to get the outdated documents based on a certain time """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

from datetime import datetime, timedelta

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class GetOutdated(Resource):
    """ Class to get the outdated documents that belong to the user """

    def get(self, user):
        """ Returns the documents that will expire in 5 or less days """

        query = {
            'responsable': user,
            'verificado': True
        }
        documents = list(collection.find(query, {'_id':0}))
        if len(documents) > 0:
            documents = json.dumps(documents, default=GetOutdated.myconverter)
            result = json.loads(documents)
            documents = []
            for i in range(0, len(result)):
                # if datetime.strptime(result[i]['ultima_modificacion'], '%Y-%m-%d') < (datetime.strptime(result[i]['validez'], '%Y-%m-%d') - timedelta(5)):
                if datetime.today() >= (datetime.strptime(result[i]['validez'], '%Y-%m-%d') - timedelta(5)):
                    documents.append(result[i]['titulo'])
            return documents
        else:
            return "No hay documentos desactualizados"

    def myconverter(o):
        if isinstance(o, datetime):
            return o.__str__()[0:10]   # Return date as string following the sintax YYYY-MM-DD