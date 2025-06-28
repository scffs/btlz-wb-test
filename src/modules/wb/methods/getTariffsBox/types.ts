import { z } from "zod";
import { tariffBoxDataSchema } from "./schemas.js";

export interface TariffBoxWarehouse {
    /** Коэффициент, %. На него умножается стоимость доставки и хранения. Во всех тарифах этот коэффициент уже учтён */
    boxDeliveryAndStorageExpr: string;
    /** Доставка 1 литра, ₽ */
    boxDeliveryBase: string;
    /** Доставка каждого дополнительного литра, ₽ */
    boxDeliveryLiter: string;
    /** Хранение 1 литра, ₽ */
    boxStorageBase: string;
    /** Хранение каждого дополнительного литра, ₽ */
    boxStorageLiter: string;
    /** Название склада */
    warehouseName: string;
}

export interface TariffBoxData {
    /** Дата начала следующего тарифа */
    dtNextBox: string;
    /** Дата окончания последнего установленного тарифа */
    dtTillMax: string;
    /** Тарифы для коробов, сгруппированные по складам */
    warehouseList: TariffBoxWarehouse[] | null;
}

export interface TariffBoxSuccessResponse {
    response: {
        data: TariffBoxData;
    };
}

export type ValidatedTariffBoxData = z.infer<typeof tariffBoxDataSchema>;
