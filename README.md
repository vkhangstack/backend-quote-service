# Quotes Service Product

## Getting started

```bash
# 1. Clone the repository with ssh
git clone git@github.com:vkhangstack/backend-quote-service.git

# 2. Enter your newly-cloned folder.
cd backend-quote-service

# 3. Create Environment variables file.
cp .env.example .env

# 3. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn
```

## Teachnical

Node: v16+
Database: Postgresql (CSDL), Mongodb (Logs)
Yarn: v1.22.9+

### Development

```bash
# 4. Run development server and open http://localhost:3000
yarn start:dev

# 5. Read the documentation linked below for "Setup and development".
```

### Build

To build the App, run

```bash
yarn build:prod
```

And you will see the generated file in `dist` that ready to be served.

## Features

<dl>
  <!-- <dt><b>Quick scaffolding</b></dt>
  <dd>Create modules, services, controller - right from the CLI!</dd> -->

  <dt><b>Instant feedback</b></dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes are reflected instantaneously.</dd>

  <dt><b>JWT Authentication</b></dt>
  <dd>Installed and configured JWT authentication.</dd>

  <dt><b>Next generation Typescript</b></dt>
  <dd>Always up to date typescript version.</dd>

  <dt><b>Industry-standard routing</b></dt>
  <dd>It's natural to want to add pages (e.g. /about`) to your application, and routing makes this possible.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, staging and production environment configurations</dd>

  <dt><b>Swagger Api Documentation</b></dt>
  <dd>Already integrated API documentation. To see all available endpoints visit http://localhost:3000/documentation</dd>

  <dt><b>Linter</b></dt>  
  <dd>eslint + prettier = ❤️</dd>
</dl>
