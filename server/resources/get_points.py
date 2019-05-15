""" Module to get the users points """

from flask import request
from flask_restful import Resource

from pymongo import MongoClient

import json
from bson import json_util

# Connect to the database host given by MongoDB URI
client = MongoClient('mongodb://imurielr:gdoHZU57@knowledgemanagment-shard-00-00-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-01-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-02-bxu9d.mongodb.net:27017/test?ssl=true&replicaSet=KnowledgeManagment-shard-0&authSource=admin&retryWrites=true')
# Access to the specific database
db = client.KMDB

collection = db.Usuario

class GetPoints(Resource):
    """ Class to get the users points from the database """

    def get(self, user_id):
        """ Get users points """
        # curl http://localhost:5000/<usuario>
        query = {"usuario": user_id}   # Look for the given user in the database
        points = list(collection.find(query, { "_id": 0, "usuario": 1, "puntos": 1 }))   # Get a list with the results
        if len(points) > 0:   # If the  user exists return its points
            points = json.dumps(points, default=json_util.default)
            result = json.loads(points)
            return "Puntos: {}".format(result[0]["puntos"])
        else:
            return "Usuario no existe"

    # def put(self, user_id):
    #     """ Update users points (Add 50 points -> for now) """
    #     # curl http://localhost:5000/imurielr -X PUT

    #     # points[user_id] = request.form['points']
    #     points[user_id] += 50
    #     return {user_id: points[user_id]}

