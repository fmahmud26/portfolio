export const profile = {
  name: 'Firoz Mahmud',
  initials: 'FM',
  avatar: '/img/myself.jpeg',
  title: 'Senior Software Engineer',
  tagline: 'Senior Software Engineer',
  email: 'firozmahmud26@gmail.com',
  phone: '+880 1744-885126',
  location: 'Dhaka, Bangladesh',
  linkedin: 'https://linkedin.com/in/fmahmud26',
  github: 'https://github.com/fmahmud26',
  credly: 'https://www.credly.com/users/fmahmud26',
  summary:
    'Senior Software Engineer with 7+ years shipping production systems end to end — from ambiguous requirements to deployed, customer-facing software. I specialize in backend services, LLM-powered pipelines, cloud architecture on AWS, and DevOps/DevSecOps delivery: scoping with stakeholders, prototyping fast, then hardening what sticks.',
  availability: 'Open to Forward Deployed AI, backend & cloud roles',
  heroPitch:
    'Backend, AI, cloud & DevSecOps — building LLM pipelines, Java/Python services, and AWS infrastructure from prototype to production.',
}

export type ExperienceRole = {
  title: string
  period: string
  highlights: string[]
}

export type Experience = {
  company: string
  location: string
  roles: ExperienceRole[]
}

export const experience: Experience[] = [
  {
    company: 'Brain Station 23',
    location: 'Dhaka, Bangladesh',
    roles: [
      {
        title: 'Senior Software Engineer',
        period: 'Jul 2024 — Present',
        highlights: [
          'Own technical delivery for enterprise SaaS products end to end — scoping with Product/clients, prototyping, shipping, and operating in production.',
          'Drive CI/CD on Jenkins and GitHub Actions for Docker/Kubernetes; cut deployment time 80% with zero-downtime releases and DevSecOps gates (SAST, dependency & image scans).',
          'Mentor engineers on Java, Python, and cloud-native patterns; lead backend design and code reviews.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Oct 2021 — Jun 2024',
        highlights: [
          'Built and led the Omnizia PubMed Service (Python, FastAPI, OpenAI API, PostgreSQL, AWS) with LLM-powered tagging for summaries, sentiment, and categorization.',
          'Owned Spring Boot multi-tenant SaaS backends (database-per-tenant) with OAuth2/JWT, optimized SQL, and Spring WebFlux concurrency.',
          'Built AWS-backed APIs with caching, Redis, and RabbitMQ; deployed and operated services with Docker and Kubernetes.',
          'Implemented Prometheus/Grafana/Loki observability stacks for production visibility and faster incident response.',
        ],
      },
    ],
  },
  {
    company: '10 Minute School',
    location: 'Dhaka, Bangladesh',
    roles: [
      {
        title: 'Associate Software Engineer',
        period: 'Feb 2019 — Sep 2021',
        highlights: [
          'Built scalable REST APIs and backend services for a national ed-tech platform serving millions of users.',
          'Delivered API-driven, white-label backend modules with configurable branding and caching for partner organizations.',
          'Supported high-traffic live-class and content-delivery workflows with performance-focused Java services.',
        ],
      },
    ],
  },
]

export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Omnizia PubMed Service',
    description:
      'Async ingestion pipeline for PubMed articles with LLM-powered tagging — automated summaries, sentiment analysis, and structured categorization that cut manual curation effort.',
    tags: ['Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'AWS'],
    featured: true,
  },
  {
    id: '02',
    title: 'Enterprise Multi-Tenant SaaS',
    description:
      'Database-per-tenant Spring Boot backends with OAuth2/JWT security, optimized SQL access, Spring WebFlux concurrency, and hardened REST APIs for enterprise clients.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'OAuth2', 'Redis'],
    featured: true,
  },
  {
    id: '03',
    title: 'CI/CD & DevSecOps Platform',
    description:
      'Jenkins and GitHub Actions pipelines for Docker/Kubernetes deployments with zero-downtime releases, SAST, dependency scanning, and image security gates — 80% faster deploys.',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
  },
  {
    id: '04',
    title: 'AWS Observability Stack',
    description:
      'Production observability platform with Prometheus, Grafana, and Loki — unified metrics, logs, and alerting across microservices running on AWS and Kubernetes.',
    tags: ['Prometheus', 'Grafana', 'Loki', 'AWS', 'Kubernetes'],
  },
]

export type SkillCategory = {
  name: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    skills: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'Spring WebFlux', 'REST APIs', 'OAuth2/JWT'],
  },
  {
    name: 'AI / LLM',
    skills: ['OpenAI API', 'Prompt Engineering', 'LLM Pipelines', 'Summarization', 'Tagging & Classification'],
  },
  {
    name: 'Cloud',
    skills: ['AWS', 'EC2', 'S3', 'RDS', 'IAM', 'Solutions Architecture', 'Terraform'],
  },
  {
    name: 'DevOps & DevSecOps',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'SAST', 'Zero-Downtime Deploys'],
  },
  {
    name: 'Data & Messaging',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'SQL Optimization'],
  },
  {
    name: 'Observability',
    skills: ['Prometheus', 'Grafana', 'Loki', 'Load Testing', 'TDD', 'Agile'],
  },
]

export type Certification = {
  name: string
  issuer: string
  link?: string
}

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect — Associate (SAA-C03)',
    issuer: 'Amazon Web Services',
    link: 'https://www.credly.com/badges/ac24f7c7-0a02-446a-b938-107476460760',
  },
  {
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
  },
]

export const education = {
  degree: 'B.Sc. in Computer Science and Engineering',
  school: 'Bangladesh University of Business and Technology',
  year: '2018',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '7+', label: 'Years Backend & Cloud' },
  { value: '3', label: 'Cloud Certifications' },
  { value: '80%', label: 'Deploy Time Saved' },
  { value: 'AWS', label: 'Production Delivery' },
]

export const focusAreas = ['Backend', 'AI', 'Cloud', 'DevOps', 'DevSecOps']
