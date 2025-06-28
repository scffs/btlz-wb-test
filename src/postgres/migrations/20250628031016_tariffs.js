/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("wb_tariff_boxes", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();

        table.string("dt_next_box").notNullable();
        table.string("dt_till_max").notNullable();
        table.string("warehouse_name").notNullable();

        table.decimal("delivery_and_storage_expr", 10, 2).notNullable();
        table.decimal("delivery_base", 10, 2).notNullable();
        table.decimal("delivery_liter", 10, 2).notNullable();
        table.decimal("storage_base", 10, 2).notNullable();
        table.decimal("storage_liter", 10, 2).notNullable();

        table.unique(["date", "warehouse_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("wb_tariff_boxes");
}
