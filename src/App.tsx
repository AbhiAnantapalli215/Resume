import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Overleaf Resume Sync</h1>
              <p className="text-sm text-gray-600">Chrome Extension Setup Guide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Let's Get Your Extension Set Up! 🚀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these steps to sync your Overleaf LaTeX resume to GitHub with one click
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1: Clone */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Clone the Repository
                </h3>
                <p className="text-gray-600 mb-3">Start by cloning the official project repository to your local machine:</p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  git clone https://github.com/AbhiAnantapalli215/Resume.git
                </div>
                <p className="text-gray-600 mt-3">This will include the backend, extension code, and GitHub Actions workflow already configured.</p>
              </div>
            </div>
          </div>

          {/* Step 2: Install Extension */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Install Extension via Chrome Developer Mode
                </h3>
                <p className="text-gray-600 mb-3">Once you’ve cloned the repository to your local machine, follow these steps to load the Chrome extension manually:</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ol className="text-sm text-blue-800 space-y-1 ml-4">
                      <li>1. Open Chrome and go to <code className="bg-blue-100 px-1 rounded">chrome://extensions/</code></li>
                      <li>2. In the top-right corner, toggle on <strong>Developer mode</strong></li>
                      <li>3. Click on the <strong>“Load unpacked”</strong> button</li>
                      <li>4. Select the <code>extension</code> folder from the cloned repository (not the root folder)</li>
                      <li>5. The extension should now appear in your Chrome toolbar</li>
                      <li>6. Optional: Right-click the extension icon and click <strong>“Pin”</strong> to keep it visible</li>
                      <li>7. You can also assign a shortcut from the <code className="bg-blue-100 px-1 rounded">chrome://extensions/shortcuts</code> page</li>
                    </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Deploy Backend */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Deploy the Backend Server (Docker)
                </h3>
                  <p className="text-gray-600 mb-2">
                      This project uses a Docker-based backend to sync Overleaf with GitHub. You can deploy it on Render, Fly.io, or any Docker-compatible hosting service.
                  </p>
                <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
                  <p className="text-purple-800 font-semibold my-3">Required environment variables during deployment:</p>
                  <ul className="list-disc list-inside text-purple-800 space-y-1">
                      <li><code>GITHUB_USERNAME</code> – your GitHub username</li>
                      <li><code>GITHUB_REPO</code> – target repository name</li>
                      <li><code>GITHUB_TOKEN</code> – your personal access token (see next step)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: GitHub Token */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Create GitHub Personal Access Token
                </h3>
                <p className="text-gray-600 mb-3">
                    This token is used by the backend server to push updates to your GitHub repository.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <ol className="text-sm text-orange-800 space-y-1 ml-4">
                      <li>1. Go to GitHub Developer Settings</li>
                      <li>2. Click <strong>"Generate new token (classic)"</strong> or create a <strong>fine-grained token</strong></li>
                      <li>3. Set an expiration date if desired</li>
                      <li>4. Enable the following repo permissions (both read and write): <strong>actions</strong>, <strong>code</strong>, and <strong>commit statuses</strong></li>
                      <li>5. Copy the token and use it as <code>GITHUB_TOKEN</code> in your deployment</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: GitHub Pages */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Enable GitHub Pages</h3>
                    <p className="text-gray-600 mb-3">Configure GitHub Pages to serve your generated <code>resume.pdf</code> file:</p>
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                        <ol className="text-sm text-cyan-800 space-y-1 ml-4">
                            <li>1. Go to your GitHub repository → <strong>Settings</strong></li>
                            <li>2. Scroll to the <strong>Pages</strong> section</li>
                            <li>3. Under <strong>Source</strong>, choose <code>GitHub Actions</code> or root of <code>main</code> branch</li>
                            <li>4. Save the settings</li>
                            <li>5. Your resume will be available at:<br /> <code className="bg-cyan-100 px-1 rounded">https://your-username.github.io/your-repo-name/resume.pdf</code></li>
                        </ol>
                    </div>
                </div>
            </div>
          </div>

          {/* Step 6: Test */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Test the Extension
                </h3>
                 <p className="text-gray-600 mb-3">Once everything is set up, it's time to sync!</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ol className="text-sm text-green-800 space-y-1 ml-4">
                      <li>1. Open your Overleaf project in your browser</li>
                      <li>2. Click the extension icon</li>
                      <li>3. Click <strong>"Sync Resume to GitHub"</strong></li>
                      <li>4. Wait for GitHub Actions to build your PDF</li>
                      <li>5. Open your public resume URL to check the result</li>
                    </ol>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Troubleshooting */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-900">Troubleshooting Tips</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
            <div>
              <h4 className="font-medium mb-2">Backend & Extension Issues:</h4>
              <ul className="space-y-1 list-disc ml-4">
                <li>Ensure your backend server is running and reachable</li>
                <li>Check for GitHub Actions errors in the “Actions” tab</li>
                <li>Confirm your token is valid and has the correct scopes</li>
                <li>Use browser console to debug extension errors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">GitHub Issues:</h4>
              <ul className="space-y-1 list-disc ml-4">
                <li>Ensure your token has "repo" permissions</li>
                <li>Check that GitHub Pages is enabled</li>
                <li>Verify the workflow file is in the right location</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium">
            <CheckCircle className="w-5 h-5" />
            You're all set! Your resume will sync with one click.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
