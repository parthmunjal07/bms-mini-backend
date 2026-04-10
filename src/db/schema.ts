import { boolean, integer, pgTable, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', {length: 50}).notNull(),
    lastName: varchar('last_name', {length: 50}),
    email: varchar('email', {length: 322}).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    password: varchar('password', {length: 50}),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

}