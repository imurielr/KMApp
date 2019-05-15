from pymongo import MongoClient

# Connect to the database host given by MongoDB URI
client = MongoClient('mongodb://imurielr:gdoHZU57@knowledgemanagment-shard-00-00-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-01-bxu9d.mongodb.net:27017,knowledgemanagment-shard-00-02-bxu9d.mongodb.net:27017/test?ssl=true&replicaSet=KnowledgeManagment-shard-0&authSource=admin&retryWrites=true')
# Access to the specific database
db = client.KMDB