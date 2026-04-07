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