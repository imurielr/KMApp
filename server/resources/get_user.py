""" Module to get the user """

from flask import request
from flask_restful import Resource

from resources.connect_to_DB import client, db

import json
from bson import json_util

collection = db.Usuario

class GetUser(Resource):
    """ Class to get the information of certain user from the database """

    def get(self, user_id):
        """ Get user information """

        query = {"usuario": user_id}
        user = list(collection.find(query, { "_id":0 }))
        if len(user) > 0:
            user = json.dumps(user, default=json_util.default)
            result = json.loads(user)
            return result[0]
        else:
            return "Usuario no existe"