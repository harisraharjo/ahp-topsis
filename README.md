## Prerequisites
  1. Planetscale account
  2. Clerk account
  3. Put the necessary secret keys in .env.local by following the example in .env.example.  if you don't have .env.local file, you have to create it first

## Flow

- Database

  1\. Create Model and schema with Prisma\
  2\. Push (don't use migrate!, yet) to planetscale\
  3\. Import type to typescript with `db:type`