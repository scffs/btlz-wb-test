import { z } from "zod";

const parseNumericString = (val: string) => {
    const num = parseFloat(val.replace(",", "."));
    return isNaN(num) ? 0 : num;
};

const parseOptionalNumericString = (val: string) => {
    if (val === "-") {
        return 0;
    }

    return parseNumericString(val);
};

const numericStringSchema = z.string().transform(parseNumericString);
const optionalNumericStringSchema = z.string().transform(parseOptionalNumericString);

const tariffBoxWarehouseSchema = z.object({
    boxDeliveryAndStorageExpr: numericStringSchema,
    boxDeliveryBase: numericStringSchema,
    boxDeliveryLiter: numericStringSchema,
    boxStorageBase: optionalNumericStringSchema,
    boxStorageLiter: optionalNumericStringSchema,
    warehouseName: z.string(),
});

const tariffBoxDataSchema = z.object({
    dtNextBox: z.string(),
    dtTillMax: z.string(),
    warehouseList: z.array(tariffBoxWarehouseSchema).nullable(),
});

const tariffBoxSuccessResponseSchema = z.object({
    response: z.object({
        data: tariffBoxDataSchema,
    }),
});

export { tariffBoxWarehouseSchema, tariffBoxDataSchema, tariffBoxSuccessResponseSchema };
