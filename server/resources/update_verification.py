""" Module to update the knowledge verification status """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

from datetime import datetime

collection = db.objeto_de_conocimiento

class UpdateStatus(Resource):

    def put(self, responsable, documento, validez):
        """ Validez sintax --> Month DD YYYY """
    
        # Get document that belong to the user and match the title given
        query = {
                    "responsable": responsable, 
                    "nombre": documento
                }
        collection.update(query, { "$set":{"verificado": True, "validez": datetime.strptime(validez, '%b %d %Y')}})  # Change the verification field to True
        return "Verificacion exitosa"
