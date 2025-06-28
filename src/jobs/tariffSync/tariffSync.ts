import cron from "node-cron";

import { wbTariffBoxRepository, type WbTariffBoxRepository } from "#postgres/repositories/WbTariffBox/repository.js";

import { wbApi, type WildberriesApi } from "#modules/wb/wildberriesApi.js";
import { googleSheetsService, type GoogleSheetsService } from "#modules/googleSheets/googleSheets.js";

import { syncTariffs } from "./methods/syncTariffs.js";
import { updateAllSheets } from "./methods/updateAllSheets.js";

export class TariffSyncService {
    constructor(
        protected readonly wbApi: WildberriesApi,
        protected readonly tariffRepo: WbTariffBoxRepository,
        protected readonly sheetsService: GoogleSheetsService,
    ) {}

    public start() {
        cron.schedule("0 * * * *", this.syncTariffs.bind(this));

        setTimeout(() => this.syncTariffs(), 1000);
    }

    syncTariffs = syncTariffs;
    updateAllSheets = updateAllSheets;
}

export const tariffSyncService = new TariffSyncService(wbApi, wbTariffBoxRepository, googleSheetsService);
