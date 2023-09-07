# AHP-TOPSIS

A tool to solve MCDM problems using AHP & TOPSIS

<img width="600" alt="image" src="https://github.com/harisraharjo/ahp-topsis/assets/34530664/40993e83-8a1b-430a-b540-72fd8f93e74e">

## Development

1. Planetscale database. If you don't have a planetscale account, create one first.
2. Clerk account
3. follow the instructions from both planetscale & clerk and put the necessary secret keys in .env.local by following the example in .env.example. if you don't have .env.local file, you have to create it first.\
4. run `pnpm install`\
5. add [this](github:harisraharjo/kysely-codegen#planetscale) kysely-codegen as dev dependencies. `pnpm add -D github:harisraharjo/kysely-codegen#planetscale` to mirror planetscale data type to typescript
6. Push the database to planetscale. run `pnpm db:push`

## TODO

1. Design
2. configure absolute paths for deployment
