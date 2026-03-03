"""
Custom exceptions and error handlers for Sehat Setu application
"""

from flask import jsonify
from werkzeug.exceptions import HTTPException


class ValidationError(Exception):
    """Raised when validation fails"""
    def __init__(self, message, field=None):
        self.message = message
        self.field = field
        super().__init__(self.message)


class ResourceNotFoundError(Exception):
    """Raised when a requested resource is not found"""
    def __init__(self, resource_type, resource_id=None):
        self.resource_type = resource_type
        self.resource_id = resource_id
        message = f"{resource_type} not found"
        if resource_id:
            message += f" (ID: {resource_id})"
        super().__init__(message)


class DuplicateResourceError(Exception):
    """Raised when attempting to create a duplicate resource"""
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def register_error_handlers(app):
    """Register error handlers with the Flask app"""
    
    @app.errorhandler(ValidationError)
    def handle_validation_error(error):
        response = {
            "error": "Validation Error",
            "message": error.message
        }
        if error.field:
            response["field"] = error.field
        return jsonify(response), 400
    
    @app.errorhandler(ResourceNotFoundError)
    def handle_not_found_error(error):
        return jsonify({
            "error": "Not Found",
            "message": str(error)
        }), 404
    
    @app.errorhandler(DuplicateResourceError)
    def handle_duplicate_error(error):
        return jsonify({
            "error": "Duplicate Resource",
            "message": error.message
        }), 409
    
    @app.errorhandler(HTTPException)
    def handle_http_exception(error):
        return jsonify({
            "error": error.name,
            "message": error.description
        }), error.code
    
    @app.errorhandler(500)
    def handle_internal_error(error):
        app.logger.error(f"Internal server error: {error}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later."
        }), 500
    
    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        app.logger.error(f"Unexpected error: {error}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later."
        }), 500
