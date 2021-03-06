""" Module to add a new user --> used when a new user logs in """

from flask import request
from flask_restful import Resource, reqparse

from resources.connect_to_DB import client, db

import json
from bson import json_util

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('usuario')

collection = db.Usuario

class AddUser(Resource):
    """ Class to add a new user to the database """
        
    def post(self):  
        # curl http://localhost:5000/ -d "usuario=<usuario>" -X POST 
        args = parser.parse_args(strict=True) # Parse the given arguments
        # Create a dicttionary containing the info given in the arguments
        new_user = {
                    "usuario": args["usuario"],
                    "puntos": 5,
                    "tipo":"Practicante",
                }

        # Add the new user to the database
        try:
            user_id = collection.insert_one(new_user)
            return "Usuario agregado exitosamente"
            new_user = json.dumps(new_user, default=json_util.default)
            result = json.loads(new_user)
            return result
        except:
            return "El usuario ya existe"