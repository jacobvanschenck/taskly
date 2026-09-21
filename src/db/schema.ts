import {
	foreignKey,
	integer,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable(
	"tasks_table",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		status: text("status").notNull().default("not_started"),
		name: text("name").notNull(),
		description: text("description"),
		parentId: text("parent_id"),
		dueAt: integer("due_at", { mode: "timestamp_ms" }),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date()),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date())
			.$onUpdateFn(() => new Date()),
	},
	(table) => [
		foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "tasks_parent_id_fkey",
		}).onDelete("set null"),
	],
);
