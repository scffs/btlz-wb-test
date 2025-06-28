import env from "#config/env/env.js";
import { TariffBoxDbRecord } from "#postgres/repositories/WbTariffBox/types.js";

import { TariffSyncService } from "../tariffSync.js";

export async function updateAllSheets(this: TariffSyncService, tariffs: TariffBoxDbRecord[]) {
    try {
        const sheetIds = env.GOOGLE_SHEET_IDS;

        for (const sheetId of sheetIds) {
            try {
                await this.sheetsService.updateStocksCoefsSheet(sheetId, tariffs);
                console.log(`[TariffSync] Updated sheet ${sheetId}`);
            } catch (sheetError) {
                console.error(`[TariffSync] Error updating sheet ${sheetId}:`, sheetError);
            }
        }
    } catch (err) {
        console.error("[TariffSync] Error in sheet update process:", err);
        throw err;
    }
}
