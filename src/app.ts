import { migrate, seed } from "#postgres/knexInstance.js";
import { tariffSyncService } from "#jobs/tariffSync/tariffSync.js";

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

tariffSyncService.start();
