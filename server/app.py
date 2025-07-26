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
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

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
    """Health check endpoint"""
    return jsonify({
        "status": "healthy", 
        "message": "Server is running",
        "github_repo": f"{GITHUB_USERNAME}/{GITHUB_REPO}"
    })

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

        # Continue with GitHub sync logic here...
        return jsonify({"message": "✅ LaTeX project extracted and ready!"})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

def download_and_extract(download_url):
    """Download ZIP from Overleaf and extract LaTeX content"""
    try:
        # Download the ZIP file
        logger.info("Downloading project ZIP...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(download_url, headers=headers, timeout=30)
        response.raise_for_status()
        
        # Create temporary file for ZIP
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as temp_zip:
            temp_zip.write(response.content)
            temp_zip_path = temp_zip.name
        
        # Extract and find .tex file
        with zipfile.ZipFile(temp_zip_path, 'r') as zip_ref:
            file_list = zip_ref.namelist()
            
            # Look for main.tex or any .tex file
            tex_files = [f for f in file_list if f.endswith('.tex') and not f.startswith('.')]
            if not tex_files:
                logger.error("No .tex files found in project")
                return None
            
            # Prefer main.tex, otherwise use first .tex file
            main_tex = 'main.tex' if 'main.tex' in tex_files else tex_files[0]
            
            with zip_ref.open(main_tex) as tex_file:
                tex_content = tex_file.read().decode('utf-8')
        
        # Clean up
        os.unlink(temp_zip_path)
        
        logger.info(f"Successfully extracted {main_tex} ({len(tex_content)} characters)")
        return tex_content
        
    except Exception as e:
        logger.error(f"Download/extract error: {str(e)}")
        return None

def push_to_github(tex_content):
    """Push LaTeX content to GitHub repository"""
    try:
        # Initialize GitHub client
        g = Github(GITHUB_TOKEN)
        repo = g.get_user(GITHUB_USERNAME).get_repo(GITHUB_REPO)
        
        # Check if resume.tex exists
        commit_message = f"Update resume from Overleaf sync - {len(tex_content)} chars"
        
        try:
            file = repo.get_contents("resume.tex")
            # Update existing file
            commit = repo.update_file(
                "resume.tex",
                commit_message,
                tex_content,
                file.sha
            )
            logger.info("Updated existing resume.tex")
        except:
            # Create new file
            commit = repo.create_file(
                "resume.tex",
                "Add resume from Overleaf sync",
                tex_content
            )
            logger.info("Created new resume.tex")
        
        return commit['commit'].html_url
        
    except Exception as e:
        logger.error(f"GitHub push error: {str(e)}")
        return None

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Use Render's PORT or default to 5000 for local dev
    logger.info("=" * 50)
    logger.info("Starting Overleaf Resume Sync Server...")
    logger.info(f"GitHub repo: {GITHUB_USERNAME}/{GITHUB_REPO}")
    logger.info(f"Server will run at: http://0.0.0.0:{port}")
    logger.info(f"Health check: http://0.0.0.0:{port}/health")
    logger.info("=" * 50)
    app.run(host='0.0.0.0', port=port)