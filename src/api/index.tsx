'use server';

interface SearchParams {
    keyword?: string;
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
}

interface FetchProductsProps {
    searchParams?: SearchParams;
}

interface FetchProductDetailProps {
    _id: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fetch danh sách sản phẩm
 */
export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const {
            keyword = '',
            brand = '',
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
            `${API_BASE_URL}/products?keyword=${keyword}&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&page=${page}&limit=${limit}`, 
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

/**
 * Fetch danh sách điện thoại
 */
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
            `${API_BASE_URL}/products?category=phone&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`, 
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch phone products');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching phone products:', error);
        return [];
    }
};

/**
 * Fetch danh sách laptop
 */
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
            `${API_BASE_URL}/products?category=laptop&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch laptop products');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching laptop products:', error);
        return [];
    }
};

/**
 * Fetch chi tiết sản phẩm
 */
export const fetchProductDetail = async ({ _id }: FetchProductDetailProps) => {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${_id}`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch product detail');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        return null;
    }
};
