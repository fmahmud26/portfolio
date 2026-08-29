export const profile = {
  name: 'Firoz Mahmud',
  initials: 'FM',
  avatar: '/img/myself.jpeg',
  title: 'Senior Software Engineer',
  tagline: 'Backend · LLM pipelines · Cloud-native systems',
  email: 'firozmahmud26@gmail.com',
  phone: '+880 1744-885126',
  location: 'Dhaka, Bangladesh',
  linkedin: 'https://linkedin.com/in/fmahmud26',
  github: 'https://github.com/fmahmud26',
  credly: 'https://www.credly.com/users/fmahmud26',
  summary:
    'I build and operate production backend systems—translating requirements into durable architecture, shipping with CI/CD and observability from day one, and mentoring teams on cloud-native delivery.',
  availability: 'Open to Forward Deployed AI, backend, and cloud engineering roles',
  heroPitch:
    'Seven years delivering enterprise SaaS, LLM-powered data pipelines, and Kubernetes-backed platforms across AWS, GCP, and Azure.',
}

export const workPrinciples = [
  {
    title: 'Scope with stakeholders',
    description:
      'Align on requirements, constraints, and success criteria before committing to architecture—reducing rework and keeping delivery predictable.',
  },
  {
    title: 'Ship with operational readiness',
    description:
      'CI/CD, security gates, and observability are part of the build—not afterthoughts added once something breaks in production.',
  },
  {
    title: 'Design for systems, not features',
    description:
      'Multi-tenant isolation, async boundaries, and infrastructure-as-code so platforms stay maintainable as they grow.',
  },
] as const

export const sections = {
  about: {
    label: 'About',
    title: 'Engineering for Production',
    subtitle:
      'From early scoping through deployment and operations—focused on systems that hold up under real load.',
    continued:
      'At Brain Station 23, I lead technical delivery for enterprise SaaS: backend architecture, Kubernetes operations, and DevSecOps across AWS, GCP, and Azure—while mentoring engineers on Java, Python, and cloud-native patterns.',
  },
  experience: {
    label: 'Experience',
    title: 'Where I Have Delivered',
    subtitle:
      'Seven years building backend services, AI integrations, and cloud-native platforms in production.',
  },
  projects: {
    label: 'Projects',
    title: 'Systems I Have Built',
    subtitle:
      'Representative systems—structured around the problem, the engineering approach, and the outcome.',
  },
  skills: {
    label: 'Skills',
    title: 'Technical Stack',
    subtitle:
      'Organized by capability—languages, platforms, and practices used to design and run production software.',
  },
  certifications: {
    label: 'Certifications',
    title: 'Industry Certifications',
    subtitle: 'Verified credentials from AWS, HashiCorp, and the CNCF.',
    credlyLink: 'View all verified credentials on Credly',
  },
  education: {
    label: 'Education',
    title: 'Formal Training',
    subtitle: 'Foundation in computer science and software engineering.',
  },
  contact: {
    label: 'Contact',
    title: 'Start a Conversation',
    subtitle: 'Available for Forward Deployed AI, backend, and cloud engineering roles.',
    innerTitle: 'Reach out directly',
    intro:
      'For LLM integrations, platform builds, or cloud architecture work—I respond to email and LinkedIn.',
    emailCta: 'Send an Email',
    linkedinCta: 'Connect on LinkedIn',
    githubCta: 'View GitHub',
  },
} as const

export type ExperienceRole = {
  title: string
  period: string
  dateTimeStart: string
  dateTimeEnd?: string
  highlights: string[]
}

export type Experience = {
  company: string
  location: string
  url?: string
  roles: ExperienceRole[]
}

export const experience: Experience[] = [
  {
    company: 'Brain Station 23',
    location: 'Dhaka, Bangladesh',
    url: 'https://brainstation-23.com',
    roles: [
      {
        title: 'Senior Software Engineer',
        period: 'Jul 2024 — Present',
        dateTimeStart: '2024-07',
        highlights: [
          'Own end-to-end technical delivery for enterprise SaaS products—scoping with product teams and clients, prototyping, shipping, and operating in production.',
          'Lead CI/CD on Jenkins and GitHub Actions for Docker and Kubernetes workloads; reduced deployment time by 80% through zero-downtime releases and DevSecOps gates (SAST, dependency scanning, and image security).',
          'Mentor engineers on Java, Python, and cloud-native patterns; lead backend design reviews and code quality standards.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Oct 2021 — Jun 2024',
        dateTimeStart: '2021-10',
        dateTimeEnd: '2024-06',
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
    url: 'https://10minuteschool.com',
    roles: [
      {
        title: 'Associate Software Engineer',
        period: 'Feb 2019 — Sep 2021',
        dateTimeStart: '2019-02',
        dateTimeEnd: '2021-09',
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
  summary: string
  problem: string
  approach: string
  outcome: string
  tags: string[]
  link?: string
  github?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Omnizia PubMed Service',
    summary: 'LLM-powered ingestion pipeline for PubMed articles with automated tagging and categorization.',
    problem:
      'Research teams spent significant time manually reviewing and categorizing PubMed articles before downstream use.',
    approach:
      'Built an asynchronous Python/FastAPI pipeline on AWS with PostgreSQL storage and OpenAI API integration for summaries, sentiment analysis, and structured tagging.',
    outcome:
      'Automated curation workflows—reducing manual review effort while keeping article metadata consistent and searchable.',
    tags: ['Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'AWS'],
    featured: true,
  },
  {
    id: '02',
    title: 'Enterprise Multi-Tenant SaaS',
    summary: 'Database-per-tenant Spring Boot backends with OAuth2 security and reactive concurrency.',
    problem:
      'Enterprise clients required isolated tenant data, secure API access, and predictable performance under concurrent load.',
    approach:
      'Designed database-per-tenant Spring Boot services with OAuth2/JWT, optimized SQL access patterns, and Spring WebFlux for non-blocking I/O on high-traffic endpoints.',
    outcome:
      'Hardened REST APIs and tenant isolation that supported multiple enterprise clients on shared infrastructure.',
    tags: ['Java', 'Spring Boot', 'PostgreSQL', 'OAuth2', 'Redis'],
    featured: true,
  },
  {
    id: '03',
    title: 'CI/CD and DevSecOps Platform',
    summary: 'Automated release pipelines with security gates for containerized Kubernetes workloads.',
    problem:
      'Manual deployments were slow, error-prone, and lacked consistent security checks before production release.',
    approach:
      'Implemented Jenkins and GitHub Actions pipelines for Docker builds and Kubernetes deploys—with SAST, dependency scanning, image security gates, and zero-downtime rollout patterns.',
    outcome:
      'Reduced deployment time by 80% while embedding DevSecOps checks into every release.',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
  },
  {
    id: '04',
    title: 'Cloud Observability Stack',
    summary: 'Unified metrics, logs, and alerting for microservices on AWS and Kubernetes.',
    problem:
      'Production incidents were harder to diagnose without correlated metrics and logs across distributed services.',
    approach:
      'Deployed Prometheus for metrics, Grafana for dashboards, and Loki for log aggregation—integrated with existing Kubernetes and AWS workloads.',
    outcome:
      'Faster incident response and clearer production visibility across microservice boundaries.',
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
    name: 'Programming',
    description: 'Languages used for backend services, APIs, data access, and automation.',
    skills: ['Java', 'Python', 'Go', 'Rust', 'TypeScript', 'SQL'],
  },
  {
    name: 'Backend Engineering',
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
    name: 'Infrastructure as Code',
    description: 'Provisioning and environment consistency as code.',
    skills: ['Terraform', 'Ansible'],
  },
  {
    name: 'CI/CD',
    description: 'Automated build, test, security, and release pipelines.',
    skills: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Zero-Downtime Deploys'],
  },
  {
    name: 'DevOps & DevSecOps',
    description: 'Containers, orchestration, GitOps, and security tooling for build and release.',
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
    description: 'Storage, caching, and asynchronous messaging.',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'RabbitMQ', 'SQL Optimization'],
  },
  {
    name: 'Observability',
    description: 'Metrics, logging, and performance validation in production.',
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
    link: 'https://www.credly.com/users/fmahmud26',
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    link: 'https://www.credly.com/users/fmahmud26',
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
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { value: '7+', label: 'Years in Production' },
  { value: '80%', label: 'Faster Deployments' },
  { value: '3', label: 'Cloud Certifications' },
  { value: 'AWS · GCP · Azure', label: 'Multi-Cloud Delivery' },
]

export const focusAreas = ['Backend', 'AI / LLM', 'Cloud', 'DevOps', 'Kubernetes']
