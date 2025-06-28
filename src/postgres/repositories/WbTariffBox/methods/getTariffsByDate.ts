import { WbTariffBoxRepository } from "../repository.js";

export async function getTariffsByDate(this: WbTariffBoxRepository, date: string) {
    return this.db(this.tableName).where({ date }).orderBy("delivery_and_storage_expr", "asc");
}
