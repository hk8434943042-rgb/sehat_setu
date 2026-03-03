from flask import Flask
from flask_cors import CORS

from .db import close_db, init_db, seed_db
from .public.routes import public_bp
from .admin.routes import admin_bp
from .patient.routes import patient_bp
from .appointment.routes import appointment_bp
from .ai import ai_bp
from .errors import register_error_handlers


def create_app():
    app = Flask(__name__)
    app.config.from_object('flask_app.config')

    # Enable CORS for frontend (local + deployed clients)
    CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })

    # Register error handlers
    register_error_handlers(app)

    # Blueprints
    app.register_blueprint(public_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(patient_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(ai_bp)

    # DB hooks
    app.teardown_appcontext(close_db)

    # Initialize + seed if empty
    init_db(app)
    seed_db(app)

    return app
