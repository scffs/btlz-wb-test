import { migrate, seed } from "#postgres/knexInstance.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");
