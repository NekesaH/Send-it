from distutils.log import debug
from auth import auth_ns
from posts import posts_ns
from flask import Flask
from flask_restx import Api

from models import Slist, User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager


def create_app(config):

    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    migrate = Migrate(app,db)
    JWTManager(app)


    api = Api(app, doc='/docs')

    api.add_namespace(posts_ns)
    api.add_namespace(auth_ns)

    @app.shell_context_processor
    def make_shell_context():
        return{
            "db":db, 
            "SList":Slist,
            "User": User


                }
             
    return app

# modelserialization







# app.config['SQLALCHEMY_DATABASE_URI'] = ''
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)
# class Users(db.Model):
#     id = db.Column(db.Integer, primary_key= True)
#     name =db.Column(db.String(100))
#     email = db.Column(db.String(100))
#     password = db.Column(db.String(100))
    


# @api.route('/hello', methods=['GET'])
# class HelloResource(Resource):
#     def get(self):
#         return {'message':'hello world'}






