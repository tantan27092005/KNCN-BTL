'use server';

interface SearchParams {
    category?: string;
    brand?: string;
    ram?: number;
    type?: string;
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

interface FetchProductDetailProps {
    _id: string;
}

// Log API errors
const logResponseError = async (res: Response) => {
    console.error(`HTTP Error: ${res.status} ${res.statusText}`);
    try {
        const responseBody = await res.text();
        console.error('Response Body:', responseBody);
    } catch {
        console.error('Failed to parse error response.');
    }
};

// Clean search parameters
const cleanParams = (params: any) => {
    return Object.entries(params || {})
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

// General fetch function for products
export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL;

        if (!NEXT_DOMAIN_URL) {
            throw new Error('NEXT_DOMAIN_URL is not defined. Please check your .env file.');
        }

        const url = `${NEXT_DOMAIN_URL}/products?${queryParams}`;
        console.log('Fetching products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
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

// Fetch phone products
export const fetchPhoneProducts = async (props: FetchProductsProps) => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=phone&${queryParams}`;
        console.log('Fetching phone products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch phone products.');
        }

        return await res.json();
    } catch (error) {
        console.error('Error in fetchPhoneProducts:', error.message);
        return [];
    }
};

// Fetch laptop products
export const fetchLaptopProducts = async (props: FetchProductsProps) => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=laptop&${queryParams}`;
        console.log('Fetching laptop products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch laptop products.');
        }

        return await res.json();
    } catch (error) {
        console.error('Error in fetchLaptopProducts:', error.message);
        return [];
    }
};

// Fetch product detail
export const fetchProductDetail = async (props: FetchProductDetailProps) => {
    try {
        const { _id } = props;
        const url = `${process.env.NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Fetching product detail:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch product detail.');
        }

        return await res.json();
    } catch (error) {
        console.error('Error in fetchProductDetail:', error.message);
        return null;
    }
};
