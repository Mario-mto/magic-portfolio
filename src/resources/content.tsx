import type { About, Home, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mario",
  lastName: "Montcho",
  name: "Mario Montcho",
  role: "Applied AI Engineer",
  avatar: "/images/moi.jpg",
  email: "montchomar@gmail.com",
  location: "America/Montreal", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "French"], // optional: Leave the array empty if you don't want to display languages
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Mario-mto",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mario-montcho-241598212/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Designing practical AI systems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">AI Engineer</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I’m Mario, a machine learning engineer working with{" "}
      <Text as="span" size="xl" weight="strong">
        Python & AI
      </Text>
      , building <br /> scalable, real-world solutions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I’m an AI consultant and machine learning engineer passionate about
        turning complex business problems into clear, practical solutions. My
        work spans data pipelines, predictive models, and production-ready AI
        systems.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "SaaS Housing Platform (Confidential)",
        timeframe: "2024 - Present",
        role: "AI & Technical–Functional Consultant",
        achievements: [
          <>
            <strong key="pricing-engine">Pricing Recommendation Engine</strong>{" "}
            Designed and implemented a machine learning model to predict optimal
            rental prices based on location, neighborhood trends, and historical
            similarities.
          </>,
          <>
            <strong key="ml-pipeline">End-to-End ML Pipeline</strong> Built a
            complete pipeline including data preprocessing, feature engineering,
            GridSearchCV optimization, and RandomForest/XGBoost modeling.
          </>,
          <>
            <strong key="deployment">Production Deployment</strong> Deployed the
            model as a FastAPI service integrated into the client’s CRM, with
            monitoring and feedback loops.
          </>,
        ],
        images: [
          {
            src: "/images/projects/housing-pricing/pipeline_house_prediction.png",
            alt: "AI pricing engine architecture",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Medical Imaging Research Project",
        timeframe: "2024 - 2025",
        role: "Python Developer — Medical Imaging",
        achievements: [
          <>
            <strong key="automation">Python Automation</strong> Developed Python
            scripts to automatically extract morphological measurements (length,
            width, circumference, volume) from 3D medical images and
            segmentations.
          </>,
          <>
            <strong key="reproducibility">Measurement Reproducibility</strong>{" "}
            Implemented repeatability and reproducibility analyses to ensure
            reliable and consistent measurements across subjects and
            acquisitions.
          </>,
          <>
            <strong key="tooling">Tool Integration</strong> Integrated Python
            workflows with 3D Slicer to visualize results, validate bounding
            boxes, and support expert review.
          </>,
        ],
        images: [
          {
            src: "/images/projects/medical-imaging/bounding_box.png",
            alt: "3D bounding box on medical image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "École de Technologie Supérieure (ÉTS) — Montréal",
        description: (
          <>
            Master’s degree in Software Engineering with a focus on applied
            machine learning, data processing, and production-ready systems.
          </>
        ),
      },
      {
        name: "INSA Group / ESITECH Rouen",
        description: (
          <>
            Master’s degree in Physics Engineering, providing a strong
            foundation in mathematical modeling, data analysis, and scientific
            computing.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "AI Strategy, LLMs & Prompt Engineering",
        description: (
          <>
            Designing AI-driven solutions by combining large language models,
            structured prompting, and strategic thinking to solve real business
            problems.
          </>
        ),
        tags: [
          { name: "LLMs", icon: "sparkles" },
          { name: "Prompt Engineering", icon: "message-square" },
          { name: "AI Strategy", icon: "target" },
        ],
      },
      {
        title: "Python, Data & Machine Learning",
        description: (
          <>
            Advanced Python development for data analysis, visualization,
            machine learning, and automation across research and production
            projects.
          </>
        ),
        tags: [
          { name: "Python", icon: "python" },
          { name: "NumPy", icon: "numpy" },
          { name: "Pandas", icon: "pandas" },
          { name: "Scikit-learn", icon: "scikit" },
          { name: "XGBoost", icon: "xgboost" },
          { name: "Seaborn", icon: "chart" },
          { name: "Matplotlib", icon: "chart" },
        ],
      },
      {
        title: "Backend & API Engineering",
        description: (
          <>
            Building scalable backend services and APIs to expose data
            pipelines, machine learning models, and business logic.
          </>
        ),
        tags: [
          { name: "FastAPI", icon: "fastapi" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "Docker", icon: "docker" },
        ],
        images: [],
      },
      {
        title: "Frontend Development",
        description: (
          <>
            Developing modern, responsive user interfaces with a focus on
            usability, performance, and clean design systems.
          </>
        ),
        tags: [
          { name: "TypeScript", icon: "typescript" },
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "CSS", icon: "css" },
          { name: "Tailwind CSS", icon: "tailwind" },
        ],
        images: [
          {
            src: "/images/projects/sites_UI_UX/site4.png",
            alt: "Frontend user interface",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export { person, social, home, about, work };
