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
    'Senior Software Engineer with 7+ years shipping production systems end to end—embedded with clients from ambiguous requirements to deployed, customer-facing software. Builds LLM-powered features (OpenAI API) alongside Java, Python, and Go backends, owning delivery on AWS from prototype to hardened production.',
  availability: 'Open to Forward Deployed AI, backend, and cloud engineering roles',
  heroPitch:
    'Seven years delivering enterprise SaaS, LLM-powered data pipelines, and Kubernetes-backed platforms on AWS—from ambiguous requirements to customer-facing production.',
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
      'At Brain Station 23, I own technical delivery for enterprise SaaS: scoping with Product and clients, prototyping, shipping, and operating in production—while mentoring engineers across Java, Python, and Go stacks.',
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
    subtitle: 'Verified credentials from AWS and HashiCorp.',
    credlyLink: 'View all verified credentials on Credly',
  },
  education: {
    label: 'Education',
    title: 'Academic Foundation',
    subtitle: 'Computer science degree with a major in artificial intelligence.',
  },
  contact: {
    label: 'Contact',
    title: 'Start a Conversation',
    subtitle: 'Available for Forward Deployed AI, backend, and cloud engineering roles.',
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
        period: 'Jul 2025 — Present',
        dateTimeStart: '2025-07',
        highlights: [
          'Own technical delivery for enterprise SaaS products end to end—scoping with Product and clients, prototyping, shipping, and operating in production.',
          'Drive CI/CD on Jenkins and GitHub Actions for Docker/Kubernetes; cut deployment time 80% with zero-downtime releases and DevSecOps gates (secrets, SAST, dependency, and image scans).',
          'Mentor engineers across Java, Python, and Go stacks; lead design and code reviews.',
          'Architected Smart Digital Advertisement (Go) for 100+ distributed WiFi stations—evolving a single-node POC into a highly available, horizontally scalable AWS platform with ALB, Auto Scaling, PostgreSQL, and Redis.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Nov 2021 — Jun 2025',
        dateTimeStart: '2021-11',
        dateTimeEnd: '2025-06',
        highlights: [
          'Interviewed clients and data-entry teams to map a manual, multi-day tagging workflow; built and led the Omnizia PubMed Service (Java, Spring Boot, OpenAI API), automating LLM-powered tagging, summarization, and categorization.',
          'Owned Spring Boot multi-tenant SaaS backends (database-per-tenant) and delivered Python/FastAPI services with React frontends directly for enterprise clients.',
          'Built AWS-backed APIs with caching, optimized SQL access, Spring WebFlux concurrency, and OAuth2/JWT security; validated with load testing and strong unit-test coverage.',
          'Implemented Prometheus/Grafana/Loki observability to keep production issues visible and fast to diagnose.',
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
        period: 'May 2019 — Oct 2021',
        dateTimeStart: '2019-05',
        dateTimeEnd: '2021-10',
        highlights: [
          'Built Android core features for Bangladesh’s large-scale 10 Minute School app—Split APK, live classes, and offline learning for millions of learners.',
          'Delivered API-driven, white-label modules with branding cached at app start for partner organizations.',
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
    summary:
      'LLM-powered tagging, summarization, and categorization pipeline that replaced a multi-day manual PubMed workflow.',
    problem:
      'Clients and data-entry teams spent multiple days manually tagging and categorizing PubMed articles before downstream use.',
    approach:
      'Interviewed stakeholders to map the workflow, then built and led an asynchronous Java/Spring Boot service on AWS with PostgreSQL and OpenAI API integration for automated tagging, summarization, and categorization.',
    outcome:
      'Eliminated the manual multi-day tagging effort while keeping article metadata consistent and searchable for enterprise clients.',
    tags: ['Java', 'Spring Boot', 'OpenAI API', 'PostgreSQL', 'AWS'],
    featured: true,
  },
  {
    id: '02',
    title: 'Smart Digital Advertisement',
    summary:
      'Go service powering a highly available advertising platform for 100+ distributed WiFi stations on AWS.',
    problem:
      'A single-node proof of concept could not reliably serve ads across a growing footprint of distributed WiFi stations.',
    approach:
      'Evolved the POC into a horizontally scalable Go service on AWS with ALB, Auto Scaling, PostgreSQL, and Redis—designed for high availability and operational simplicity.',
    outcome:
      'Production platform supporting 100+ WiFi stations with resilient delivery and room to scale horizontally.',
    tags: ['Go', 'AWS', 'ALB', 'Auto Scaling', 'PostgreSQL', 'Redis'],
    featured: true,
  },
  {
    id: '03',
    title: 'Enterprise Multi-Tenant SaaS',
    summary: 'Database-per-tenant Spring Boot backends with OAuth2 security and reactive concurrency.',
    problem:
      'Enterprise clients required isolated tenant data, secure API access, and predictable performance under concurrent load.',
    approach:
      'Designed database-per-tenant Spring Boot services with OAuth2/JWT, optimized SQL access patterns, and Spring WebFlux for non-blocking I/O—paired with Python/FastAPI and React delivery for client-facing surfaces.',
    outcome:
      'Hardened REST APIs and tenant isolation that supported multiple enterprise clients on shared infrastructure.',
    tags: ['Java', 'Spring Boot', 'Spring WebFlux', 'OAuth2', 'PostgreSQL'],
  },
  {
    id: '04',
    title: 'CI/CD and DevSecOps Platform',
    summary: 'Automated release pipelines with security gates for containerized Kubernetes workloads.',
    problem:
      'Manual deployments were slow, error-prone, and lacked consistent security checks before production release.',
    approach:
      'Implemented Jenkins and GitHub Actions pipelines for Docker builds and Kubernetes deploys—with secrets management, SAST, dependency scanning, image security gates, and zero-downtime rollout patterns.',
    outcome:
      'Reduced deployment time by 80% while embedding DevSecOps checks into every release.',
    tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'DevSecOps'],
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
    skills: ['Java', 'Python', 'TypeScript', 'Go', 'SQL', 'Bash'],
  },
  {
    name: 'AI / LLM',
    description: 'Integrating large language models into production workflows and products.',
    skills: [
      'OpenAI API',
      'Prompt Engineering',
      'LLM Tagging Pipelines',
      'Summarization',
      'Categorization',
    ],
  },
  {
    name: 'Frameworks',
    description: 'Service frameworks and UI stacks used to ship client-facing products.',
    skills: ['FastAPI', 'Spring Boot', 'Spring Data JPA', 'Spring WebFlux', 'React'],
  },
  {
    name: 'Cloud & Delivery',
    description: 'Cloud platforms and delivery tooling for reliable production releases.',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'GitHub Actions',
      'Jenkins',
      'GitLab CI',
    ],
  },
  {
    name: 'Data & Messaging',
    description: 'Storage, caching, and asynchronous messaging.',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'],
  },
  {
    name: 'Practices',
    description: 'Engineering habits that keep systems operable under real load.',
    skills: [
      'Rapid Prototyping',
      'API Design',
      'Prometheus',
      'Grafana',
      'Loki',
      'DevSecOps Gates',
      'TDD',
      'Agile',
    ],
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
    name: 'HashiCorp Certified: Terraform Associate (004)',
    issuer: 'HashiCorp',
  },
]

export const education = {
  degree: 'B.Sc. in Computer Science and Engineering (CSE)',
  school: 'Bangladesh University of Business and Technology',
  major: 'Major in Artificial Intelligence',
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
  { value: '2', label: 'Cloud Certifications' },
]
