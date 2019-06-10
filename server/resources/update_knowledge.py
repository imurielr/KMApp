""" Module to update the knowledge verification status """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

from datetime import datetime

collection = db.objeto_de_conocimiento

class UpdatePost(Resource):

    def put(self,documento, datos, realizado,diferencia, porque, resultados):
        collection.update( {"nombre":documento}, { "$set":{"verificado": False,"validez":None,"datos": datos,"realizado": realizado, "diferencia": diferencia, "porque": porque,"resultados": resultados }}) 
        
        return "Edición exitosa"
