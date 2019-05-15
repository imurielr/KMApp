""" Module to update the users points """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

collection = db.Usuario

class UpdatePoints(Resource):
    """ Class to update the users points """

    def put(self, user_id, num_points):
        """ Update users points adding to the existing ones 'num_points' """
        # curl http://localhost:5000/<usuario>/<puntos> -X PUT

        query = {"usuario": user_id}   # Look for the given user in the database
        result = list(collection.find(query, { "_id": 0, "usuario": 1, "puntos": 1 }))   # Get a list with the results
        if len(result) > 0:   # If the user exists add 'num_points' to the existing ones
            result = json.dumps(result, default=json_util.default)
            points = json.loads(result)
            new_points = points[0]["puntos"] + int(num_points)
            points = {"puntos": points[0]["puntos"]}
            update = { "$set": {"puntos": new_points} }
            collection.update_one(points, update)
            return "Puntos actualizados: {}".format(new_points)
        else:
            return "Usuario no existe"
