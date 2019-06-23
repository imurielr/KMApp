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
from resources.get_charge import GetCharge
from resources.get_documents import GetDocuments
from resources.update_verification import UpdateStatus
from resources.get_user import GetUser
from resources.get_verified_documents import GetVerified
from resources.update_knowledge import UpdatePost
from resources.get_search import GetSearch

print('Ejecutando servidor')

def say_hello(username = "World"):
    return '<p>Hello %s!</p>\n' % username
# Create the app and define it as a rest api.
application = Flask(__name__)
api = Api(application)
CORS(application)  # Allow all domains to access the server

# add every resource to a specific url endpoint
api.add_resource(GetPoints, "/points/<string:user_id>")
api.add_resource(GetTop,"/get_top")
api.add_resource(AddKnowledge, "/docs")
api.add_resource(AddUser, "/add_user")
api.add_resource(UpdatePoints, "/update_points/<string:user_id>/<string:num_points>")
api.add_resource(GetOutdated, "/outdated/<string:user>")
api.add_resource(GetCharge, "/tipo/<string:user_id>")
api.add_resource(GetDocuments, "/get_docs")
api.add_resource(UpdateStatus, "/update_status/<string:responsable>/<string:documento>/<string:validez>")
api.add_resource(GetUser, "/user/<string:user_id>")
api.add_resource(GetVerified, "/verified")
api.add_resource(UpdatePost,"/edit/<string:documento>/<string:datos>/<string:realizado>/<string:diferencia>/<string:porque>/<string:resultados>")
api.add_resource(GetSearch,"/search/<string:nombre>/<string:area>/<string:solucion>/<string:proceso>")

header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a RESTful web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'

application.add_url_rule('/', 'index', (lambda: header_text +
    say_hello() + instructions + footer_text))   


# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()