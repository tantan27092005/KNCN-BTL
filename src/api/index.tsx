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

// Helper function to log response details
const logResponseDetails = async (res: Response) => {
    console.error('HTTP Status Code:', res.status);
    console.error('Response Headers:', JSON.stringify([...res.headers]));
    try {
        const responseBody = await res.text();
        console.error('Response Body:', responseBody);
    } catch (err) {
        console.error('Error parsing response body:', err.message);
    }
};

// Fetch all products
export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const { keyword = '' } = props?.searchParams || {};
        const url = `${process.env.NEXT_DOMAIN_URL}/products?keyword=${keyword}`;
        console.log('Fetching Products - API URL:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseDetails(res);
            throw new Error(`Failed to fetch products. HTTP Status: ${res.status}`);
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
        const { category = 'phone', ...searchParams } = props?.searchParams || {};
        const query = new URLSearchParams(searchParams as any).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=${category}&${query}`;
        console.log('Fetching Phone Products - API URL:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseDetails(res);
            throw new Error(`Failed to fetch phone products. HTTP Status: ${res.status}`);
        }

        const phoneProducts = await res.json();
        console.log('Phone products fetched successfully:', phoneProducts);
        return phoneProducts;
    } catch (err) {
        console.error('Error in fetchPhoneProducts:', err.message);
        return [];
    }
};

// Fetch laptop products
export const fetchLaptopProducts = async (props: FetchProductsProps) => {
    try {
        const { category = 'laptop', ...searchParams } = props?.searchParams || {};
        const query = new URLSearchParams(searchParams as any).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=${category}&${query}`;
        console.log('Fetching Laptop Products - API URL:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseDetails(res);
            throw new Error(`Failed to fetch laptop products. HTTP Status: ${res.status}`);
        }

        const laptopProducts = await res.json();
        console.log('Laptop products fetched successfully:', laptopProducts);
        return laptopProducts;
    } catch (err) {
        console.error('Error in fetchLaptopProducts:', err.message);
        return [];
    }
};

// Fetch product details
export const fetchProductDetail = async ({ _id }: FetchProductDetailProps) => {
    try {
        const url = `${process.env.NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Fetching Product Detail - API URL:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
            await logResponseDetails(res);
            throw new Error(`Failed to fetch product detail. HTTP Status: ${res.status}`);
        }

        const productDetail = await res.json();
        console.log('Product detail fetched successfully:', productDetail);
        return productDetail;
    } catch (err) {
        console.error('Error in fetchProductDetail:', err.message);
        return null;
    }
};
