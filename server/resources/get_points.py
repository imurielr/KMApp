""" Module to get the users points """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

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
            return result[0]["puntos"]
        else:
            return "Usuario no existe"
