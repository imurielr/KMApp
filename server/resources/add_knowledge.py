""" Module to add knowledge object """

from flask import request
from flask_restful import Resource, reqparse

from resources.connect_to_DB import client, db

import datetime

# Add expected arguments
parser = reqparse.RequestParser()
parser.add_argument('nombre')
parser.add_argument('tema')
parser.add_argument('responsable')
parser.add_argument('especialidad')
parser.add_argument('area')
parser.add_argument('datos')
parser.add_argument('realizado')
parser.add_argument('diferencia')
parser.add_argument('porque')
parser.add_argument('resultados')
parser.add_argument('repetible')
parser.add_argument('repeticion')
parser.add_argument('solucion')
parser.add_argument('proceso')

collection = db.objeto_de_conocimiento

class AddKnowledge(Resource):
    """ Class to add a new knowledge object """

    def post(self):
        # curl http://localhost:5000/docs -d "nombre=<nombre>&tema=<tema>&responsable=<responsable>&especialidad=<especialidad>&area=<area>..." -X POST
        args = parser.parse_args(strict=True)  # Parse the given arguments

        # Create a dicttionary containing the info given in the arguments
        post = {
                    "nombre": args["nombre"],
                    "tema": args["tema"],
                    "responsable": args["responsable"],
                    "especialidad": args["especialidad"],
                    "area": args["area"],
                    "datos": args["datos"],
                    "realizado": args["realizado"],
                    "diferencia": args["diferencia"],
                    "porque": args["porque"],
                    "resultados": args["resultados"],
                    "repetible": args["repetible"],
                    "repeticion": args["repeticion"],
                    "fecha_publicacion": datetime.datetime.utcnow(),
                    "ultima_modificacion": datetime.datetime.utcnow(),
                    "verificado": False,
                    "solucion": args["solucion"],
                    "proceso": args["proceso"],
                }

        # Add the knowledge object to the database using the dictionary
        try:
            post_id = collection.insert_one(post)
            return "Objeto añadido exitosamente"
        except:
            return "ERROR"
