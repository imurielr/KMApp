import os

# Import dependecies from flask and flask-restful 
from flask import Flask
from flask_restful import Resource, Api

# Import all the resources to be used in the server
from resources.get_points import GetPoints
from resources.add_knowledge import AddKnowledge
from resources.add_user import AddUser
from resources.update_points  import UpdatePoints

# Create the app and define it as a rest api.
app = Flask(__name__)
api = Api(app)

# add every resource to a specific url endpoint
api.add_resource(GetPoints, '/<string:user_id>')
api.add_resource(AddKnowledge, '/docs')
api.add_resource(AddUser, '/')
api.add_resource(UpdatePoints, '/<string:user_id>/<string:num_points>')

# Main --> run the server
if __name__ == "__main__":
    app.run(debug=True)