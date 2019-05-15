""" Module to add knowledge object """

from flask import request
from flask_restful import Resource, reqparse

from resources.connect_to_DB import client, db

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('titulo')
parser.add_argument('responsable')
parser.add_argument('especialidad')
parser.add_argument('area')

collection = db.objeto_de_conocimiento

class AddKnowledge(Resource):
    """ Class to add a new knowledge object """

    def post(self):
        # curl http://localhost:5000/docs -d "titulo=<titulo>&responsable=<responsable>&especialidad=<especialidad>&area=<area>" -X POST
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
            return "Objeto añadido exitosamente"
        except:
            return "ERROR"
