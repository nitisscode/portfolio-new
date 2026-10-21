/**
 * Portfolio content source (frontend-only).
 * Edit this file + src/data/projects.ts to update the site — no backend required.
 */
export const profile = {
  name: 'Nitish Kumar',
  title: 'Software Engineer 1',
  tagline:
    'Backend engineer building scalable APIs, real-time systems, and cloud-ready infrastructure.',
  email: 'nitishkumar50805@gmail.com',
  phone: '+91 95725 08615',
  location: 'Noida, India',
  linkedin: 'https://linkedin.com/in/nitish-kumar-97b33a288',
  github: 'https://github.com/nitisscode',
  /** Place your PDF at public/resume.pdf */
  resumeUrl: '/resume.pdf',
  about:
    'Backend Software Developer with experience building scalable, production-grade backend systems using Python, Django, Django REST Framework, PostgreSQL, Redis, and AWS. Skilled in developing secure REST APIs, real-time applications, asynchronous workflows, cloud deployments, and performance optimization.',
}

export const skills = {
  Backend: [
    'Django',
    'Django REST Framework',
    'Django Channels',
    'Celery',
    'Celery Beat',
    'Flask',
    'Node.js',
    'Express.js',
  ],
  Languages: ['Python', 'JavaScript', 'Go (learning)'],
  'Databases & Cache': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  'Cloud & DevOps': ['AWS (EC2, ECR, S3)', 'Docker', 'Nginx', 'Git'],
  Core: [
    'REST APIs',
    'WebSockets',
    'JWT Authentication',
    'RBAC',
    'Multi-tenancy',
    'API Integration',
    'System Design',
    'Query Optimization',
    'Production Deployment',
  ],
}

export const experience = [
  {
    company: 'Wtvision Solutions',
    role: 'Software Developer (Backend)',
    period: 'Present',
    location: 'Noida',
    projects: [
      {
        name: 'Incentiwise',
        summary: 'Enterprise Rewards & Recognition Platform',
        points: [
          'Designed and developed scalable backend services for a multi-tenant enterprise platform using Python, Django, Django REST Framework, and PostgreSQL.',
          'Built secure REST APIs and organization-level public APIs with JWT authentication, RBAC, validation, pagination, filtering, and third-party integrations.',
          'Developed key product modules including a configurable Form Builder (Quizzes, Surveys, Polls, Pulse, Feedback), Recognition Feed (posts, badges, likes, comments, mentions), and Quarterly Badge Nominations with approval workflows.',
          'Integrated enterprise services including Keka HRMS for employee lifecycle automation and Xoxoday for reward coupon distribution and redemption.',
          'Implemented Celery background jobs for scheduled emails, notifications, API synchronization, cleanup tasks, and automated workflows, while enabling real-time notifications through WebSockets.',
          'Optimized bulk employee import/export, database queries, and managed production deployments on AWS (EC2, ECR, S3) using Docker and Nginx.',
        ],
      },
      {
        name: 'CricStats',
        summary: 'Real-time Cricket Scoring Platform',
        points: [
          'Collaborated with the engineering team to develop a real-time cricket scoring platform handling high-volume, event-driven match data.',
          'Developed REST APIs and WebSocket-based services using Django Channels for low-latency live score updates.',
          'Built backend services for fully automated Vizrt broadcast graphics, synchronizing live scoring events with on-air graphics in real time.',
          'Optimized backend workflows and collaborated with backend, frontend, QA, and broadcast teams to deliver reliable production releases.',
        ],
      },
    ],
  },
  {
    company: 'Galific Solutions',
    role: 'Python Backend Developer',
    period: '09/2024 – 11/2024',
    location: 'WFH',
    projects: [
      {
        name: 'Clanner AI',
        summary: 'AI short-video generation platform',
        points: [
          'Contributed to backend development of Clanner AI, an AI-driven platform for auto-generating short videos from text prompts.',
          'Worked with Python, Flask, and supporting libraries to build and optimize API workflows.',
          'Supported automation features, feature integration, and backend debugging.',
          'Gained hands-on experience in real-world development, collaboration, and deployment practices.',
        ],
      },
    ],
  },
]

export const education = [
  {
    degree: 'M.C.A',
    school: 'Amity University Online',
    period: '07/2025 – Present',
    location: 'Noida',
  },
  {
    degree: 'B.A',
    school: 'Sido Kanhu Murmu University',
    period: '07/2021 – 06/2024',
    location: 'Dumka',
  },
]

/**
 * Put certificate files in public/certificates/
 * - imageUrl: optional preview (png/jpg)
 * - fileUrl: view/download target (pdf or image)
 */
export const certificates = [
  {
    title: 'Full Stack Web Developer',
    issuer: 'Prepleaf by Masai',
    date: '25/06/2025',
    summary:
      'Career Accelerator Program (CAP-03) — 1,500 hours of practical learning with live projects, evaluations, and interviews. Full Stack MERN proficiency.',
    covered: [
      'Python',
      'Django',
      'Node.js',
      'Express.js',
      'SQL',
      'NoSQL',
      'HTML',
      'CSS',
      'JavaScript',
      'DSA',
    ],
    imageUrl: '/certificates/full-stack-prepleaf-masai.png',
    fileUrl: '/certificates/full-stack-prepleaf-masai.png',
    downloadName: 'Nitish-Kumar-Full-Stack-Certificate.png',
  },
  {
    title: 'Python Developer Internship',
    issuer: 'Galific Solutions',
    date: '05 December, 2024',
    summary:
      'Completed a 3-month internship as a Python Developer (01 Sep 2024 – 30 Nov 2024), focused on research, problem-solving, and adapting to new technologies.',
    covered: ['Python', 'Backend', 'Problem Solving'],
    imageUrl: '/certificates/insternship-completion-preview.png',
    fileUrl: '/certificates/internship-completion.pdf',
    downloadName: 'Nitish-Kumar-Internship-Certificate.pdf',
  },
]
