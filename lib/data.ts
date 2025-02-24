export const portfolioData = {
  profile: {
    name: "John Doe",
    title: "AI & ML Engineer",
    bio: "Passionate AI Engineer with extensive experience in developing intelligent systems that solve real-world problems.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:contact@example.com"
    }
  },
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "20+", label: "Open Source Contributions" },
    { value: "10+", label: "Research Papers" }
  ],
  skills: {
    "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "LLMs", "NLP"],
    "Languages": ["Python", "JavaScript", "SQL", "R"],
    "Cloud": ["AWS", "GCP", "Azure", "Docker", "Kubernetes"],
    "Tools": ["Git", "REST APIs", "GraphQL", "Jupyter", "VS Code"]
  },
  projects: [
    {
      title: "AI-Powered Chatbot",
      description: "Advanced NLP-based conversational AI using transformer architecture",
      tags: ["Python", "TensorFlow", "NLP", "Docker"],
      image: "https://images.unsplash.com/photo-1676299081847-5c7fe8b15015?auto=format&fit=crop&q=80&w=800",
      github: "#"
    },
    {
      title: "Image Classifier",
      description: "CNN model for real-time object recognition with 95% accuracy",
      tags: ["Python", "PyTorch", "OpenCV", "Deep Learning"],
      image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&q=80&w=800",
      github: "#"
    },
    {
      title: "Workflow Automation",
      description: "Python scripts for automating repetitive tasks and data processing",
      tags: ["Python", "Automation", "APIs"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      github: "#"
    }
  ]
}