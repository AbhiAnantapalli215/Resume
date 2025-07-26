function copyCode(button) {
  const codeBlock = button.parentElement;
  // Adjust the text extraction to account for the button's text ('Copy') being part of the parent's textContent
  const code = Array.from(codeBlock.childNodes)
    .filter(node => node.nodeType === Node.TEXT_NODE)
    .map(node => node.textContent.trim())
    .join('\n')
    .trim();

  navigator.clipboard.writeText(code).then(() => {
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  });
}

// Generate downloadable files
document.getElementById('downloadServer').addEventListener('click', function(e) {
  e.preventDefault();
  downloadServerFiles();
});

document.getElementById('downloadWorkflow').addEventListener('click', function(e) {
  e.preventDefault();
  downloadWorkflowFile();
});

function downloadServerFiles() {
  // Create server script content
  const serverScript = `#!/usr/bin/env python3
"""
Overleaf Resume Sync Server
Local Flask server to handle Overleaf downloads and GitHub pushes
"""

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
    exit(1)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Server is running"})

@app.route('/sync', methods=['POST'])
def sync_resume():
    """Main sync endpoint"""
    try:
        data = request.json
        download_url = data.get('downloadUrl')
        project_id = data.get('projectId')
        
        if not download_url or not project_id:
            return jsonify({"error": "Missing download URL or project ID"}), 400
        
        logger.info(f"Starting sync for project: {project_id}")
        
        # Download and extract Overleaf project
        tex_content = download_and_extract(download_url)
        if not tex_content:
            return jsonify({"error": "Failed to download or extract LaTeX file"}), 500
        
        # Push to GitHub
        success = push_to_github(tex_content)
        if not success:
            return jsonify({"error": "Failed to push to GitHub"}), 500
        
        return jsonify({
            "message": "Resume synced successfully!",
            "project_id": project_id,
            "repo_url": f"https://github.com/{GITHUB_USERNAME}/{GITHUB_REPO}"
        })
        
    except Exception as e:
        logger.error(f"Sync error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def download_and_extract(download_url):
    """Download ZIP from Overleaf and extract LaTeX content"""
    try:
        # Download the ZIP file
        logger.info("Downloading project ZIP...")
        response = requests.get(download_url, timeout=30)
        response.raise_for_status()
        
        # Create temporary file for ZIP
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as temp_zip:
            temp_zip.write(response.content)
            temp_zip_path = temp_zip.name
        
        # Extract and find .tex file
        with zipfile.ZipFile(temp_zip_path, 'r') as zip_ref:
            file_list = zip_ref.namelist()
            
            # Look for main.tex or any .tex file
            tex_files = [f for f in file_list if f.endswith('.tex')]
            if not tex_files:
                logger.error("No .tex files found in project")
                return None
            
            # Prefer main.tex, otherwise use first .tex file
            main_tex = 'main.tex' if 'main.tex' in tex_files else tex_files[0]
            
            with zip_ref.open(main_tex) as tex_file:
                tex_content = tex_file.read().decode('utf-8')
        
        # Clean up
        os.unlink(temp_zip_path)
        
        logger.info(f"Successfully extracted {main_tex}")
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
        try:
            file = repo.get_contents("resume.tex")
            # Update existing file
            repo.update_file(
                "resume.tex",
                "Update resume from Overleaf sync",
                tex_content,
                file.sha
            )
            logger.info("Updated existing resume.tex")
        except:
            # Create new file
            repo.create_file(
                "resume.tex",
                "Add resume from Overleaf sync",
                tex_content
            )
            logger.info("Created new resume.tex")
        
        return True
        
    except Exception as e:
        logger.error(f"GitHub push error: {str(e)}")
        return False

if __name__ == '__main__':
    logger.info("Starting Overleaf Resume Sync Server...")
    logger.info(f"GitHub repo: {GITHUB_USERNAME}/{GITHUB_REPO}")
    app.run(host='localhost', port=5000, debug=True)
`;

  const requirements = `flask==2.3.3
flask-cors==4.0.0
requests==2.31.0
python-dotenv==1.0.0
PyGithub==1.59.1
`;

  // Create and download server files
  downloadFile('app.py', serverScript);
  setTimeout(() => downloadFile('requirements.txt', requirements), 100);
}

function downloadWorkflowFile() {
  const workflow = `name: Build LaTeX Resume

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3
    
    - name: Setup LaTeX
      uses: xu-cheng/latex-action@v2
      with:
        root_file: resume.tex
        args: -pdf -file-line-error -halt-on-error -interaction=nonstopmode
    
    - name: Upload PDF artifact
      uses: actions/upload-artifact@v3
      with:
        name: resume-pdf
        path: resume.pdf
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
        keep_files: true
`;

  downloadFile('build-resume.yml', workflow);
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// **NEW CODE**: Attach event listeners to all copy buttons once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => copyCode(button));
  });
});