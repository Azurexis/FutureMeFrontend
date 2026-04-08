# FutureMe

FutureMe is a small full-stack Azure project that lets users schedule an email to be sent to themselves in the future.

A React frontend submits a scheduling request to an Azure Function API. The backend stores the request in Azure Table Storage, and a timer-triggered Azure Function checks for pending emails and sends them later via Azure Communication Services Email.

## Why I built this

I wanted to build a realistic Azure portfolio project that is small enough to finish, but still demonstrates real cloud architecture and not just a tutorial-level CRUD app.

This project shows how to combine:
- a React frontend
- an HTTP-triggered Azure Function API
- a timer-triggered background process
- Azure Table Storage
- Azure Communication Services Email
- deployment and configuration across local and Azure environments

## Features

- Schedule an email for a future date and time
- Store scheduled emails in Azure Table Storage
- Process pending emails with a timer-triggered Azure Function
- Send emails through Azure Communication Services
- Basic frontend validation
- Error handling and status tracking for scheduled emails

## Architecture

```text
React Frontend
    ↓
HTTP-triggered Azure Function (ScheduleEmail)
    ↓
Azure Table Storage (ScheduledEmails)
    ↓
Timer-triggered Azure Function (SendScheduledEmails)
    ↓
Azure Communication Services Email
```

## Important note

Because this is a Vite frontend, environment variables are injected at build time, not runtime.

That means:

- local values can come from .env.local
- deployed values must be available during the build process

## Deployment

The frontend is deployed via Azure Static Web Apps.

For deployment, the API URL is provided through GitHub Actions using a GitHub secret such as:

```text
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

The built frontend then calls the backend through Azure API Management.

## Backend connection

This frontend does not send emails directly.

Instead, it sends scheduling requests to the backend API.

Expected request shape:

`{
  "recipientEmail": "you@example.com",
  "subject": "Hello from the past",
  "body": "This is a message for future me.",
  "scheduledForUtc": "2026-04-08T12:00:00Z"
}`

## Purpose

This project was built as a portfolio piece to demonstrate:

- React frontend development
- API integration
- full-stack coordination with Azure services
- real-world environment/configuration handling
- deployment through Azure Static Web Apps

## Related repository

This repository contains the frontend only.
The backend is implemented separately with Azure Functions.

## Author

Built by Nick.
