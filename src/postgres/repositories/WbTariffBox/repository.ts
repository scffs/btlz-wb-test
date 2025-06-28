import { Knex } from "knex";
import { knexInstance } from "#postgres/knexInstance.js";

import { upsertTariff } from "./methods/upsertTariff.js";
import { getTariffsByDate } from "./methods/getTariffsByDate.js";

export class WbTariffBoxRepository {
    constructor(protected readonly db: Knex) {}

    readonly tableName = "wb_tariff_boxes";
    upsertTariff = upsertTariff;
    getTariffsByDate = getTariffsByDate;
}

export const wbTariffBoxRepository = new WbTariffBoxRepository(knexInstance);
