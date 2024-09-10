from flask import Flask

def create_app():
    app = Flask(__name__)
    # Import and register blueprints
    from .routes import main
    app.register_blueprint(main)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

    return app