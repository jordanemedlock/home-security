import os

from flask import Flask, _app_ctx_stack, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from sqlalchemy.orm import scoped_session


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_url_path='', static_folder='frontend/build')
    CORS(app) # comment this on deployment
    app.config.from_mapping(
        SECRET_KEY='dev'
    )
    api = Api(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import models
    from .db import SessionLocal, engine
    models.Base.metadata.create_all(bind=engine)

    from .auth import Login, Register
    api.add_resource(Login, '/api/login')
    api.add_resource(Register, '/api/register')

    # from . import auth
    # app.register_blueprint(auth.bp)

    from .dashboard import Panel
    api.add_resource(Panel, '/api/panel')
    # app.register_blueprint(dashboard.bp)
    # app.add_url_rule('/', endpoint='index')

    @app.route("/<path>", defaults={'path':''})
    def serve(path):
        return send_from_directory(app.static_folder,'index.html')

    app.session = scoped_session(SessionLocal)

    return app