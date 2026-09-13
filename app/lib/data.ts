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
    "I also design. Packaging, product catalogs, marketplace listings, and social media visuals for consumer brands — the same attention to detail I bring to code.",
  ],
  location: "Jakarta, Indonesia",
  // Spec sheet shown next to the about text. TODO(michael): fill in real values.
  specs: [
    { key: "Base", value: "Jakarta, Indonesia" },
    { key: "Education", value: "Computer Science, Binus University" },
    { key: "Development", value: "Machine learning, computer vision, Flutter" },
    { key: "Design", value: "Packaging, catalogs, marketplace, social media" },
    { key: "Status", value: "Open to internships" },
  ],
  email: "michaelmarcel18@gmail.com",
  socials: {
    github: "https://github.com/MichLoverz",
    linkedin: "https://www.linkedin.com/in/michael-peterson-015339387/",
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
  /** Shown instead of a repository link, e.g. when the source is private. */
  repoNote?: string;
  demo?: string;
  docs?: string;
  /** Internal link to the matching design collection. */
  design?: string;
  image?: string; // put screenshots in /public/projects and reference here
  featured?: boolean;
};

// Draft descriptions inferred from repository names — please correct.
export const projects: Project[] = [
  {
    title: "PortfolioX",
    category: "Web",
    description:
      "An investment portfolio platform — dashboard, Monte Carlo simulation against the efficient frontier, mean-variance optimisation, and risk profiling — built by a team for Software Engineering and deployed to production. I owned the UI/UX, worked on the backend, and helped write the documentation.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL (Supabase)", "SQLAlchemy", "yfinance", "scipy", "Vercel"],
    role: "Group project — UI/UX, backend, documentation",
    repo: "https://github.com/Software-Engineering-LD01/PortfolioX",
    demo: "https://portfoliox-se.vercel.app/",
    docs: "https://app.notion.com/p/PORTFOLIOX-Software-Engineering-Project-Documentation-fb39690328d94aa1a3a35e884eeb1867",
    design: "/design/portfoliox",
    featured: true,
  },
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
    title: "Mr. Coffee (HTML)",
    category: "Web",
    description:
      "A coffee-shop website coded by hand for the Human–Computer Interaction final project — homepage, about, per-category menu pages, promos, and an ordering flow — after designing it in Figma.",
    tech: ["HTML", "CSS", "JavaScript"],
    role: "Individual project",
    // TODO(michael): push the code and add the repo URL, then remove repoNote.
    repoNote: "Source not published yet",
    design: "/design/mrcoffee-html",
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
];

export type SkillGroup = { group: string; items: string[] };

export const skills: { division: string; groups: SkillGroup[] }[] = [
  {
    division: "Development",
    groups: [
      {
        group: "AI / Machine Learning",
        items: ["Python", "scikit-learn", "pandas", "NumPy", "TensorFlow / Keras", "OpenCV", "Jupyter"],
      },
      { group: "Mobile", items: ["Flutter", "Dart"] },
      { group: "Web", items: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "HTML / CSS", "JavaScript"] },
      { group: "Tools", items: ["Git & GitHub", "VS Code", "Vercel"] },
    ],
  },
  {
    division: "Design",
    groups: [
      // TODO(michael): confirm the tools you actually use (video editor especially).
      { group: "Graphic", items: ["Adobe Photoshop", "Adobe Illustrator", "Packaging dielines", "Product catalogs", "Marketplace listings", "Instagram feeds & stories"] },
      { group: "UI/UX", items: ["Figma", "Mobile app flows", "Web layouts", "Prototyping"] },
      { group: "Video", items: ["Short-form editing", "Adobe Premiere Pro", "CapCut"] },
    ],
  },
];
