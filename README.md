# TeamFlow

A collaborative work platform prototype that combines team calendars, tasks,
chat, profiles, and team analytics in one responsive interface.

## Current prototype

- personal and team calendars;
- task lists with status and progress;
- team pages, member management, and statistics;
- text chat interface;
- user profiles and reusable profile templates;
- pricing, support, documentation, and blog pages;
- Ukrainian, English, and Polish translations;
- mock data for running the frontend without a backend.

The current repository contains a frontend prototype. Authentication, chat,
payments, and persistence are represented in the interface but are not a
production backend.

## Development

Requirements: Node.js 22+ and npm.

```bash
cd web
npm ci
npm run dev
```

## Quality checks

```bash
cd web
npm run lint
npm run build
```

The Vite application is configured for deployment below `/TeamFlow/`.

## Technology

- React 19 and TypeScript
- Vite and Tailwind CSS
- React Router
- i18next
- Framer Motion

## License

MIT. See [LICENSE](LICENSE).
