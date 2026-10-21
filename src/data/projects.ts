/** Fallback selected-work cards when the API is unavailable. */
export const projects = [
  {
    name: 'Incentiwise',
    tag: 'Enterprise · Multi-tenant',
    blurb:
      'Multi-tenant rewards platform with JWT/RBAC APIs, Form Builder, Recognition Feed, Keka/Xoxoday integrations, Celery jobs, WebSockets, and AWS Docker deploys.',
    stack: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'AWS'],
  },
  {
    name: 'CricStats',
    tag: 'Real-time · Event-driven',
    blurb:
      'High-volume cricket scoring with Django Channels WebSockets for live updates and automated Vizrt broadcast graphics backends.',
    stack: ['Django Channels', 'REST', 'WebSockets'],
  },
  {
    name: 'Clanner AI',
    tag: 'AI · Media',
    blurb:
      'Backend APIs for an AI platform that turns text prompts into short-form video, with Flask workflows and automation features.',
    stack: ['Python', 'Flask'],
  },
]
