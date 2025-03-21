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
    console.error('HTTP Status Code:', res.status);
    console.error('Response Headers:', JSON.stringify([...res.headers]));
    try {
        const responseBody = await res.text();
        console.error('Response Body:', responseBody);
    } catch (err) {
        console.error('Failed to read response body:', err.message);
    }
};

// Fetch all products
export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const { keyword = '' } = props?.searchParams || {};
        const url = `${process.env.NEXT_DOMAIN_URL}/products?keyword=${keyword}`;
        console.log('Calling API:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch products');
        }

        const products = await res.json();
        console.log('Products fetched successfully:', products);
        return products;
    } catch (err) {
        console.error('Error in fetchProducts:', err.message);
        return [];
    }
};

// Fetch phone products
export const fetchPhoneProducts = async (props: FetchProductsProps) => {
    try {
        const queryParams = new URLSearchParams(props?.searchParams as any).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=phone&${queryParams}`;
        console.log('Calling API:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch phone products');
        }

        const products = await res.json();
        console.log('Phone products fetched successfully:', products);
        return products;
    } catch (err) {
        console.error('Error in fetchPhoneProducts:', err.message);
        return [];
    }
};

// Fetch laptop products
export const fetchLaptopProducts = async (props: FetchProductsProps) => {
    try {
        const queryParams = new URLSearchParams(props?.searchParams as any).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=laptop&${queryParams}`;
        console.log('Calling API:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseError(res);
            throw new Error('Failed to fetch laptop products');
        }

        const products = await res.json();
        console.log('Laptop products fetched successfully:', products);
        return products;
    } catch (err) {
        console.error('Error in fetchLaptopProducts:', err.message);
        return [];
    }
};

// Fetch product detail
export const fetchProductDetail = async (props: FetchProductDetailProps) => {
    try {
        const { _id } = props;
        const url = `${process.env.NEXT_DOMAIN_URL}/products/${_id}`;
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
