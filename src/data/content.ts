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
    'I am a Senior Software Engineer with more than seven years of experience building and running production software. I work closely with clients from early requirements through release, and I build backend services in Java, Python, and Go—often with LLM features via the OpenAI API—primarily on AWS.',
  availability: 'Open to Forward Deployed AI, backend, and cloud engineering roles',
  heroPitch:
    'I help teams turn unclear product needs into reliable SaaS, LLM-assisted data pipelines, and Kubernetes platforms on AWS—and I stay involved after launch.',
}

export const workPrinciples = [
  {
    title: 'Scope with stakeholders',
    description:
      'I prefer to agree on requirements, limits, and success criteria before locking an architecture. It saves rework and keeps delivery on a clear path.',
  },
  {
    title: 'Ship with operational readiness',
    description:
      'CI/CD, security checks, and monitoring belong in the build from day one—not as a cleanup task after something fails in production.',
  },
  {
    title: 'Design for systems, not features',
    description:
      'I pay attention to tenant isolation, clear service boundaries, and infrastructure as code so the platform stays manageable as it grows.',
  },
] as const

export const sections = {
  about: {
    label: 'About',
    title: 'Engineering for Production',
    subtitle:
      'I focus on work that reaches production and stays healthy under real use—from early scoping through deployment and day-to-day operations.',
    continued:
      'At Brain Station 23, I lead technical delivery for enterprise SaaS. That means scoping with Product and clients, prototyping, shipping, and operating live systems, while mentoring engineers across Java, Python, and Go.',
  },
  experience: {
    label: 'Experience',
    title: 'Where I Have Delivered',
    subtitle:
      'Roles where I have built backend services, AI integrations, and cloud platforms used in production.',
  },
  projects: {
    label: 'Projects',
    title: 'Systems I Have Built',
    subtitle:
      'A selection of work, each described by the problem we faced, how we approached it, and what we delivered.',
  },
  skills: {
    label: 'Skills',
    title: 'Technical Stack',
    subtitle:
      'Languages, platforms, and practices I use to design and operate production software.',
  },
  certifications: {
    label: 'Certifications',
    title: 'Industry Certifications',
    subtitle: 'Credentials I hold from AWS and HashiCorp.',
    credlyLink: 'View all verified credentials on Credly',
  },
  education: {
    label: 'Education',
    title: 'Academic Foundation',
    subtitle: 'A computer science degree with a major in artificial intelligence.',
  },
  contact: {
    label: 'Contact',
    title: 'Start a Conversation',
    subtitle: 'I am open to Forward Deployed AI, backend, and cloud engineering roles.',
    intro:
      'If you are exploring LLM integrations, platform work, or cloud architecture, please reach out by email or LinkedIn. I am glad to discuss how I can help.',
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
          'Lead technical delivery for enterprise SaaS products: scoping with Product and clients, prototyping, shipping, and supporting systems in production.',
          'Run CI/CD on Jenkins and GitHub Actions for Docker and Kubernetes. Cut deployment time by 80% with zero-downtime releases and DevSecOps checks (secrets, SAST, dependency, and image scans).',
          'Mentor engineers across Java, Python, and Go, and lead design and code reviews.',
          'Designed Smart Digital Advertisement (Go) for more than 100 WiFi stations—taking a single-node proof of concept to a scalable AWS setup with ALB, Auto Scaling, PostgreSQL, and Redis.',
        ],
      },
      {
        title: 'Software Engineer',
        period: 'Nov 2021 — Jun 2025',
        dateTimeStart: '2021-11',
        dateTimeEnd: '2025-06',
        highlights: [
          'Spoke with clients and data-entry teams to understand a multi-day manual tagging process, then built and led the Omnizia PubMed Service (Java, Spring Boot, OpenAI API) to automate tagging, summarization, and categorization.',
          'Owned Spring Boot multi-tenant SaaS backends (database per tenant) and delivered Python/FastAPI services with React frontends for enterprise clients.',
          'Built AWS APIs with caching, tuned SQL access, Spring WebFlux for concurrency, and OAuth2/JWT security; confirmed quality with load testing and solid unit coverage.',
          'Added Prometheus, Grafana, and Loki so production issues were easier to see and resolve quickly.',
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
          'Built core Android features for the 10 Minute School app in Bangladesh—Split APK, live classes, and offline learning for millions of learners.',
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
      'An LLM pipeline for tagging, summarizing, and categorizing PubMed articles—replacing a multi-day manual workflow.',
    problem:
      'Clients and data-entry teams spent several days tagging and sorting PubMed articles by hand before the content could be used.',
    approach:
      'I met with stakeholders to map the workflow, then led an asynchronous Java/Spring Boot service on AWS with PostgreSQL and the OpenAI API to automate tagging, summarization, and categorization.',
    outcome:
      'The manual multi-day tagging step was no longer needed, and article metadata stayed consistent and searchable for enterprise clients.',
    tags: ['Java', 'Spring Boot', 'OpenAI API', 'PostgreSQL', 'AWS'],
    featured: true,
  },
  {
    id: '02',
    title: 'Smart Digital Advertisement',
    summary:
      'A Go service that runs advertising across more than 100 WiFi stations on AWS.',
    problem:
      'A single-node proof of concept could not keep up as the number of WiFi stations grew.',
    approach:
      'We moved the proof of concept to a horizontally scalable Go service on AWS, using ALB, Auto Scaling, PostgreSQL, and Redis, with an emphasis on availability and straightforward operations.',
    outcome:
      'The platform now serves more than 100 WiFi stations reliably and can scale further as needed.',
    tags: ['Go', 'AWS', 'ALB', 'Auto Scaling', 'PostgreSQL', 'Redis'],
    featured: true,
  },
  {
    id: '03',
    title: 'Enterprise Multi-Tenant SaaS',
    summary:
      'Spring Boot backends with a database per tenant, OAuth2 security, and reactive concurrency.',
    problem:
      'Enterprise clients needed isolated tenant data, secure APIs, and steady performance when many users were active at once.',
    approach:
      'I designed database-per-tenant Spring Boot services with OAuth2/JWT, careful SQL access patterns, and Spring WebFlux for non-blocking I/O, alongside Python/FastAPI and React where clients needed a UI.',
    outcome:
      'We delivered secure REST APIs and clear tenant isolation for multiple enterprise clients on shared infrastructure.',
    tags: ['Java', 'Spring Boot', 'Spring WebFlux', 'OAuth2', 'PostgreSQL'],
  },
  {
    id: '04',
    title: 'CI/CD and DevSecOps Platform',
    summary:
      'Release pipelines with security checks for containerized workloads on Kubernetes.',
    problem:
      'Deployments were mostly manual—slow, easy to get wrong, and light on security checks before production.',
    approach:
      'I set up Jenkins and GitHub Actions pipelines for Docker builds and Kubernetes deploys, including secrets handling, SAST, dependency and image scans, and zero-downtime rollout patterns.',
    outcome:
      'Deployment time dropped by 80%, and security checks became a normal part of every release.',
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
    description: 'Languages I use for backend services, APIs, data access, and scripting.',
    skills: ['Java', 'Python', 'TypeScript', 'Go', 'SQL', 'Bash'],
  },
  {
    name: 'AI / LLM',
    description: 'Ways I bring large language models into real product workflows.',
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
    description: 'Frameworks I use to build services and client-facing interfaces.',
    skills: ['FastAPI', 'Spring Boot', 'Spring Data JPA', 'Spring WebFlux', 'React'],
  },
  {
    name: 'Cloud & Delivery',
    description: 'Cloud platforms and delivery tools I use for production releases.',
    skills: [
      'AWS',
      'GCP',
      'Azure',
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
    description: 'Datastores, caches, and messaging I work with in production systems.',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'],
  },
  {
    name: 'Practices',
    description: 'Habits and tooling that keep systems operable once they are live.',
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
