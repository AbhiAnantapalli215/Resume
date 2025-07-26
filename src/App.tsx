import { FileText, Github, Download, Settings, CheckCircle, AlertCircle } from 'lucide-react';

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
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Install the Chrome Extension
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Download Extension Files</span>
                    </div>
                    <p className="text-blue-800 text-sm mb-3">
                      The extension files are already in your project. You'll need to load them into Chrome.
                    </p>
                    <ol className="text-sm text-blue-800 space-y-1 ml-4">
                      <li>1. Open Chrome and go to <code className="bg-blue-100 px-1 rounded">chrome://extensions/</code></li>
                      <li>2. Enable "Developer mode" (toggle in top right)</li>
                      <li>3. Click "Load unpacked" and select your project folder</li>
                      <li>4. The extension icon should appear in your toolbar</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Setup Python Server
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The Python server handles downloading from Overleaf and pushing to GitHub.
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="space-y-1">
                      <div># Navigate to server directory</div>
                      <div>cd server</div>
                      <div></div>
                      <div># Install dependencies</div>
                      <div>pip install -r requirements.txt</div>
                      <div></div>
                      <div># Copy environment template</div>
                      <div>cp .env.example .env</div>
                      <div></div>
                      <div># Edit .env with your GitHub credentials</div>
                      <div>nano .env</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Configure GitHub
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Github className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Create Repository</span>
                      </div>
                      <ol className="text-sm text-purple-800 space-y-1">
                        <li>1. Go to GitHub.com</li>
                        <li>2. Create new repository</li>
                        <li>3. Name it "latex-resume"</li>
                        <li>4. Make it public</li>
                        <li>5. Initialize with README</li>
                      </ol>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-purple-900">Get Access Token</span>
                      </div>
                      <ol className="text-sm text-purple-800 space-y-1">
                        <li>1. Go to GitHub Settings</li>
                        <li>2. Developer settings</li>
                        <li>3. Personal access tokens</li>
                        <li>4. Generate new token</li>
                        <li>5. Give "repo" permissions</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Add GitHub Actions Workflow
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    This workflow automatically builds your PDF when you sync from Overleaf.
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-900">Workflow Setup</span>
                    </div>
                    <ol className="text-sm text-orange-800 space-y-1">
                      <li>1. In your repo, create <code className="bg-orange-100 px-1 rounded">.github/workflows/</code> folder</li>
                      <li>2. Copy <code className="bg-orange-100 px-1 rounded">github-workflow/build-resume.yml</code> into it</li>
                      <li>3. Commit and push the workflow file</li>
                      <li>4. Enable GitHub Pages in repo settings</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Test Your Setup
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Ready to Sync!</span>
                    </div>
                    <ol className="text-sm text-green-800 space-y-1">
                      <li>1. Start the Python server: <code className="bg-green-100 px-1 rounded">python server/resume_sync_server.py</code></li>
                      <li>2. Open your Overleaf project</li>
                      <li>3. Click the extension icon</li>
                      <li>4. Click "Sync Resume to GitHub"</li>
                      <li>5. Check your GitHub repo for the updated files!</li>
                    </ol>
                  </div>
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
              <h4 className="font-medium mb-2">Extension Issues:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Make sure you're on an Overleaf project page</li>
                <li>• Check that the Python server is running</li>
                <li>• Verify your .env file has correct credentials</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">GitHub Issues:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Ensure your token has "repo" permissions</li>
                <li>• Check that GitHub Pages is enabled</li>
                <li>• Verify the workflow file is in the right location</li>
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
