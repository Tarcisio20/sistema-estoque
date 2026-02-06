import { eq, isNull, name, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { categories, NewCategory, products } from "../db/schema";

export const createCategory = async (data: NewCategory) => {
    const result = await db.insert(categories).values(data).returning();
    return result[0];
}

export const listCategories = async (includeProductCount: boolean) => {
    if (includeProductCount) {
        const categoriesWithCount = await db.select({
            id: categories.id,
            name: categories.name,
            createdAt: categories.createdAt,
            productCount: sql<number>`count(${products.id})::int`
        }).
            from(categories).leftJoin(products, eq(categories.id, products.categoryId))
            .where(isNull(categories.deletedAt)).groupBy(categories.id)

        return categoriesWithCount
    }

    const categoriesList = await db.select().from(categories).where(isNull(categories.deletedAt));

    return categoriesList
}