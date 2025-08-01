#!/usr/bin/env python3
"""
Overleaf Resume Sync Server
Local Flask server to handle Overleaf downloads and GitHub pushes
"""
import io
import os
import tempfile
import zipfile
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from github import Github
import logging



app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# GitHub configuration
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
GITHUB_USERNAME = os.getenv('GITHUB_USERNAME')
GITHUB_REPO = os.getenv('GITHUB_REPO')

if not all([GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO]):
    logger.error("Missing required environment variables. Check your .env file.")
    logger.error("Required: GITHUB_TOKEN, GITHUB_USERNAME, GITHUB_REPO")
    exit(1)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "message": "Server is running",
        "github_repo": f"{GITHUB_USERNAME}/{GITHUB_REPO}"
    })

def find_tex_file(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tex') and not file.startswith('.'):
                return os.path.join(root, file)
    return None

@app.route('/sync', methods=['POST'])
def sync_resume():
    try:
        zip_file = request.files.get('zipfile')
        project_id = request.form.get('projectId')

        if not zip_file or not project_id:
            return jsonify({"error": "Missing file or project ID"}), 400

        extract_path = f"latex_projects/{project_id}"
        os.makedirs(extract_path, exist_ok=True)

        with zipfile.ZipFile(io.BytesIO(zip_file.read())) as z:
            z.extractall(extract_path)

        tex_path = find_tex_file(extract_path)
        if not tex_path:
            return jsonify({"error": "No .tex file found in ZIP"}), 400

        with open(tex_path, 'r', encoding='utf-8') as f:
            tex_content = f.read()

        commit_url = push_to_github(tex_content)
        if not commit_url:
            return jsonify({"error": "GitHub push failed"}), 500

        return jsonify({
            "message": "✅ Resume synced to GitHub!",
            "project_id": project_id,
            "repo_url": f"https://github.com/{GITHUB_USERNAME}/{GITHUB_REPO}",
            "commit_url": commit_url
        })

    except Exception as e:
        logger.error(f"Error during sync: {e}")
        return jsonify({"error": str(e)}), 500

def push_to_github(tex_content):
    try:
        g = Github(GITHUB_TOKEN)
        repo = g.get_user(GITHUB_USERNAME).get_repo(GITHUB_REPO)

        commit_message = f"Update resume from Overleaf sync - {len(tex_content)} chars"

        try:
            file = repo.get_contents("resume.tex")
            commit = repo.update_file(
                "resume.tex",
                commit_message,
                tex_content,
                file.sha
            )
            logger.info("Updated existing resume.tex")
        except:
            commit = repo.create_file(
                "resume.tex",
                "Add resume from Overleaf sync",
                tex_content
            )
            logger.info("Created new resume.tex")

        return commit['commit'].html_url

    except Exception as e:
        logger.error(f"GitHub push error: {e}")
        return None

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    logger.info("=" * 50)
    logger.info("Starting Overleaf Resume Sync Server...")
    logger.info(f"GitHub repo: {GITHUB_USERNAME}/{GITHUB_REPO}")
    logger.info(f"Server will run at: http://0.0.0.0:{port}")
    logger.info(f"Health check: http://0.0.0.0:{port}/health")
    logger.info("=" * 50)
    app.run(host='0.0.0.0', port=port)
