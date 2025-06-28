import { google } from "googleapis";
import env from "#config/env/env.js";

import { updateStocksCoefsSheet } from "./methods/updateStocksCoefsSheet.js";

export class GoogleSheetsService {
    private readonly auth;
    protected readonly sheets;

    constructor() {
        this.auth = new google.auth.GoogleAuth({
            keyFilename: env.GOOGLE_CREDENTIALS_PATH,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        this.sheets = google.sheets({ version: "v4", auth: this.auth });
    }

    updateStocksCoefsSheet = updateStocksCoefsSheet;
}

export const googleSheetsService = new GoogleSheetsService();
