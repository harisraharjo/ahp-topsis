## Learn More

T3 Stack <strong>tanpa</strong> TRPC dan Prisma Client.

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials
- [Overview](https://www.youtube.com/watch?v=VJH8dsPtbeU) - Tapi tanpa app dir
- [UUID vs CUID vs NanoId](https://dev.to/harshhhdev/uuidguid-cuid-nanoid-whats-the-difference-5dj1)

## Flow

- Database

  1\. Create Model and schema with Prisma\
  2\. Push (don't use migrate!, yet) to planetscale\
  3\. Import type to typescript with `db:type`

## Resources

- Prisma:
  - [Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference). Pelajari mana yang implemented (keyword: `implemented`) by prisma dan mana yang langsung di db. Jadi kalau diimplementasi oleh prisma maka kita buat sendiri juga.
  - [Prisma Mapping to MySql](https://www.prisma.io/docs/concepts/database-connectors/mysql#type-mapping-between-mysql-to-prisma-schema)
  - [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-models)

## FLAG TO LOOKOUT FOR

- TODO, FIXME, DANGER

# TODO

- Use nextauth inside middleware?
- Ganti OAuth discord ke Google
- Add Github Webhook(?).\
  Possible flow:\
  user action (C,U,D) -> create github repo issue with its data -> github dispatch webhook with data -> api receive webhook -> update data to database from api -> revalidate page(s) from api
- Change GETTER to a class or something simple. [Perf](https://webreflection.medium.com/js-benchmarking-lazy-getters-9b132f45c15e)
