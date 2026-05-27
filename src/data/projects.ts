export interface Project {
  id: number;
  title: string;
  oneLiner: string;
  description: string;
  path: "architect" | "operator" | "both";
  tech: string[];
  thumbnail: string;
  isFlagship?: boolean;
  caseStudy?: {
    problem: string;
    solution: string;
    realProblems?: string[];
    outcome: string;
    images?: string[];
  };
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "DeepTrust",
    oneLiner: "A multimodal deepfake defense suite that doesn't just detect fakes — it classifies exactly which part of the media was manipulated and why.",
    description: "A multimodal deepfake defense suite that doesn't just detect fakes — it classifies exactly which part of the media was manipulated and why.",
    isFlagship: true,
    path: "both",
    tech: ["Python", "PyTorch", "EfficientNet-B4", "Swin Transformer", "InceptionResNetV1", "FastAPI", "React.js", "Docker", "AWS", "Kubernetes"],
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    github: undefined,
    caseStudy: {
      problem: "Standard deepfake detectors lose up to 50% accuracy in real-world conditions. Binary real/fake classification tells you nothing about what was actually manipulated or how.",
      solution: "Built a three-pipeline architecture — Tri-Branch Visual (EfficientNet-B4, Swin Transformer, InceptionResNetV1 producing a 3,328-D fingerprint), Dual-Branch Acoustic (EfficientNet-B4 + Swin Transformer producing a 2,816-D fingerprint), and a Bidirectional Cross-Attention Fusion network that lets audio interrogate visual and visual interrogate audio simultaneously.",
      outcome: "97.5% validation accuracy on FakeAVCeleb. Deployed as a full-stack MERN application. Final Year Project at FAST-NUCES, May 2026.",
      images: [
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=2787&auto=format&fit=crop"
      ],
    },
  },
  {
    id: 2,
    title: "Complete MLOps Pipeline",
    oneLiner: "A production-grade MLOps platform built from scratch — trains, versions, serves, orchestrates, deploys, and monitors a sentiment model with zero manual steps after a git push.",
    description: "A production-grade MLOps platform built from scratch — trains, versions, serves, orchestrates, deploys, and monitors a sentiment model with zero manual steps after a git push.",
    isFlagship: true,
    path: "architect",
    tech: ["Python", "scikit-learn", "MLflow", "DVC", "FastAPI", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS EC2", "AWS S3", "Prometheus", "Grafana"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    github: "https://github.com/umer515k/Complete-MLOPs-Pipeline",
    caseStudy: {
      problem: "Most ML projects end at model training. A notebook with good accuracy tells you nothing about whether that model can survive a production environment — versioned data, containerized deployment, automated testing, live monitoring, self-healing replicas.",
      solution: "Three sentiment classifiers trained on 50k IMDB reviews, tracked across runs with MLflow, best model auto-saved by F1 score. Data versioned with DVC stored in S3 so every model traces to the exact dataset it trained on. Served via FastAPI containerized with Docker, deployed to AWS EC2 via GitHub Actions CI/CD.",
      realProblems: [
        "k3s dropped cgroup v1 support mid-build — downgraded to v1.28 to recover.",
        "GitHub Secret scanning blocked pushes with embedded AWS credentials — fixed with filter-branch.",
        "Prometheus couldn't scrape FastAPI inside Docker — fixed with --host 0.0.0.0.",
      ],
      outcome: "A git push to main triggers testing, training, containerization, image versioning by commit SHA, EC2 deployment, and live monitoring with zero manual steps.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010bdcc91d?q=80&w=2862&auto=format&fit=crop"
      ],
    },
  },
  {
    id: 3,
    title: "NASA APOD ETL Pipeline",
    oneLiner: "An automated ETL pipeline that extracts, transforms, loads, and versions NASA astronomy data daily — with full reproducibility baked in.",
    description: "An automated ETL pipeline that extracts, transforms, loads, and versions NASA astronomy data daily — with full reproducibility baked in.",
    path: "architect",
    tech: ["Python", "PostgreSQL", "Apache Airflow", "Docker", "DVC", "REST APIs"],
    thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2944&auto=format&fit=crop",
    github: undefined,
    caseStudy: {
      problem: "Public APIs produce continuous data that most engineers consume once and discard. Without versioning and scheduling, there is no foundation for downstream ML work.",
      solution: "Airflow DAG schedules daily extraction from NASA's APOD API, transforms and validates the payload, loads into PostgreSQL, and versions the dataset with DVC stored in S3.",
      outcome: "A fully automated, observable data pipeline running on a daily schedule. Any historical dataset state recoverable in one command.",
      images: [
        "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2944&auto=format&fit=crop",
      ]
    },
  },
  {
    id: 4,
    title: "CineMind",
    oneLiner: "A hybrid recommendation engine that learns what you love and surfaces what you didn't know you needed.",
    description: "A hybrid recommendation engine that learns what you love and surfaces what you didn't know you needed.",
    path: "architect",
    tech: ["Python", "scikit-learn", "Pandas", "FastAPI", "React.js", "PostgreSQL"],
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2918&auto=format&fit=crop",
    github: undefined,
    caseStudy: {
      problem: "Pure content-based filtering surfaces obvious choices. Pure collaborative filtering fails cold-start users. Neither alone produces recommendations that feel intelligent.",
      solution: "Combines content-based filtering on film metadata with collaborative filtering on user behavior. FastAPI backend exposes a clean recommendation endpoint.",
      outcome: "A user-facing recommendation product that improves with use. Demonstrates the full ML pipeline from raw data to deployed product.",
      images: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2918&auto=format&fit=crop",
      ]
    },
  },
  {
    id: 5,
    title: "DevBoard",
    oneLiner: "A personal productivity and project tracking dashboard built for developers — GitHub activity, task management, and deployment status in one place.",
    description: "A personal productivity and project tracking dashboard built for developers — GitHub activity, task management, and deployment status in one place.",
    path: "architect",
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vercel"],
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
    github: undefined,
    caseStudy: {
      problem: "Developer context is scattered across GitHub, task managers, and deployment dashboards. Switching between them breaks flow.",
      solution: "Full-stack build from database schema to deployed UI. Authentication, REST API design, GitHub API integration, responsive frontend.",
      outcome: "A deployed, authenticated dashboard with live GitHub activity, task tracking, and deployment status.",
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2940&auto=format&fit=crop",
      ]
    },
  },
  {
    id: 6,
    title: "GHL Lead Automation",
    oneLiner: "A fully automated lead handling machine — calls, qualifies, books, assigns, and tracks with zero manual input from the moment a lead comes in.",
    description: "A fully automated lead handling machine — calls, qualifies, books, assigns, and tracks with zero manual input from the moment a lead comes in.",
    path: "operator",
    tech: ["GoHighLevel", "AI Voice", "Conversation AI", "Zapier", "N8N", "Gravity Forms", "Slack", "Helpwise", "Calendars", "Pipelines"],
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop",
    caseStudy: {
      problem: "Agency clients were losing leads in the gap between capture and follow-up. Slow response times were killing conversion.",
      solution: "Built an end-to-end GHL automation system with AI Voice handling outbound calls and Conversation AI qualifying the lead through dialogue.",
      outcome: "Leads go from form submission to booked appointment with no human touchpoint required. Deployed across multiple agency clients.",
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop",
      ]
    },
  },
  {
    id: 7,
    title: "White-Label SaaS Onboarding",
    oneLiner: "A complete white-label SaaS infrastructure — automated account creation, billing, onboarding sequences, and client support flows running without manual input.",
    description: "A complete white-label SaaS infrastructure — automated account creation, billing, onboarding sequences, and client support flows running without manual input.",
    path: "operator",
    tech: ["GHL SaaS Mode", "Stripe", "Snapshot Imports", "LC Phone", "Twilio", "AI Conversation"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    caseStudy: {
      problem: "Agencies using GHL as a white-label product were spending hours manually setting up each new client account.",
      solution: "Built a fully automated SaaS onboarding pipeline — Stripe triggers account creation, snapshots pre-configure the environment.",
      outcome: "What previously took 2-3 hours of manual work per client became a sub-5-minute automated process.",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      ]
    },
  },
];
