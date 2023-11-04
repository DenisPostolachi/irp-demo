# Nest.js + PostgreSQL Project for Data Reporting
This is a Nest.js backend project developed specifically for interns. It utilizes PostgreSQL for data storage and provides a set of RESTful endpoints to access and manipulate data used for generating graphs and reports.

## Project Overview

This project was developed to help interns understand the basics of building a REST API. The provided endpoints will serve data that can be used to generate graphs and reports for our internal data analysis tools.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- A package manager like npm or yarn
- PostgreSQL Database Server


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seed

```bash
$ ts-node src/seed.ts
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
