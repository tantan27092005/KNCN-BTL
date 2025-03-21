'use server';

interface ProductImage {
    thumbnail: string;
    bigProduct: string;
    title: string;
    _id: string;
}

interface Product {
    _id: string;
    title: string;
    desc: string;
    main_image: string;
    image: ProductImage[];
    isPromotion: boolean;
    originalPrice: number;
    promotionPercent: number;
    salePrice: number;
    rate: number;
    screen: string;
    storage: number;
    ram: number;
    battery: number;
    camera: number;
    charger: number;
    brand: string;
    category: string;
    type: string;
    __v: number;
}

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

interface FetchProductDetailProps {
    _id: string;
}

// Helper function to log errors
const logResponseError = async (res: Response) => {
    const { status, statusText, url } = res;
    console.error(`HTTP Error: ${status} ${statusText} for ${url}`);
    try {
        const responseBody = await res.text();
        console.error('Response Body:', responseBody);
    } catch {
        console.error('Failed to read response body.');
    }
};

// Clean search parameters to remove undefined or null values
const cleanParams = (params: any) => {
    return Object.entries(params || {})
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

// Generic fetch function with timeout handling
const fetchWithTimeout = async (url: string, options: any, timeout: number = 10000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(id);
    }
};

// Generalized fetch function for products
const fetchProductsByCategory = async (category: string = '', searchParams?: SearchParams): Promise<Product[]> => {
    try {
        const queryParams = new URLSearchParams(cleanParams(searchParams)).toString();
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL;

        if (!NEXT_DOMAIN_URL) {
            throw new Error('NEXT_DOMAIN_URL is not defined in .env file.');
        }

        const url = `${NEXT_DOMAIN_URL}/products${category ? `?category=${category}` : ''}&${queryParams}`;
        console.log('Calling API:', url);

        const res = await fetchWithTimeout(url, { next: { revalidate: 60 } }, 10000);

        if (!res.ok) {
            console.error(`Failed to fetch. Status: ${res.status}, Text: ${res.statusText}`);
            await logResponseError(res);
            throw new Error(`Failed to fetch products for category: ${category || 'all'}`);
        }

        return await res.json();
    } catch (err) {
        console.error(`Error in fetchProductsByCategory (${category || 'all'}):`, err.message);
        return [];
    }
};

// Fetch functions for products and details
export const fetchProducts = async (props: FetchProductsProps): Promise<Product[]> =>
    fetchProductsByCategory('', props?.searchParams);

export const fetchPhoneProducts = async (props: FetchProductsProps): Promise<Product[]> =>
    fetchProductsByCategory('phone', props?.searchParams);

export const fetchLaptopProducts = async (props: FetchProductsProps): Promise<Product[]> =>
    fetchProductsByCategory('laptop', props?.searchParams);

export const fetchProductDetail = async (props: FetchProductDetailProps): Promise<Product | null> => {
    try {
        const { _id } = props;
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL;

        if (!NEXT_DOMAIN_URL) {
            throw new Error('NEXT_DOMAIN_URL is not defined in .env file.');
        }

        const url = `${NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Calling API for product detail:', url);

        const res = await fetchWithTimeout(url, { next: { revalidate: 60 } }, 10000);

        if (!res.ok) {
            console.error(`Failed to fetch product detail. Status: ${res.status}, Text: ${res.statusText}`);
            await logResponseError(res);
            throw new Error('Failed to fetch product details');
        }

        return await res.json();
    } catch (err) {
        console.error('Error in fetchProductDetail:', err.message);
        return null;
    }
};
