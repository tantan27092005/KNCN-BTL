"use server";

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

const API_URL = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const fetchProducts = async (props: FetchProductsProps) => {
    try {
        const { keyword = "" } = props?.searchParams || {};
        console.log("Fetching products with keyword:", keyword);
        const res = await fetch(`${API_URL}/products?keyword=${keyword}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchPhoneProducts = async (props: FetchProductsProps) => {
    try {
        const { brand = "", pricerange = "", ram = "", type = "", screen = "", storage = "", charger = "", price = "", page = 1, limit = 10 } = props?.searchParams || {};
        console.log("Fetching phone products with:", props.searchParams);
        const res = await fetch(`${API_URL}/products?category=phone&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch phone products");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching phone products:", error);
        return [];
    }
};

export const fetchLaptopProducts = async (props: FetchProductsProps) => {
    try {
        const { brand = "", pricerange = "", ram = "", type = "", screen = "", storage = "", charger = "", price = "", page = 1, limit = 10 } = props?.searchParams || {};
        console.log("Fetching laptop products with:", props.searchParams);
        const res = await fetch(`${API_URL}/products?category=laptop&brand=${brand}&ram=${ram}&type=${type}&screen=${screen}&storage=${storage}&charger=${charger}&price=${price}&pricerange=${pricerange}&page=${page}&limit=${limit}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch laptop products");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching laptop products:", error);
        return [];
    }
};

export const fetchProductDetail = async ({ _id }: FetchProductDetailProps) => {
    try {
        console.log("Fetching product detail for ID:", _id);
        const res = await fetch(`${API_URL}/products/${_id}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
};
