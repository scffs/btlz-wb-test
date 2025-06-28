import axios, { AxiosInstance } from "axios";

import env from "#config/env/env.js";

import { RESPONSE_TIMEOUT } from "./constants.js";

import { getTariffsBox } from "./methods/getTariffsBox/getTariffsBox.js";

export class WildberriesApi {
    protected readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: env.WB_API_URL,
            headers: {
                Authorization: `Bearer ${env.WB_API_KEY}`,
                "Content-Type": "application/json",
            },
            timeout: RESPONSE_TIMEOUT,
        });
    }

    getTariffsBox = getTariffsBox;
}

export const wbApi = new WildberriesApi();
