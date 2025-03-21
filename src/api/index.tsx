'use server';

interface SearchParams {
    category?: string;
    brand?: string;
    ram?: number;
    screen?: number;
    storage?: number;
    charger?: number;
    price?: number;
    pricerange?: number;
    page?: number;
    limit?: number;
    keyword?: string;
}

interface FetchProductsProps {
    searchParams?: SearchParams;
}

const logResponseError = async (res: Response) => {
    console.error(`HTTP Error: ${res.status} ${res.statusText}`);
    try {
        console.error('Response Body:', await res.text());
    } catch (error) {
        console.error('Failed to parse error response.');
    }
};

const cleanParams = (params: any) => {
    return Object.entries(params || {})
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

const fetchWithTimeout = async (url: string, options: any, timeout = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(id);
    }
};

export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL;
        if (!NEXT_DOMAIN_URL) {
            throw new Error('NEXT_DOMAIN_URL is not defined. Please check your .env file.');
        }

        const queryParams = new URLSearchParams(cleanParams(props?.searchParams || {})).toString();
        const url = `${NEXT_DOMAIN_URL}/products?${queryParams}`;
        console.log('Calling API:', url);

        const res = await fetchWithTimeout(url, {}, 10000);
        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch products.');
        }

        return await res.json();
    } catch (error) {
        console.error('Error in fetchProducts:', error.message);
        return [];
    }
};
