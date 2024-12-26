from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
import json
import os
from functools import wraps
from datetime import datetime
from difflib import SequenceMatcher

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
    file_path = os.path.join(os.path.dirname(__file__), "data", f"{filename}.json")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File {filename}.json not found")
    with open(file_path, "r") as file:
        return json.load(file)


# Helper function to save JSON data
def save_json(filename, data):
    file_path = os.path.join(os.path.dirname(__file__), "data", f"{filename}.json")
    with open(file_path, "w") as file:
        json.dump(data, file, indent=2)


def similar(a, b):
    """Calculate similarity ratio between two strings."""
    a = a.lower()
    b = b.lower()
    return SequenceMatcher(None, a, b).ratio()


def highlight_text(text, search_terms, min_similarity=0.8):
    """Add highlight markers around matching terms."""
    if not text or not search_terms:
        return text
        
    highlighted = text
    matches = []
    
    # Convert text to lowercase for case-insensitive matching
    text_lower = text.lower()
    
    # First, find exact matches
    for term in search_terms:
        term = term.lower().strip()
        if not term:
            continue
            
        start = 0
        while True:
            start = text_lower.find(term, start)
            if start == -1:
                break
            matches.append((start, start + len(term), 'exact'))
            start += len(term)
    
    # Then find fuzzy matches
    words = text_lower.split()
    for i, word in enumerate(words):
        for term in search_terms:
            term = term.lower().strip()
            if not term:
                continue
                
            # Skip if already exact match
            if term in word:
                continue
                
            # Check similarity
            similarity = similar(term, word)
            if similarity >= min_similarity:
                # Find position in original text
                pos = 0
                for j in range(i):
                    pos = text_lower.find(words[j], pos) + len(words[j])
                pos = text_lower.find(word, pos)
                matches.append((pos, pos + len(word), 'fuzzy'))
    
    # Sort matches by position, reversed to maintain string indices
    matches.sort(key=lambda x: x[0], reverse=True)
    
    # Apply highlighting
    for start, end, match_type in matches:
        prefix = '<mark class="search-highlight-' + match_type + '">'
        original = text[start:end]
        highlighted = highlighted[:start] + prefix + original + '</mark>' + highlighted[end:]
    
    return highlighted

def tokenize_text(text):
    """Convert text to searchable tokens."""
    if not text:
        return []
    # Convert to lowercase and split into words
    words = text.lower().split()
    # Remove common punctuation and convert to set to remove duplicates
    words = [word.strip('.,!?()[]{}:;"\'-') for word in words]
    # Remove empty strings and duplicates while preserving order
    return list(dict.fromkeys(word for word in words if word))

def calculate_relevance(post, search_terms):
    """Calculate relevance score for a post."""
    if not search_terms:
        return 0, set(), []
        
    score = 0
    matched_in = set()
    match_details = []
    
    # Prepare searchable text
    title_tokens = tokenize_text(post.get('title', ''))
    excerpt_tokens = tokenize_text(post.get('excerpt', ''))
    content_tokens = tokenize_text(post.get('content', ''))
    tags = [tag.lower() for tag in post.get('tags', [])]
    category = post.get('category', '').lower()
    
    for term in search_terms:
        term = term.strip('.,!?()[]{}:;"\'-').lower()
        if not term:
            continue
            
        # Title exact match (highest priority)
        if term in title_tokens:
            score += 10
            matched_in.add('title')
            match_details.append(('title', 'exact', 10))
        
        # Tag exact match
        if term in tags:
            score += 8
            matched_in.add('tags')
            match_details.append(('tags', 'exact', 8))
        
        # Category exact match
        if term == category:
            score += 7
            matched_in.add('category')
            match_details.append(('category', 'exact', 7))
        
        # Excerpt exact match
        if term in excerpt_tokens:
            score += 5
            matched_in.add('excerpt')
            match_details.append(('excerpt', 'exact', 5))
        
        # Content exact match
        if term in content_tokens:
            score += 3
            matched_in.add('content')
            match_details.append(('content', 'exact', 3))
        
        # Fuzzy matching for title and tags only
        if 'title' not in matched_in:
            # Title fuzzy match
            for token in title_tokens:
                similarity = similar(term, token)
                if similarity >= 0.8:
                    score += similarity * 5
                    matched_in.add('title_fuzzy')
                    match_details.append(('title', 'fuzzy', round(similarity * 5, 2)))
                    break
        
        if 'tags' not in matched_in:
            # Tags fuzzy match
            for tag in tags:
                similarity = similar(term, tag)
                if similarity >= 0.8:
                    score += similarity * 4
                    matched_in.add('tags_fuzzy')
                    match_details.append(('tags', 'fuzzy', round(similarity * 4, 2)))
                    break
    
    return score, matched_in, match_details


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
    pdf_path = os.path.join(os.path.dirname(__file__), "data", "resume.pdf")
    if not os.path.exists(pdf_path):
        return jsonify({"error": "Resume PDF not found"}), 404
    return send_file(pdf_path, as_attachment=True)


# Blog routes
@app.route("/api/blog/posts", methods=["GET"])
@error_handler
def get_blog_posts():
    """Get all blog posts without filtering."""
    blog_data = load_json("blog/posts")
    posts = blog_data["posts"]
    
    # Sort by published date (newest first)
    posts.sort(key=lambda x: x["publishedDate"], reverse=True)
    
    return jsonify({
        "posts": posts,
        "total": len(posts)
    })

@app.route("/api/blog/posts/<slug>", methods=["GET"])
@error_handler
def get_blog_post(slug):
    blog_data = load_json("blog/posts")
    post = next((post for post in blog_data["posts"] if post["slug"] == slug), None)
    
    if not post:
        return jsonify({"error": "Post not found"}), 404
        
    return jsonify(post)

@app.route("/api/blog/categories", methods=["GET"])
@error_handler
def get_blog_categories():
    blog_data = load_json("blog/posts")
    return jsonify(blog_data["categories"])

@app.route("/api/blog/tags", methods=["GET"])
@error_handler
def get_blog_tags():
    blog_data = load_json("blog/posts")
    return jsonify(blog_data["tags"])

@app.route("/api/blog/posts/<slug>/engage", methods=["POST"])
@error_handler
def engage_with_post(slug):
    """Handle post engagement (likes, claps, hearts)"""
    data = request.get_json()
    if not data or 'type' not in data or 'action' not in data:
        return jsonify({"error": "Missing engagement type or action"}), 400

    engagement_type = data['type']
    action = data['action']  # 'add' or 'remove'
    
    if engagement_type not in ['liked', 'clapped', 'hearted']:
        return jsonify({"error": "Invalid engagement type"}), 400
    
    if action not in ['add', 'remove']:
        return jsonify({"error": "Invalid action"}), 400

    # Load blog posts
    blog_data = load_json("blog/posts")
    post = next((post for post in blog_data["posts"] if post["slug"] == slug), None)
    
    if not post:
        return jsonify({"error": "Post not found"}), 404

    # Initialize engagement if it doesn't exist
    if "engagement" not in post:
        post["engagement"] = {"likes": 0, "claps": 0, "hearts": 0}

    # Map engagement types to their count keys
    type_to_key = {
        'liked': 'likes',
        'clapped': 'claps',
        'hearted': 'hearts'
    }

    # Update the appropriate counter
    count_key = type_to_key[engagement_type]
    if action == 'add':
        post["engagement"][count_key] += 1
    else:  # remove
        post["engagement"][count_key] = max(0, post["engagement"][count_key] - 1)

    # Save the updated data
    save_json("blog/posts", blog_data)

    return jsonify({
        "success": True,
        "counts": post["engagement"]
    })

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
