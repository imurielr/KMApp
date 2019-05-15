""" Module to add a new user --> used when a new user logs in """

from flask import request
from flask_restful import Resource, reqparse

from pymongo import MongoClient

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('usuario')

# Connect to the database host given by MongoDB URI
client = MongoClient('mongodb://imurielr:gdoHZU57@knowledgemanagment-shard-00-00-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-01-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-02-bxu9d.mongodb.net:27017/test?ssl=true&replicaSet=KnowledgeManagment-shard-0&authSource=admin&retryWrites=true')
# Access to the specific database
db = client.KMDB

collection = db.Usuario

class AddUser(Resource):
    """ Class to add a new user to the database """
        
    def post(self):  
        args = parser.parse_args(strict=True) # Parse the given arguments
        # Create a dicttionary containing the info given in the arguments
        new_user = {
                    "usuario": args["usuario"],
                    "puntos": 5,
                }

        # Add the new user to the database
        try:
            user_id = collection.insert_one(new_user)
            return 200
        except:
            return "El usuario ya existe"