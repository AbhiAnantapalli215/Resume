# <img src="icons/icon48.png" alt="Logo" width="30" /> Auto-Resume Sync Extension

Keep your resume always up-to-date on your portfolio — effortlessly.

## 📌 Why This Extension?

As students and developers, we constantly refine our skills and experiences. While tools like Overleaf are great for editing resumes, updating the version on our portfolio often gets forgotten — until it’s too late.

This Chrome extension automates the process of syncing your latest Overleaf LaTeX resume (`main.tex`) to GitHub. It then compiles it using GitHub Actions and serves the latest `resume.pdf` via GitHub Pages — all with a single click.

## ⚙️ How It Works

1. Extracts `main.tex` from your Overleaf project.
2. Pushes it to a specified GitHub repository.
3. Triggers a GitHub Actions workflow that:
   - Compiles the LaTeX source.
   - Publishes the resulting `resume.pdf` via GitHub Pages.

## 🚀 Features

- One-click resume update from Overleaf to GitHub.
- Hosted resume via GitHub Pages.
- Completely free and open-source.
- Works without Overleaf premium.

## ⚠️ Limitations

- Only supports projects with a `main.tex` file.
- Relies on GitHub's LaTeX compiler:
  - Some Overleaf-specific LaTeX features may not work.
- Resume updates may take time (due to GitHub CI build time).
- Cold starts (e.g. on Render) may delay server response on first use.

## 📥 Installation

To install and use the extension locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/AbhiAnantapalli215/Resume.git
2. Go to chrome://extensions/.

3. Enable Developer Mode.

4. Click Load Unpacked and select the extension directory.

5. Use the extension to sync your latest resume in a click!

## 🛠 Setup Instructions
For full setup (backend deployment, GitHub configuration, environment variables), refer to the [Setup Guide](https://abhianantapalli215.github.io/Resume/setup.html)


Made with 💻 by a developer who was tired of manually updating resumes.
