"use client"

import { useState, useEffect, useRef } from "react"
import {
  Save,
  Copy,
  Download,
  Trash2,
  Play,
  User,
  Folder,
  Plus,
  Loader2,
  Code,
  Eye,
  X,
  Check,
  Moon,
  Sun,
  Settings,
  Zap,
  Sparkles,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  Star,
  Clock,
  FileCode,
} from "lucide-react"

// Main App Component
export default function FractalUIApp() {
  // Core State
  const [prompt, setPrompt] = useState("")
  const [code, setCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)

  // UI State
  const [darkMode, setDarkMode] = useState(false)
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const [activeTab, setActiveTab] = useState("generator")
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Project Management State
  const [projects, setProjects] = useState<any[]>([])
  const [currentProject, setCurrentProject] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  // Authentication State
  const [user, setUser] = useState<any>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Template Library
  const templates = [
    {
      id: "button",
      name: "Modern Button",
      description: "Stylish button with animations",
      category: "components",
      prompt:
        "Create a modern button component with hover animations, multiple variants (primary, secondary, outline), different sizes, and loading states",
      preview: "🔘",
    },
    {
      id: "card",
      name: "Product Card",
      description: "E-commerce style card",
      category: "components",
      prompt:
        "Design a product card with image, title, price, rating stars, and add to cart button with smooth hover effects",
      preview: "🃏",
    },
    {
      id: "form",
      name: "Contact Form",
      description: "Beautiful contact form",
      category: "forms",
      prompt:
        "Create a contact form with name, email, message fields, validation states, and a modern design with proper spacing",
      preview: "📝",
    },
    {
      id: "navbar",
      name: "Navigation Bar",
      description: "Responsive navbar",
      category: "layout",
      prompt: "Build a responsive navigation bar with logo, menu items, mobile hamburger menu, and smooth animations",
      preview: "🧭",
    },
    {
      id: "hero",
      name: "Hero Section",
      description: "Landing page hero",
      category: "layout",
      prompt:
        "Design a hero section with gradient background, compelling headline, subtitle, CTA buttons, and hero image",
      preview: "🚀",
    },
    {
      id: "dashboard",
      name: "Dashboard Widget",
      description: "Analytics dashboard card",
      category: "data",
      prompt: "Create a dashboard widget showing metrics with charts, trend indicators, and clean data visualization",
      preview: "📊",
    },
  ]

  // Initialize
  useEffect(() => {
    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem("fractal-ui-dark-mode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }

    // Mock authentication - replace with real auth
    setTimeout(() => {
      setUser({ uid: "demo-user-" + Date.now(), email: "user@example.com" })
      setIsAuthReady(true)
      loadProjects()
    }, 1000)
  }, [])

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("fractal-ui-dark-mode", JSON.stringify(darkMode))
  }, [darkMode])

  // AI Code Generation
  const generateUICode = async (promptText: string) => {
    setIsGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptText,
          userId: user?.uid,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate code")
      }

      const data = await response.json()
      const generatedCode = data.code

      setCode(generatedCode)
      updatePreview(generatedCode)

      // Create auto-save project
      const autoProject = {
        id: "auto-" + Date.now(),
        title: `Generated at ${new Date().toLocaleTimeString()}`,
        prompt: promptText,
        code: generatedCode,
        timestamp: Date.now(),
        isAutoSave: true,
      }

      setCurrentProject(autoProject)
    } catch (error) {
      console.error("[v0] Error generating code:", error)
      setError("Failed to generate code. Please check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Update iframe preview
  const updatePreview = (codeString: string) => {
    if (!iframeRef.current) return

    const previewHTML = `
<!DOCTYPE html>
<html lang="en" class="${darkMode ? "dark" : ""}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#eff6ff',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: system-ui, -apple-system, sans-serif;
            background: ${darkMode ? "#0f172a" : "#ffffff"};
        }
        .error { 
            color: #ef4444; 
            background: #fef2f2; 
            padding: 12px; 
            border-radius: 8px; 
            border: 1px solid #fecaca;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        try {
            ${codeString}
            
            // Try to render the component
            const App = () => {
                return React.createElement(Component || (() => React.createElement('div', {}, 'Component not found')));
            };
            
            ReactDOM.render(React.createElement(App), document.getElementById('root'));
        } catch (error) {
            document.getElementById('root').innerHTML = \`
                <div class="error">
                    <strong>Preview Error:</strong><br/>
                    \${error.message}
                </div>
            \`;
        }
    </script>
</body>
</html>`

    const blob = new Blob([previewHTML], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url
  }

  // Copy code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  // Download code as file
  const downloadCode = () => {
    if (!code) return

    const blob = new Blob([code], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentProject?.title || "component"}.jsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Project Management Functions
  const saveProject = async () => {
    if (!code || !prompt) return

    const project = {
      id: currentProject?.id || "project-" + Date.now(),
      title: currentProject?.title || `Project ${projects.length + 1}`,
      prompt,
      code,
      timestamp: Date.now(),
      userId: user?.uid,
    }

    // Save to localStorage
    const savedProjects = JSON.parse(localStorage.getItem("fractal-ui-projects") || "[]")
    const existingIndex = savedProjects.findIndex((p: any) => p.id === project.id)

    if (existingIndex >= 0) {
      savedProjects[existingIndex] = project
    } else {
      savedProjects.push(project)
    }

    localStorage.setItem("fractal-ui-projects", JSON.stringify(savedProjects))
    setProjects(savedProjects)
    setCurrentProject(project)
  }

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("fractal-ui-projects") || "[]")
    setProjects(savedProjects.filter((p: any) => !p.isAutoSave))
  }

  const loadProject = (project: any) => {
    setPrompt(project.prompt)
    setCode(project.code)
    setCurrentProject(project)
    updatePreview(project.code)
    setActiveTab("generator")
  }

  const deleteProject = (projectId: string) => {
    const savedProjects = JSON.parse(localStorage.getItem("fractal-ui-projects") || "[]")
    const filteredProjects = savedProjects.filter((p: any) => p.id !== projectId)
    localStorage.setItem("fractal-ui-projects", JSON.stringify(filteredProjects))
    setProjects(filteredProjects)
    setShowDeleteConfirm(null)

    if (currentProject?.id === projectId) {
      setCurrentProject(null)
      setPrompt("")
      setCode("")
    }
  }

  // Template selection
  const selectTemplate = (template: any) => {
    setPrompt(template.prompt)
    setSelectedTemplate(template)
    setActiveTab("generator")
  }

  // Filter projects and templates
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.prompt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fractal UI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Components</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: "generator", icon: Zap, label: "Generator" },
                { id: "templates", icon: Layout, label: "Templates" },
                { id: "projects", icon: Folder, label: "Projects" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* User Info */}
              {user && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.email?.split("@")[0] || "User"}
                  </span>
                </div>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          {[
            { id: "generator", icon: Zap, label: "Generator" },
            { id: "templates", icon: Layout, label: "Templates" },
            { id: "projects", icon: Folder, label: "Projects" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center space-y-1 py-3 ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generator Tab */}
        {activeTab === "generator" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Generate Beautiful UI Components
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Describe your component and watch AI transform your ideas into production-ready React code with Tailwind
                CSS
              </p>
            </div>

            {/* Prompt Input */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Describe your component
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Create a modern login form with email, password fields, remember me checkbox, and a gradient submit button..."
                    className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">{prompt.length} characters</div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedTemplate && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Layout className="w-4 h-4" />
                      <span>Using template: {selectedTemplate.name}</span>
                      <button onClick={() => setSelectedTemplate(null)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => generateUICode(prompt)}
                  disabled={!prompt.trim() || isGenerating}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Component</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <X className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 dark:text-red-400">{error}</span>
                </div>
              </div>
            )}

            {/* Code and Preview */}
            {code && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Code Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Generated Code</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyCode}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copySuccess ? "Copied!" : "Copy"}</span>
                      </button>
                      <button
                        onClick={downloadCode}
                        className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-gray-800 dark:text-gray-200">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Live Preview</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[
                        { id: "mobile", icon: Smartphone, width: "375px" },
                        { id: "tablet", icon: Tablet, width: "768px" },
                        { id: "desktop", icon: Monitor, width: "100%" },
                      ].map((device) => (
                        <button
                          key={device.id}
                          onClick={() => setPreviewDevice(device.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            previewDevice === device.id
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          }`}
                        >
                          <device.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                      <iframe
                        ref={iframeRef}
                        className="w-full h-96 bg-white dark:bg-gray-900"
                        style={{
                          width: previewDevice === "mobile" ? "375px" : previewDevice === "tablet" ? "768px" : "100%",
                          maxWidth: "100%",
                        }}
                        title="Component Preview"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Actions */}
            {code && (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={saveProject}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Project</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Component Templates</h2>
                <p className="text-gray-600 dark:text-gray-400">Quick start with pre-made component prompts</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => selectTemplate(template)}
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">{template.preview}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {template.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                        Use Template →
                      </button>
                      <Star className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your saved components</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setActiveTab("generator")}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm ? "Try adjusting your search terms" : "Create your first component to get started"}
                </p>
                <button
                  onClick={() => setActiveTab("generator")}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Project</span>
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{project.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{project.prompt}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-3">
                          <button
                            onClick={() => loadProject(project)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Load project"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(project.id)}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(project.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileCode className="w-4 h-4" />
                          <span>{project.code?.length || 0} chars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Delete Project</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this project? All associated code and data will be permanently removed.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProject(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Generating Component</h3>
            <p className="text-gray-600 dark:text-gray-400">AI is crafting your perfect component...</p>
          </div>
        </div>
      )}
    </div>
  )
}
