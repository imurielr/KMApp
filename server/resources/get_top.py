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
        # curl http://localhost:5000/get_top

        points = list(collection.find().sort([('puntos', -1)]).limit(10))  # Get a list with the results
        points= json.dumps(points, default=json_util.default)
        result = json.loads(points)
        top = []
        for i in range(0, len(result)):
            top.append({'usuario':(result[i]['usuario']),'puntos':(result[i]['puntos'])})
        return top
        
