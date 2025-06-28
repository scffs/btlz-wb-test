import { AxiosError } from "axios";

import { WildberriesApi } from "#modules/wb/wildberriesApi.js";
import { delay } from "#utils/delay.js";

import { MAX_RETRIES } from "../../constants.js";
import { isErrorResponse400, isErrorResponse401 } from "../../guards.js";
import { TariffBoxSuccessResponse, ValidatedTariffBoxData } from "./types.js";
import { tariffBoxSuccessResponseSchema } from "./schemas.js";

export async function getTariffsBox(this: WildberriesApi, date: string): Promise<ValidatedTariffBoxData> {
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        try {
            const response = await this.client.get<TariffBoxSuccessResponse>("/tariffs/box", {
                params: { date },
            });

            const parsed = tariffBoxSuccessResponseSchema.parse(response.data);

            return parsed.response.data;
        } catch (err) {
            const error = err as AxiosError;

            if (!error.response) {
                throw new Error(`WB No response: ${error.message}`);
            }

            const { status, headers, data } = error.response;

            if (status === 429) {
                attempt++;

                if (attempt >= MAX_RETRIES) {
                    throw new Error(`WB Rate limit with max retries: ${JSON.stringify(data)}`);
                }

                const retryAfter = parseInt(headers["x-ratelimit-retry"] || "1", 10);

                await delay(retryAfter * 1000);
                continue;
            }

            if (status === 400 && isErrorResponse400(data)) {
                throw new Error(`WB Bad Request: ${data.title} — ${data.detail}`);
            }

            if (status === 401 && isErrorResponse401(data)) {
                throw new Error(`WB Unauthorized: ${data.title} — ${data.detail}`);
            }

            throw new Error(`Unknown WB error with status ${status} and data ${JSON.stringify(data)}`);
        }
    }

    throw new Error(`WB Too many retries to get tariffs`);
}
