import { ValidatedTariffBoxData } from "#modules/wb/methods/getTariffsBox/types.js";

import { WbTariffBoxRepository } from "../repository.js";
import { TariffBoxDbRecord } from "../types.js";

export async function upsertTariff(this: WbTariffBoxRepository, date: string, data: ValidatedTariffBoxData): Promise<void> {
    if (!data.warehouseList) {
        return;
    }

    const rows: TariffBoxDbRecord[] = data.warehouseList.map((w) => ({
        date,
        dt_next_box: data.dtNextBox,
        dt_till_max: data.dtTillMax,
        warehouse_name: w.warehouseName,
        delivery_and_storage_expr: w.boxDeliveryAndStorageExpr,
        delivery_base: w.boxDeliveryBase,
        delivery_liter: w.boxDeliveryLiter,
        storage_base: w.boxStorageBase,
        storage_liter: w.boxStorageLiter,
    }));

    const trx = await this.db.transaction();

    try {
        for (const row of rows) {
            await trx(this.tableName).insert(row).onConflict(["date", "warehouse_name"]).merge();
        }
        await trx.commit();
    } catch (err) {
        await trx.rollback();
        throw err;
    }
}
