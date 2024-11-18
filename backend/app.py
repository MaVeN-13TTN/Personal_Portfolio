from flask import Flask, jsonify, send_file
from flask_cors import CORS
import json
import os
from functools import wraps

app = Flask(__name__)
CORS(app)


def error_handler(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except FileNotFoundError:
            return jsonify({"error": "Resource not found"}), 404
        except json.JSONDecodeError:
            return jsonify({"error": "Invalid JSON data"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return wrapped


# Helper function to load JSON data
def load_json(filename):
    file_path = os.path.join("data", f"{filename}.json")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File {filename}.json not found")
    with open(file_path, "r") as file:
        return json.load(file)


@app.route("/api/hero")
@error_handler
def get_hero():
    return jsonify(load_json("hero"))


@app.route("/api/about")
@error_handler
def get_about():
    return jsonify(load_json("about"))


@app.route("/api/skills")
@error_handler
def get_skills():
    return jsonify(load_json("skills"))


@app.route("/api/projects")
@error_handler
def get_projects():
    return jsonify(load_json("projects"))


@app.route("/api/projects/<int:project_id>")
@error_handler
def get_project_details(project_id):
    projects = load_json("projects")
    project = next(
        (
            p
            for p in projects["featured"] + sum(projects["categories"].values(), [])
            if p["id"] == project_id
        ),
        None,
    )
    if project:
        return jsonify(project)
    return jsonify({"error": "Project not found"}), 404


@app.route("/api/projects/category/<category>")
@error_handler
def get_projects_by_category(category):
    projects = load_json("projects")
    if category in projects["categories"]:
        return jsonify(projects["categories"][category])
    return jsonify({"error": "Category not found"}), 404


@app.route("/api/projects/featured")
@error_handler
def get_featured_projects():
    projects = load_json("projects")
    return jsonify(projects["featured"])


@app.route("/api/certifications")
@error_handler
def get_certifications():
    """Get badge-style certifications (AWS, Google, etc.)"""
    try:
        certifications = load_json("certifications")

        # Validate certification data structure
        for cert in certifications:
            required_fields = ["id", "name", "issuer", "date", "badgeUrl"]
            missing_fields = [field for field in required_fields if field not in cert]

            if missing_fields:
                return (
                    jsonify(
                        {
                            "error": f"Invalid certification data. Missing fields: {', '.join(missing_fields)}"
                        }
                    ),
                    400,
                )

        return jsonify(certifications)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch certifications: {str(e)}"}), 500


@app.route("/api/certificates")
@error_handler
def get_certificates():
    """Get full image certificates (ALX, etc.)"""
    try:
        certificates = load_json("certificates")

        # Validate certificate data structure
        for cert in certificates:
            required_fields = ["id", "name", "issuer", "date", "imageUrl"]
            missing_fields = [field for field in required_fields if field not in cert]

            if missing_fields:
                return (
                    jsonify(
                        {
                            "error": f"Invalid certificate data. Missing fields: {', '.join(missing_fields)}"
                        }
                    ),
                    400,
                )

            # Validate Google Drive URLs if present
            if "imageUrl" in cert and "drive.google.com" in cert["imageUrl"]:
                if "/file/d/" not in cert["imageUrl"] and "id=" not in cert["imageUrl"]:
                    return (
                        jsonify(
                            {
                                "error": f"Invalid Google Drive URL format for certificate: {cert['name']}"
                            }
                        ),
                        400,
                    )

        return jsonify(certificates)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch certificates: {str(e)}"}), 500


@app.route("/api/resume")
@error_handler
def get_resume():
    return jsonify(load_json("resume"))


@app.route("/api/resume/pdf")
@error_handler
def get_resume_pdf():
    pdf_path = os.path.join("data", "resume.pdf")
    if not os.path.exists(pdf_path):
        return jsonify({"error": "Resume PDF not found"}), 404
    return send_file(pdf_path, as_attachment=True)


# Error handlers for common HTTP errors
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    # Ensure the data directory exists
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    app.run(debug=True)
