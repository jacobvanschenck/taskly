import {
	foreignKey,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});

export const teamsTable = sqliteTable("teams_table", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
});

export const teamMembersTable = sqliteTable(
	"team_members_table",
	{
		teamId: text("team_id").references(() => teamsTable.id),
		userId: text("user_id").references(() => usersTable.id),
		role: text("role", { enum: ["admin", "member"] }),
		createdAt: integer("created_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date()),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.notNull()
			.$defaultFn(() => new Date())
			.$onUpdateFn(() => new Date()),
	},
	(table) => [
		primaryKey({
			columns: [table.teamId, table.userId],
		}),
	],
);

export const tasksTable = sqliteTable(
	"tasks_table",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		status: text("status", {
			enum: ["not_started", "in_progress", "completed"],
		})
			.notNull()
			.default("not_started"),
		name: text("name").notNull(),
		description: text("description"),
		parentId: text("parent_id"),
		assignedTo: text("assigned_to").references(() => usersTable.id),
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
