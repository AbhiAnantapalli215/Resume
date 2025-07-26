# 📄 Overleaf Resume Sync Chrome Extension

A Chrome extension that enables one-click syncing of your Overleaf LaTeX resume to GitHub, with automatic PDF compilation and deployment via GitHub Pages.

## 🚀 Features

- **One-Click Sync**: Sync your Overleaf resume to GitHub with a single click
- **Automatic PDF Building**: GitHub Actions automatically compiles your LaTeX to PDF
- **Live Resume URL**: Get a permanent, shareable link to your resume
- **Beautiful UI**: Modern, responsive interface with smooth animations
- **Error Handling**: Comprehensive error handling and user feedback

## 📦 Installation

1. **Download the Extension**
   - Clone or download this repository
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension folder

2. **Setup Python Server**
   ```bash
   cd server
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your GitHub credentials
   python resume_sync_server.py
   ```

3. **Configure GitHub**
   - Create a new GitHub repository for your resume
   - Add the GitHub Actions workflow (`.github/workflows/build-resume.yml`)
   - Enable GitHub Pages in repository settings

## 🔧 Configuration

### Environment Variables (.env)
```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_resume_repository_name
```

### GitHub Token Setup
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token (classic)
3. Give it **repo** permissions
4. Copy the token to your `.env` file

## 🎯 Usage

1. **Open your Overleaf project** in Chrome
2. **Click the extension icon** in the toolbar
3. **Click "Sync Resume to GitHub"**
4. **Wait for confirmation** - your resume will be synced!

Your resume will be automatically:
- Downloaded from Overleaf
- Pushed to your GitHub repository
- Compiled to PDF via GitHub Actions
- Deployed to GitHub Pages

## 📁 File Structure

```
overleaf-resume-sync/
├── manifest.json              # Extension manifest
├── popup.html                 # Extension popup UI
├── popup.js                   # Popup logic
├── content.js                 # Overleaf page detection
├── background.js              # Extension background script
├── setup.html                 # Setup guide page
├── server/
│   ├── resume_sync_server.py  # Python Flask server
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
└── github-workflow/
    └── build-resume.yml       # GitHub Actions workflow
```

## 🔄 How It Works

1. **Detection**: Content script detects when you're on an Overleaf project page
2. **Extraction**: Extension extracts the project ID and creates download URL
3. **Download**: Python server downloads the ZIP file from Overleaf
4. **Processing**: Server extracts the main LaTeX file from the ZIP
5. **Upload**: Server pushes the LaTeX content to your GitHub repository
6. **Build**: GitHub Actions automatically compiles the PDF
7. **Deploy**: GitHub Pages serves your resume at a permanent URL

## 🛠️ Troubleshooting

### Extension Issues
- **"Not on Overleaf page"**: Make sure you're viewing an Overleaf project (URL contains `/project/`)
- **"Server not running"**: Ensure the Python server is running on localhost:5000

### Server Issues
- **Import errors**: Run `pip install -r requirements.txt`
- **GitHub authentication failed**: Check your GitHub token and permissions
- **Download failed**: Verify the Overleaf project is accessible

### GitHub Issues
- **PDF not building**: Check the GitHub Actions logs for LaTeX compilation errors
- **Pages not updating**: Ensure GitHub Pages is enabled and set to "GitHub Actions"

## 📋 Requirements

- **Chrome Browser** (for the extension)
- **Python 3.7+** (for the local server)
- **GitHub Account** (for repository and Pages hosting)
- **Overleaf Account** (for your LaTeX resume)

## 🎨 Customization

### Styling the Extension
Edit the CSS in `popup.html` to customize the extension's appearance.

### Modifying the Server
The Python server in `server/resume_sync_server.py` can be extended to:
- Support multiple file formats
- Add preprocessing of LaTeX content
- Integrate with other version control systems

### GitHub Actions Workflow
Customize `github-workflow/build-resume.yml` to:
- Add additional LaTeX packages
- Modify compilation settings
- Add post-processing steps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Overleaf** for providing an excellent LaTeX editing platform
- **GitHub Actions** for free CI/CD and Pages hosting
- **Flask** for the lightweight Python web framework
- **Chrome Extensions API** for browser integration capabilities