import env from "#config/env/env.js";
import type { Knex } from "knex";

const environment = env.NODE_ENV ?? "development";

const knexConfigs: Record<typeof environment, Knex.Config> = {
    development: {
        client: "pg",
        connection: {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            database: env.POSTGRES_DB,
            user: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            stub: "src/config/knex/migration.stub.js",
            directory: "./src/postgres/migrations",
            tableName: "migrations",
            extension: "ts",
        },
        seeds: {
            stub: "src/config/knex/seed.stub.js",
            directory: "./src/postgres/seeds",
            extension: "js",
        },
    },
    production: {
        client: "pg",
        connection: {
            host: env.POSTGRES_HOST,
            port: env.POSTGRES_PORT,
            database: env.POSTGRES_DB,
            user: env.POSTGRES_USER,
            password: env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            stub: "dist/config/knex/migration.stub.js",
            directory: "./dist/postgres/migrations",
            tableName: "migrations",
            extension: "js",
        },
        seeds: {
            stub: "src/config/knex/seed.stub.js",
            directory: "./dist/postgres/seeds",
            extension: "js",
        },
    },
};

export default knexConfigs[environment];
