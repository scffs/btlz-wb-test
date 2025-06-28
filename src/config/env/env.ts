import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),

    POSTGRES_HOST: z.string().default("localhost"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_DB: z.string().min(1).default("postgres"),
    POSTGRES_USER: z.string().min(1).default("postgres"),
    POSTGRES_PASSWORD: z.string().min(1).default("postgres"),

    APP_PORT: z.coerce.number().int().positive().default(3000),

    WB_API_URL: z.string().min(1),
    WB_API_KEY: z.string().min(1),

    GOOGLE_SHEET_IDS: z
        .string()
        .min(1)
        .transform((val) => val.split(",").map((id) => id.trim()))
        .refine((arr) => arr.every((id) => /^[a-zA-Z0-9-_]+$/.test(id))),
    GOOGLE_CREDENTIALS_PATH: z.string().min(1),
});

const env = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,

    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,

    APP_PORT: process.env.APP_PORT,

    WB_API_URL: process.env.WB_API_URL,
    WB_API_KEY: process.env.WB_API_KEY,

    GOOGLE_SHEET_IDS: process.env.GOOGLE_SHEET_IDS,
    GOOGLE_CREDENTIALS_PATH: process.env.GOOGLE_CREDENTIALS_PATH,
});

if (!env.success) {
    console.error(".env error:");

    env.error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
}

export default env.data;
