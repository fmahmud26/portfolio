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
    'Senior Software Engineer with more than seven years of experience delivering production systems—from early requirements through deployment and operations. I specialize in backend services, LLM-powered pipelines, and cloud-native architecture across AWS, GCP, and Azure, with Kubernetes at the center of how I build and run software.',
  availability: 'Open to Forward Deployed AI, backend, and cloud engineering roles',
  heroPitch:
    'I design and ship backend services, LLM pipelines, and cloud-native platforms—taking products from prototype to production on AWS, GCP, and Azure with Kubernetes, CI/CD, and DevSecOps built in.',
}

export const sections = {
  about: {
    label: 'About',
    title: 'From prototype to production',
    subtitle:
      'Partnering with stakeholders to define scope, validate ideas quickly, and deliver durable software.',
    continued:
      'At Brain Station 23, I lead technical delivery for enterprise SaaS—guiding engineers on backend and cloud-native design while operating CI/CD, Kubernetes, and DevSecOps across AWS, GCP, and Azure.',
  },
  skills: {
    label: 'Skills',
    title: 'Technical expertise',
    subtitle:
      'Languages, platforms, and practices used to design, build, and operate production systems.',
  },
  experience: {
    label: 'Experience',
    title: 'Professional experience',
    subtitle:
      'Seven years of backend engineering, AI integration, and cloud-native delivery in production environments.',
  },
  certifications: {
    label: 'Certifications',
    title: 'Industry certifications',
    subtitle: 'Credentials from AWS, HashiCorp, and the CNCF—verified on Credly.',
    credlyLink: 'View verified credentials on Credly',
  },
  education: {
    label: 'Education',
    title: 'Academic background',
    subtitle: 'Formal training in computer science and engineering.',
  },
  contact: {
    label: 'Contact',
    title: 'Get in touch',
    subtitle: 'Open to Forward Deployed AI, backend, and cloud engineering opportunities.',
    innerTitle: 'Contact details',
    intro:
      'Whether you are exploring an LLM integration, an enterprise platform build, or a cloud architecture engagement, I would welcome a conversation.',
    emailCta: 'Send an email',
    linkedinCta: 'Connect on LinkedIn',
    credlyCta: 'View certifications',
  },
} as const

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
          'Own end-to-end technical delivery for enterprise SaaS products—scoping with product teams and clients, prototyping, shipping, and operating in production.',
          'Lead CI/CD on Jenkins and GitHub Actions for Docker and Kubernetes workloads; reduced deployment time by 80% through zero-downtime releases and DevSecOps gates (SAST, dependency scanning, and image security).',
          'Mentor engineers on Java, Python, and cloud-native patterns; lead backend design reviews and code quality standards.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Oct 2021 — Jun 2024',
        highlights: [
          'Built and led the Omnizia PubMed Service (Python, FastAPI, OpenAI API, PostgreSQL, AWS) with LLM-powered tagging for summaries, sentiment analysis, and categorization.',
          'Owned Spring Boot multi-tenant SaaS backends (database-per-tenant) with OAuth2/JWT, optimized SQL, and Spring WebFlux concurrency.',
          'Delivered AWS-backed APIs with caching, Redis, and RabbitMQ; deployed and operated services with Docker and Kubernetes.',
          'Implemented Prometheus, Grafana, and Loki observability stacks for production visibility and faster incident response.',
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
      'Asynchronous ingestion pipeline for PubMed articles with LLM-powered tagging—automated summaries, sentiment analysis, and structured categorization that reduced manual curation effort.',
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
    title: 'CI/CD and DevSecOps Platform',
    description:
      'Jenkins and GitHub Actions pipelines for Docker and Kubernetes deployments with zero-downtime releases, SAST, dependency scanning, and image security gates—80% faster deployments.',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
  },
  {
    id: '04',
    title: 'Cloud Observability Stack',
    description:
      'Production observability platform with Prometheus, Grafana, and Loki—unified metrics, logs, and alerting across microservices on AWS and Kubernetes.',
    tags: ['Prometheus', 'Grafana', 'Loki', 'AWS', 'Kubernetes'],
  },
]

export type SkillCategory = {
  name: string
  description: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    description: 'Primary languages for backend services, APIs, data access, and automation.',
    skills: ['Java', 'Python', 'Go', 'Rust', 'TypeScript', 'SQL'],
  },
  {
    name: 'Backend',
    description: 'Frameworks and patterns for secure, scalable service development.',
    skills: ['Spring Boot', 'FastAPI', 'Gin', 'Spring WebFlux', 'REST APIs', 'OAuth2/JWT'],
  },
  {
    name: 'AI / LLM',
    description: 'Integrating large language models into production workflows and products.',
    skills: [
      'OpenAI API',
      'LangChain4j',
      'LangChain',
      'LangGraph',
      'Prompt Engineering',
      'RAG',
      'LLM Pipelines',
      'Summarization',
      'Tagging & Classification',
    ],
  },
  {
    name: 'Cloud',
    description: 'Architecture and delivery across major cloud platforms.',
    skills: ['AWS', 'GCP', 'Azure', 'Solutions Architecture'],
  },
  {
    name: 'IaC',
    description: 'Infrastructure provisioning, configuration, and environment consistency as code.',
    skills: ['Terraform', 'Ansible'],
  },
  {
    name: 'CI/CD',
    description: 'Automated build, test, security, and release pipelines.',
    skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Zero-Downtime Deploys'],
  },
  {
    name: 'DevOps & DevSecOps',
    description:
      'Container platforms, orchestration, GitOps, and DevSecOps tooling for secure build and release pipelines.',
    skills: [
      'Docker',
      'Kubernetes',
      'GitOps',
      'Argo CD',
      'OpenShift',
      'SAST',
      'SonarQube',
      'Trivy',
      'Dependency Scanning',
      'HashiCorp Vault',
      'OPA',
    ],
  },
  {
    name: 'Data & Messaging',
    description: 'Persistent storage, caching, and asynchronous messaging systems.',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'RabbitMQ', 'SQL Optimization'],
  },
  {
    name: 'Observability',
    description: 'Metrics, logging, and performance validation for production systems.',
    skills: ['Prometheus', 'Grafana', 'Loki', 'Load Testing'],
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
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '7+', label: 'Years of Experience' },
  { value: '3', label: 'Industry Certifications' },
  { value: '80%', label: 'Faster Deployments' },
  { value: '3', label: 'Cloud Platforms' },
]

export const focusAreas = ['Backend', 'AI / LLM', 'Cloud', 'DevOps', 'Kubernetes']
