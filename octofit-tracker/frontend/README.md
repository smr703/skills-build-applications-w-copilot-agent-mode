# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API calls use:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

When it is not set, the app safely falls back to `http://localhost:8000/api/[component]/`.
