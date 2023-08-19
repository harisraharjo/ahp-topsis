## Prerequisites
  1. A database in Planetscale. If you don't have a planetscale acoount, create one first.
  2. Clerk account
  3. follow the instructions from both planetscale & clerk and put the necessary secret keys in .env.local by following the example in .env.example.  if you don't have .env.local file, you have to create it first.

## Flow

- Development

  1\. Create a database in planetscale and put the necessary secret keys in .env.local\
  2\. Push the database to planetscale. use `pnpm db:push` \
  3\. Import database's type to typescript with `pnpm db:type`. It will create a file named types.ts inside folder `server/db`\
  4\. Change the isBenefit type to `isBenefit: Generated<0 | 1>` in interface Criteria inside the types.ts file

- Production

  1\. Create a database in planetscale and put the necessary secret keys in .env.local\
  2\. Push the database to planetscale. use `pnpm db:push` \
  3\. Import database's type to typescript with `pnpm db:type`. It will create a file named types.ts inside folder `server/db`\
  4\. Change the isBenefit type to `isBenefit: Generated<0 | 1>` in interface Criteria inside the types.ts file\
  5\. run `pnpm build`