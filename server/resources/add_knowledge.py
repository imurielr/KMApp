""" Module to add knowledge object """

from flask import request
from flask_restful import Resource, reqparse

from pymongo import MongoClient

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('titulo')
parser.add_argument('responsable')
parser.add_argument('especialidad')
parser.add_argument('area')

# Connect to the database host given by MongoDB URI
client = MongoClient('mongodb://imurielr:gdoHZU57@knowledgemanagment-shard-00-00-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-01-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-02-bxu9d.mongodb.net:27017/test?ssl=true&replicaSet=KnowledgeManagment-shard-0&authSource=admin&retryWrites=true')
# Access to the specific database
db = client.KMDB

collection = db.objeto_de_conocimiento

class AddKnowledge(Resource):
    """ Class to add a new knowledge object """

    def post(self):
        args = parser.parse_args(strict=True)  # Parse the given arguments
        # Create a dicttionary containing the info given in the arguments
        post = {
                    "titulo": args["titulo"],
                    "responsable": args["responsable"],
                    "especialidad": args["especialidad"],
                    "area": args["area"],
                    "fecha_publicacion": datetime.datetime.utcnow(),
                    "ultima_modificacion": datetime.datetime.utcnow()
                }

        # Add the knowledge object to the database using the dictionary
        try:
            post_id = collection.insert_one(post)
            return post_id
        except:
            return "ERROR"
