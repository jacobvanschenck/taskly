import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks_table", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	status: text("status").notNull().default("not_started"),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});
