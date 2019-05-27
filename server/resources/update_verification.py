""" Module to update the knowledge verification status """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

collection = db.objeto_de_conocimiento

class UpdateStatus(Resource):

    def put(self, responsable, documento):

        # Get document that belong to the user and match the title given
        query = {
                    "responsable": responsable, 
                    "titulo": documento
                }
        collection.update(query, { "$set":{"verificado": True}})  # Change the verification field to True
        return "Verificacion exitosa"
