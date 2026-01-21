import { integer, numeric, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";


export const moveTypeEnum = pgEnum('move_type', ['in', 'out'])

export const moves = pgTable('moves', {
    id : uuid('id').defaultRandom().primaryKey(),
    productId : uuid('product_id').notNull().references(() => products.id),
    userId : uuid('user_id').notNull().references(() => users.id),
    type : moveTypeEnum('type').notNull(),
    quantity : numeric('quantity').notNull().default('0'),
    unitPrice : integer('unit_price').notNull(),
    updatedAt : timestamp('updated_at').defaultNow()
})

export type Move = typeof moves.$inferSelect
export type NewMove = typeof moves.$inferInsert 