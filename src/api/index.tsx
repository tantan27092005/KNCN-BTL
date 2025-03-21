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

export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const { keyword = '' } = props?.searchParams || {};
        const res = await fetch(
            `${process.env.NEXT_DOMAIN_URL}/products?keyword=${keyword}`, 
            {
                next: { revalidate: 60 },
            }
        );
        if (!res.ok) {
            console.error('API Response Status:', res.status);
            throw new Error('Failed to fetch products');
        }
        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
};

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

        const res = await fetch(
            `${process.env.NEXT_DOMAIN_URL}/products?category=phone&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`, 
            {
                next: { revalidate: 60 },
            }
        );
        if (!res.ok) {
            console.error('API Response Status:', res.status);
            throw new Error('Failed to fetch phone products');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching phone products:', error.message);
        return [];
    }
};

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

        const res = await fetch(
            `${process.env.NEXT_DOMAIN_URL}/products?category=laptop&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`, 
            {
                next: { revalidate: 60 },
            }
        );
        if (!res.ok) {
            console.error('API Response Status:', res.status);
            throw new Error('Failed to fetch laptop products');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching laptop products:', error.message);
        return [];
    }
};

export const fetchProductDetail = async (_id: FetchProductDetailProps) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_DOMAIN_URL}/products/${_id}`, 
            {
                next: { revalidate: 60 },
            }
        );
        if (!res.ok) {
            console.error('API Response Status:', res.status);
            throw new Error('Failed to fetch product details');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching product details:', error.message);
        return null;
    }
};
