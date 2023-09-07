# AHP-TOPSIS

A tool to solve MCDM problems using a hybrid [AHP](https://en.wikipedia.org/wiki/Analytic_hierarchy_process) & [TOPSIS](https://en.wikipedia.org/wiki/TOPSIS) method.\
In this method, AHP is used to calculate the weights of the criteria and TOPSIS is used to rank the alternatives.

<img width="600" alt="image" src="https://github.com/harisraharjo/ahp-topsis/assets/34530664/40993e83-8a1b-430a-b540-72fd8f93e74e">

## Built With

- [Next JS](https://nextjs.org/)
- [React JS](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.com/)
- [Planetscale](https://planetscale.com/)
- [Kysely](https://kysely.dev/)
- [D3 Hierarchy](https://d3js.org/d3-hierarchy)
- [Shadcn](https://ui.shadcn.com/) (Partially)
- [use-gesture](https://use-gesture.netlify.app/) (Partially)
- [motion](https://motion.dev/) to utilise the Web Animations API

## Development

1. Planetscale database. If you don't have a planetscale account, create one first.
2. Clerk account
3. follow the instructions from both planetscale & clerk and put the necessary secret keys in .env.local by following the example in .env.example. if you don't have .env.local file, you have to create it first.\
4. run `pnpm install`\
5. add [this](github:harisraharjo/kysely-codegen#planetscale) kysely-codegen as dev dependencies to mirror planetscale data type to typescript. `pnpm add -D github:harisraharjo/kysely-codegen#planetscale`
6. Push the database to planetscale. run `pnpm db:push`

## TODO

1. Design
2. Configure the absolute paths in deployment
