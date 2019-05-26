""" Module to update the knowledge verification status """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class UpdateStatus(Resource):

    def put(self, responsable, documento):

        query = {
                    "responsable": responsable, 
                    "titulo": documento
                }
        collection.update(query, { "$set":{"verificado": True}})
        return "Verificacion exitosa"
        # result = list(collection.find(query))
        # # result = json.dumps(result, default=json_util.default)
        # # document = json.loads(result)
        # # return document[0]["verificado"]
        # if len(result) > 0:   # If the user exists add 'num_points' to the existing ones
        #     result = json.dumps(result, default=json_util.default)
        #     document = json.loads(result)
        #     verification = {"verificado": document[0]["verificado"]}
        #     update = {"$set": {"verificado": True}}
        #     collection.update_one(verification, update)
        #     return "Verificacion exitosa"
        # else:
        #     return "Error: no se encuentra el documento"
