import { TariffBoxDbRecord } from "#postgres/repositories/WbTariffBox/types.js";
import { GoogleSheetsService } from "../googleSheets.js";

export async function updateStocksCoefsSheet(this: GoogleSheetsService, sheetId: string, tariffs: TariffBoxDbRecord[]) {
    try {
        const sorted = [...tariffs].sort((a, b) => {
            const aCoef = Number(a.delivery_and_storage_expr) || 0;
            const bCoef = Number(b.delivery_and_storage_expr) || 0;
            return aCoef - bCoef;
        });

        const values = sorted.map((tariff) => [
            tariff.warehouse_name,
            tariff.delivery_and_storage_expr,
            tariff.delivery_base,
            tariff.delivery_liter,
            tariff.storage_base,
            tariff.storage_liter,
            tariff.dt_next_box,
            tariff.dt_till_max,
        ]);

        values.unshift([
            "Склад",
            "Коэффициент, %",
            "Доставка 1 литра, ₽",
            "Доставка каждого дополнительного литра, ₽",
            "Хранение 1 литра, ₽",
            "Хранение каждого дополнительного литра, ₽",
            "Дата начала следующего тарифа",
            "Дата окончания последнего установленного тарифа",
        ]);

        await this.sheets.spreadsheets.values.update({
            spreadsheetId: sheetId,
            range: "stocks_coefs!A1",
            valueInputOption: "RAW",
            requestBody: {
                values,
            },
        });
    } catch (err) {
        console.error(`[GoogleSheets] Error updating sheet ${sheetId}:`, err);
        throw err;
    }
}
