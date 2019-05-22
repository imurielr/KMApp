""" Module to get the users points """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

collection = db.Usuario

class GetTop(Resource):
    """ Class to get the users points from the database """

    def get(self):
        """ Get users points """
        # curl http://localhost:5000/<usuario>
        points = list(db.collection.find().sort({"puntos":-1}).limit(10) )   # Get a list with the resultsc      
        points= json.dumps(points, default=json_util.default)
        return points
        
