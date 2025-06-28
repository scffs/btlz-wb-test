export interface TariffBoxDbRecord {
    date: string;
    dt_next_box: string;
    dt_till_max: string;
    warehouse_name: string;
    delivery_and_storage_expr: number;
    delivery_base: number;
    delivery_liter: number;
    storage_base: number;
    storage_liter: number;
}
