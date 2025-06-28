import { TariffSyncService } from "../tariffSync.js";

export async function syncTariffs(this: TariffSyncService) {
    try {
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        console.log(`[TariffSync] Starting sync for date: ${date}`);

        const data = await this.wbApi.getTariffsBox(date);

        if (!data || !data.warehouseList) {
            throw new Error("Received empty data from WB API");
        }

        console.log(`[TariffSync] Received data for ${data.warehouseList?.length || 0} warehouses`);

        await this.tariffRepo.upsertTariff(date, data);
        console.log("[TariffSync] Data saved to database");

        const tariffs = await this.tariffRepo.getTariffsByDate(date);

        console.log(`[TariffSync] Retrieved ${tariffs.length} tariffs from database`);

        await this.updateAllSheets(tariffs);
        console.log(`[TariffSync] Sheets updated at ${new Date().toISOString()}`);
    } catch (err) {
        console.error(`[TariffSync] Error:`, err);
    }
}
