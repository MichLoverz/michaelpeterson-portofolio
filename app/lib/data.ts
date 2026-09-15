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
    { key: "Publication", value: "ICIMTech 2026 (IEEE) — first author" },
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
  /** Full title for the detail page when the card title is a shortened label. */
  pageTitle?: string;
  /** Short name for breadcrumbs when the title is long (e.g. a paper title). */
  shortTitle?: string;
  /** URL segment for the detail page (only used when `gallery` is set). */
  slug?: string;
  category: "AI / Machine Learning" | "Research" | "Mobile" | "Web" | "Networking";
  description: string;
  tech: string[];
  role: string;
  repo?: string;
  /** Label for the repo link when it isn't GitHub (default "Open repository"). */
  repoLabel?: string;
  /** Shown instead of a repository link, e.g. when the source is private. */
  repoNote?: string;
  demo?: string;
  /** Small print under the links, e.g. hosting caveats for the live app. */
  demoNote?: string;
  docs?: string;
  /** Any other external links (label + href). */
  links?: { href: string; label: string }[];
  /** Kaggle / Colab notebook. */
  notebook?: string;
  /** Recorded presentation (YouTube). */
  presentation?: string;
  /** Written report, e.g. a Drive folder with the PDF. */
  report?: string;
  /** Internal link to the matching design collection. */
  design?: string;
  /** Explicit screenshot path in /public, or… */
  image?: string;
  /** …a filename fragment matched in "Portofolio (by Folder)/College" (npm run gallery). */
  screen?: string;
  /** Use the full-size copy instead of the thumb (thumbs of some collections are letterboxed). */
  screenFull?: boolean;
  /** Gallery collection slug for a detail page at /development/<slug>. */
  gallery?: string;
  /** Intro text on the detail page. */
  galleryIntro?: string;
  featured?: boolean;
};

// Draft descriptions inferred from repository names — please correct.
export const projects: Project[] = [
  // --- Featured (wide cards) -------------------------------------------------
  {
    title: "PortfolioX",
    category: "Web",
    description:
      "An investment portfolio platform — dashboard, Monte Carlo simulation, mean-variance optimisation, and risk profiling — built by a team for Software Engineering and deployed to production. I owned the UI/UX, worked on the backend, and helped write the documentation.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Python", "PostgreSQL (Supabase)", "SQLAlchemy", "yfinance", "scipy", "Vercel"],
    role: "Group project — UI/UX, backend, documentation",
    repo: "https://github.com/Software-Engineering-LD01/PortfolioX",
    demo: "https://portfoliox-se.vercel.app/",
    docs: "https://app.notion.com/p/PORTFOLIOX-Software-Engineering-Project-Documentation-fb39690328d94aa1a3a35e884eeb1867",
    design: "/design/portfoliox",
    screen: "portfoliox",
    featured: true,
  },
  {
    title: "Fresh Fruitness Detection",
    category: "AI / Machine Learning",
    description:
      "A computer-vision model that classifies fruit as fresh or spoiled from images, trained and evaluated in a Kaggle notebook and wrapped in a small demo app for the final presentation (the app's interface was scaffolded with AI assistance).",
    tech: ["Python", "TensorFlow / Keras", "OpenCV", "Kaggle"],
    role: "Group project — final project",
    repo: "https://github.com/MichLoverz/group4-final_project-computer_vision-fresh_fruitness_detection",
    notebook: "https://www.kaggle.com/code/michloverz/fruit-freshness-demo-comvis-group-4",
    presentation: "https://www.youtube.com/watch?v=0obijlGrcCE",
    screen: "fresh-fruitness",
    featured: true,
  },
  {
    title: "Review Authenticity Analyzer",
    slug: "review-authenticity",
    category: "AI / Machine Learning",
    description:
      "Detects whether an Indonesian online review is genuine or fake, running an LSTM + Word2Vec model and a fine-tuned IndoBERT side by side. FastAPI backend, React front end, shipped as a Docker container on Hugging Face Spaces.",
    tech: ["Python", "TensorFlow / Keras", "IndoBERT", "Word2Vec", "FastAPI", "React", "Docker", "Hugging Face Spaces"],
    role: "Group project — final project",
    repo: "https://huggingface.co/spaces/MichLoverz/review-authenticity-analyzer/tree/main",
    repoLabel: "Source on Hugging Face",
    demo: "https://huggingface.co/spaces/MichLoverz/review-authenticity-analyzer",
    presentation: "https://www.youtube.com/watch?v=5KDMEInRzzU",
    screen: "review-nlp",
    gallery: "nlp",
    galleryIntro:
      "The same three reviews, scored by both models. A glowing one-liner, a review that reads like a template, and a long, specific one — the LSTM + Word2Vec and IndoBERT models mostly agree, and where they differ the gap says something about how each reads the text.",
    featured: true,
  },

  // --- Regular cards -----------------------------------------------------------
  {
    title: "Wine Quality Prediction",
    category: "AI / Machine Learning",
    description:
      "A machine learning model that predicts wine quality scores from physicochemical properties, comparing several classifiers and feature-engineering approaches, deployed as a Streamlit app.",
    tech: ["Python", "scikit-learn", "pandas", "Streamlit"],
    role: "Group project — final project",
    repo: "https://github.com/MichLoverz/group4-final-project_wine-quality-prediction",
    demo: "https://group4-final-projectwine-quality-prediction-3kv3iqqqyhrswhl85b.streamlit.app/",
    presentation: "https://www.youtube.com/watch?v=hbMp0QXjsAA",
    screen: "wine-quality",
  },
  {
    title: "Energy Efficiency Prediction",
    category: "AI / Machine Learning",
    description:
      "A predictive model for building energy efficiency (heating and cooling load) based on architectural parameters, deployed as a Streamlit app.",
    tech: ["Python", "scikit-learn", "pandas", "Streamlit"],
    role: "Group project — assignment",
    repo: "https://github.com/MichLoverz/group6-energy-efficiency-prediction-assignmentml",
    demo: "https://group6-energy-efficiency-prediction-assignmentml.streamlit.app/",
    presentation: "https://www.youtube.com/watch?v=EFL0GWGbCok",
    screen: "energy-efficiency",
  },
  {
    title: "Real Estate Price Prediction",
    category: "AI / Machine Learning",
    description:
      "A regression model estimating property prices from housing features, with data cleaning, exploratory analysis, and model evaluation. Built on my own initiative beyond the course assignments.",
    tech: ["Python", "scikit-learn", "pandas", "Streamlit"],
    role: "Self-initiated",
    repo: "https://github.com/MichLoverz/group6-real-estate-prediction-assignmentml",
    demo: "https://group6-real-estate-prediction-assignmentml.streamlit.app/",
    screen: "real-estate",
  },
  {
    title: "Research Paper",
    pageTitle: "Two-Phase Transfer Learning with ResNet50 for Tuberculosis Detection in Chest X-rays",
    shortTitle: "Research paper",
    slug: "tb-detection-paper",
    category: "Research",
    description:
      "“Two-Phase Transfer Learning with ResNet50 for Tuberculosis Detection in Chest X-rays” — 92.1% accuracy and 0.978 AUC-ROC on 2,200 pooled chest X-rays, with Grad-CAM confirming attention on clinically relevant lung regions. Accepted and presented at ICIMTech 2026 (IEEE).",
    tech: ["ResNet50", "Two-phase transfer learning", "Chest X-ray", "Grad-CAM", "5-fold cross-validation"],
    role: "First author & presenter — ICIMTech 2026 (IEEE)",
    links: [{ href: "https://bit.ly/ProceedingICIMTech2026", label: "Conference proceedings" }],
    screen: "certificate-rm",
    gallery: "tb-paper",
    galleryIntro:
      "Figures from the paper, in reading order: the two-phase training pipeline and model architecture, training curves, evaluation on the held-out test set (confusion matrix, ROC, comparison across six models), Grad-CAM interpretability maps and sample predictions — then the author and presenter certificates from the 2026 International Conference on Information Management and Technology, held 19–20 August 2026 in Tangerang.",
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
    screen: "mr-coffee-html",
  },
  {
    title: "Campus Network Design",
    slug: "campus-network",
    category: "Networking",
    description:
      "A complete network for the three-floor Binus Syahdan campus, designed in Cisco Packet Tracer from the actual floor plans: sizing the number of PCs per room, choosing routers and switches, planning the IP addressing, and wiring it all into one working topology with a server block. Documented in a 90-page final report.",
    tech: ["Cisco Packet Tracer", "Routing & switching", "IP addressing", "Network topology"],
    role: "Group project — Computer Networks",
    report: "https://drive.google.com/drive/folders/1AKSZ7gXvFmKJdwovZu1ONI8qjAWsRjvX?usp=drive_link",
    screen: "cisco",
    gallery: "cisco",
    galleryIntro:
      "From floor plan to topology. The building's floor plans set the room count and PC count per room; the Packet Tracer screenshots show how each floor is wired and how the floors meet at the core and the server block. The .pkt file and the full report — device list, IP tables, and configuration — are in the Drive folder.",
  },
  {
    title: "AI General Checkup",
    category: "AI / Machine Learning",
    description:
      "AIVI: a web app that reads general check-up data — blood pressure, glucose, cholesterol — and returns AI-generated health recommendations with a downloadable summary. Final project for the Artificial Intelligence course; designed in Figma, then built.",
    // TODO(michael): list the actual stack (model, backend, front end).
    tech: ["Python", "Machine learning", "Web app"],
    role: "Final project — Artificial Intelligence",
    // TODO(michael): push the code and add the repo URL, then remove repoNote.
    repoNote: "Source not published yet",
    design: "/design/aivi",
    screen: "aivi-development",
  },

  // --- No screenshots yet — kept last ------------------------------------------
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
    title: "Flutter Final Project",
    category: "Mobile",
    description:
      "A cross-platform mobile application built as the final project for the Learn & Train program, covering UI design, state management, and app logic.",
    tech: ["Flutter", "Dart", "Figma"],
    role: "Individual project",
    repo: "https://github.com/MichLoverz/LnT_Final-Project-Flutter",
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
      { group: "Video", items: ["Short-form editing", "Adobe Premiere Pro", "Adobe After Effects"] },
    ],
  },
];
