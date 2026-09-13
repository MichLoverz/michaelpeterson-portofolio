// ---------------------------------------------------------------------------
// Portfolio content
// ---------------------------------------------------------------------------
// NOTE: Fields marked `// TODO(michael)` are drafts inferred from your GitHub
// repos. Please review and replace with the real details / screenshots.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Michael Peterson",
  // TODO(michael): tweak the tagline to how you'd like to be introduced.
  role: "AI & Mobile Developer",
  tagline:
    "Computer Science student at Binus University building machine learning models and mobile applications.",
  // TODO(michael): 2–4 sentences about you. This is a draft — make it yours.
  about: [
    "I'm a Computer Science student focused on the practical side of artificial intelligence — from training and evaluating machine learning models to shipping the results as usable products.",
    "My work spans predictive modelling, computer vision, and cross-platform mobile development with Flutter. I enjoy taking a problem from raw data all the way to a deployed application.",
  ],
  location: "Jakarta, Indonesia",
  // Spec sheet shown next to the about text. TODO(michael): fill in real values.
  specs: [
    { key: "Base", value: "Jakarta, Indonesia" },
    { key: "Education", value: "Computer Science, Binus University" },
    { key: "Focus", value: "Machine learning, computer vision" },
    { key: "Also", value: "Flutter mobile apps, Laravel web" },
    { key: "Status", value: "Open to internships" },
  ],
  email: "hensselc@gmail.com",
  socials: {
    github: "https://github.com/MichLoverz",
    // TODO(michael): add your real LinkedIn URL.
    linkedin: "https://www.linkedin.com/in/",
  },
  // TODO(michael): drop a resume PDF into /public and set the path, e.g. "/resume.pdf".
  resumeUrl: "",
};

export type Project = {
  title: string;
  category: "AI / Machine Learning" | "Mobile" | "Web";
  description: string;
  tech: string[];
  role: string;
  repo?: string;
  demo?: string;
  image?: string; // put screenshots in /public/projects and reference here
  featured?: boolean;
};

// Draft descriptions inferred from repository names — please correct.
export const projects: Project[] = [
  {
    title: "Fresh Fruitness Detection",
    category: "AI / Machine Learning",
    description:
      "A computer-vision model that classifies fruit as fresh or spoiled from images, built to explore image classification for food-quality screening.",
    tech: ["Python", "Jupyter", "TensorFlow / Keras", "OpenCV"],
    role: "Group project (Group 4)",
    repo: "https://github.com/MichLoverz/group4-final_project-computer_vision-fresh_fruitness_detection",
    featured: true,
  },
  {
    title: "Wine Quality Prediction",
    category: "AI / Machine Learning",
    description:
      "A machine learning model that predicts wine quality scores from physicochemical properties, comparing several classifiers and feature-engineering approaches.",
    tech: ["Python", "scikit-learn", "pandas"],
    role: "Group project (Group 4)",
    repo: "https://github.com/MichLoverz/group4-final-project_wine-quality-prediction",
  },
  {
    title: "Real Estate Price Prediction",
    category: "AI / Machine Learning",
    description:
      "A regression model estimating property prices from housing features, with data cleaning, exploratory analysis, and model evaluation.",
    tech: ["Python", "scikit-learn", "pandas"],
    role: "Group project (Group 6)",
    repo: "https://github.com/MichLoverz/group6-real-estate-prediction-assignmentml",
  },
  {
    title: "Energy Efficiency Prediction",
    category: "AI / Machine Learning",
    description:
      "A predictive model for building energy efficiency (heating and cooling load) based on architectural parameters.",
    tech: ["Python", "scikit-learn", "pandas"],
    role: "Group project (Group 6)",
    repo: "https://github.com/MichLoverz/group6-energy-efficiency-prediction-assignmentml",
  },
  {
    title: "ML Model Deployment (Streamlit)",
    category: "Web",
    description:
      "An interactive Streamlit web app that serves a trained machine learning model, letting users enter inputs and get live predictions in the browser.",
    tech: ["Python", "Streamlit"],
    role: "Individual project",
    repo: "https://github.com/MichLoverz/streamlit-deployment",
  },
  {
    title: "Flutter Final Project",
    category: "Mobile",
    description:
      "A cross-platform mobile application built as the final project for the Learn & Train program, covering UI design, state management, and app logic.",
    tech: ["Flutter", "Dart", "Figma"],
    role: "Individual project",
    repo: "https://github.com/MichLoverz/LnT_Final-Project-Flutter",
    featured: true,
  },
  {
    title: "Flutter Mid Project",
    category: "Mobile",
    description:
      "A mobile application built for the mid-term of the Learn & Train program, focused on core Flutter widgets and navigation.",
    tech: ["Flutter", "Dart"],
    role: "Individual project",
    repo: "https://github.com/MichLoverz/LnT_Mid-Project-Flutter",
  },
  {
    title: "TPM Web App",
    category: "Web",
    description:
      "A web application built with the Laravel framework and Blade templating.", // TODO(michael): describe what TPM actually does.
    tech: ["Laravel", "PHP", "Blade"],
    role: "Individual project",
    repo: "https://github.com/MichLoverz/TPM",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI / Machine Learning",
    items: ["Python", "scikit-learn", "pandas", "NumPy", "TensorFlow / Keras", "OpenCV", "Jupyter"],
  },
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "Figma"],
  },
  {
    group: "Web",
    items: ["Laravel", "PHP", "Streamlit", "HTML / CSS", "JavaScript"],
  },
  {
    group: "Tools",
    items: ["Git & GitHub", "VS Code", "Vercel"],
  },
];
