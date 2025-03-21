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

        const url = `https://tgdd-nodejs-thu.vercel.app/products?keyword=${keyword}`;
        console.log('Fetching URL:', url); // Log URL để kiểm tra

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const errorResponse = await res.text(); // Hoặc res.json()
            console.error('Backend response error:', errorResponse);
            throw new Error('Failed to fetch products');
        }

        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error in fetchProducts:', error); // Log lỗi chi tiết
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

        const url = `https://tgdd-nodejs-thu.vercel.app/products?category=phone&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`;
        console.log('Fetching URL:', url); // Log URL để kiểm tra

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const errorResponse = await res.text(); // Hoặc res.json()
            console.error('Backend response error:', errorResponse);
            throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in fetchPhoneProducts:', error); // Log lỗi chi tiết
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

        const url = `https://tgdd-nodejs-thu.vercel.app/products?category=laptop&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`;
        console.log('Fetching URL:', url); // Log URL để kiểm tra

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const errorResponse = await res.text(); // Hoặc res.json()
            console.error('Backend response error:', errorResponse);
            throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in fetchLaptopProducts:', error); // Log lỗi chi tiết
        return [];
    }
};

export const fetchProductDetail = async (_id: FetchProductDetailProps) => {
    try {
        const url = `https://tgdd-nodejs-thu.vercel.app/products/${_id}`;
        console.log('Fetching URL:', url); // Log URL để kiểm tra

        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            const errorResponse = await res.text(); // Hoặc res.json()
            console.error('Backend response error:', errorResponse);
            throw new Error('Failed to fetch product');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error in fetchProductDetail:', error); // Log lỗi chi tiết
        return null;
    }
};
