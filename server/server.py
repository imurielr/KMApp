import os

# Import dependecies from flask and flask-restful 
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

# Import all the resources to be used in the server
from resources.get_points import GetPoints
from resources.add_knowledge import AddKnowledge
from resources.add_user import AddUser
from resources.update_points  import UpdatePoints
from resources.get_outdated_documents import GetOutdated
from resources.get_top import GetTop

print('Ejecutando servidor')
# Create the app and define it as a rest api.
app = Flask(__name__)
api = Api(app)
CORS(app)  # Allow all domains to access the server

# add every resource to a specific url endpoint
api.add_resource(GetPoints, "/points/<string:user_id>")
api.add_resource(GetTop,"/get_top")
api.add_resource(AddKnowledge, "/docs")
api.add_resource(AddUser, "/add_user")
api.add_resource(UpdatePoints, "/update_points/<string:user_id>/<string:num_points>")
api.add_resource(GetOutdated, "/outdated/<string:user>")

# Main --> run the server
if __name__ == "__main__":
    app.run(debug=True)