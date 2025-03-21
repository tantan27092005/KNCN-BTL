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

// Helper to log response errors
const logResponseError = async (res: Response) => {
    const { status, statusText, url } = res;
    console.error(`HTTP Error: ${status} ${statusText} for ${url}`);
    try {
        const responseBody = await res.json();
        console.error('Error Details:', JSON.stringify(responseBody, null, 2));
    } catch {
        console.error('Failed to parse error response body.');
    }
};

// Generalized fetch function for products by category
const fetchProductsByCategory = async (category: string, searchParams?: SearchParams) => {
    try {
        const cleanParams = (params: any) => {
            return Object.entries(params || {})
                .filter(([_, value]) => value !== undefined && value !== null)
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        };

        const queryParams = new URLSearchParams(cleanParams(searchParams)).toString();
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL; // Cache environment variable
        const url = `${NEXT_DOMAIN_URL}/products?category=${category}&${queryParams}`;
        console.log('Calling API:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseError(res);
            throw new Error(`Failed to fetch products for category: ${category}`);
        }

        const products = await res.json();
        console.log(`${category} products fetched successfully:`, products);
        return products;
    } catch (err) {
        console.error(`Error in fetchProductsByCategory (${category}):`, err.message);
        return [];
    }
};

// Specific functions using the generalized fetcher
export const fetchProducts = async (props: FetchProductsProps) =>
    fetchProductsByCategory('', props?.searchParams);

export const fetchPhoneProducts = async (props: FetchProductsProps) =>
    fetchProductsByCategory('phone', props?.searchParams);

export const fetchLaptopProducts = async (props: FetchProductsProps) =>
    fetchProductsByCategory('laptop', props?.searchParams);

// Fetch product detail
export const fetchProductDetail = async (props: FetchProductDetailProps) => {
    try {
        const { _id } = props;
        const NEXT_DOMAIN_URL = process.env.NEXT_DOMAIN_URL;
        const url = `${NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Calling API:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch product details');
        }

        const product = await res.json();
        console.log('Product details fetched successfully:', product);
        return product;
    } catch (err) {
        console.error('Error in fetchProductDetail:', err.message);
        return null;
    }
};
