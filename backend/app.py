from flask import Flask, jsonify, send_file
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


# Helper function to load JSON data
def load_json(filename):
    with open(os.path.join("data", f"{filename}.json"), "r") as file:
        return json.load(file)


@app.route("/api/hero")
def get_hero():
    return jsonify(load_json("hero"))


@app.route("/api/about")
def get_about():
    return jsonify(load_json("about"))


@app.route("/api/skills")
def get_skills():
    return jsonify(load_json("skills"))


@app.route("/api/projects")
def get_projects():
    return jsonify(load_json("projects"))


@app.route("/api/projects/<int:project_id>")
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


@app.route("/api/certifications")
def get_certifications():
    return jsonify(load_json("certifications"))


@app.route("/api/resume")
def get_resume():
    return jsonify(load_json("resume"))


@app.route("/api/resume/pdf")
def get_resume_pdf():
    return send_file("data/resume.pdf", as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
