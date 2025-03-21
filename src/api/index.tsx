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

// Helper function to log detailed errors
const logErrorDetails = async (res: Response) => {
    console.error('API Response Status:', res.status);
    console.error('API Response Headers:', JSON.stringify([...res.headers]));
    try {
        const bodyText = await res.text();
        console.error('API Response Body:', bodyText);
    } catch (error) {
        console.error('Error parsing response body:', error.message);
    }
};

// Fetch all products
export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const { keyword = '' } = props?.searchParams || {};
        const url = `${process.env.NEXT_DOMAIN_URL}/products?keyword=${keyword}`;
        console.log('Calling API:', url);

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            await logErrorDetails(res);
            throw new Error('Failed to fetch products');
        }

        const products = await res.json();
        console.log('Products fetched successfully:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
};

// Fetch phone products
export const fetchPhoneProducts = async (props: FetchProductsProps) => {
    try {
        const {
            brand = '',
            pricerange = '',
            ram = '',
            type = '',
            screen = '',
            storage = '',
            charger = '',
            price = '',
            page = 1,
            limit = 10,
        } = props?.searchParams || {};

        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=phone&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`;
        console.log('Calling API:', url);

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            await logErrorDetails(res);
            throw new Error('Failed to fetch phone products');
        }

        const products = await res.json();
        console.log('Phone products fetched successfully:', products);
        return products;
    } catch (error) {
        console.error('Error fetching phone products:', error.message);
        return [];
    }
};

// Fetch laptop products
export const fetchLaptopProducts = async (props: FetchProductsProps) => {
    try {
        const {
            brand = '',
            pricerange = '',
            ram = '',
            type = '',
            screen = '',
            storage = '',
            charger = '',
            price = '',
            page = 1,
            limit = 10,
        } = props?.searchParams || {};

        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=laptop&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`;
        console.log('Calling API:', url);

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            await logErrorDetails(res);
            throw new Error('Failed to fetch laptop products');
        }

        const products = await res.json();
        console.log('Laptop products fetched successfully:', products);
        return products;
    } catch (error) {
        console.error('Error fetching laptop products:', error.message);
        return [];
    }
};

// Fetch product details
export const fetchProductDetail = async (props: FetchProductDetailProps) => {
    try {
        const { _id } = props;
        const url = `${process.env.NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Calling API:', url);

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            await logErrorDetails(res);
            throw new Error('Failed to fetch product details');
        }

        const product = await res.json();
        console.log('Product details fetched successfully:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        return null;
    }
};
