interface ErrorResponse429 {
    title: string;
    detail: string;
    code: string;
    requestId: string;
    origin: string;
    status: number;
    statusText: string;
    timestamp: string;
}

interface ErrorResponse400 {
    detail: string;
    origin: string;
    requestId: string;
    title: string;
}

interface ErrorResponse401 {
    title: string;
    detail: string;
    code: string;
    requestId: string;
    origin: string;
    status: number;
    statusText: string;
    timestamp: string;
}

export const isErrorResponse429 = (data: unknown): data is ErrorResponse429 => {
    return (
        typeof data === "object" &&
        data !== null &&
        "status" in data &&
        data.status === 429 &&
        "title" in data &&
        typeof data.title === "string" &&
        "detail" in data &&
        typeof data.detail === "string"
    );
};

export const isErrorResponse400 = (data: unknown): data is ErrorResponse400 => {
    return (
        typeof data === "object" && data !== null && "title" in data && typeof data.title === "string" && "detail" in data && typeof data.detail === "string"
    );
};

export const isErrorResponse401 = (data: unknown): data is ErrorResponse401 => {
    return (
        typeof data === "object" &&
        data !== null &&
        "status" in data &&
        data.status === 401 &&
        "title" in data &&
        typeof data.title === "string" &&
        "detail" in data &&
        typeof data.detail === "string"
    );
};
