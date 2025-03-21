'use server';

interface ProductImage {
    thumbnail: string;
    bigProduct: string;
    title: string;
    _id: string;
}

interface Product {
    _id: string;
    ram: number;
    battery: number;
    camera: number;
    charger: number;
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
    title: string;
    brand: string;
    category: string;
    type: string;
    __v: number;
}

interface SearchParams {
    category?: string;
    brand?: string;
    ram?: number;
    battery?: number;
    camera?: number;
    charger?: number;
    storage?: number;
    type?: string;
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

// Helper: Clean up search parameters
const cleanParams = (params: any) => {
    return Object.entries(params || {})
        .filter(([_, value]) => value !== undefined && value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

// Fetch all products
export const fetchProducts = async (props: FetchProductsProps): Promise<Product[]> => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?${queryParams}`;
        console.log('Fetching products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error in fetchProducts:', error.message);
        return [];
    }
};

// Fetch phone products
export const fetchPhoneProducts = async (props: FetchProductsProps): Promise<Product[]> => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=phone&${queryParams}`;
        console.log('Fetching phone products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            throw new Error('Failed to fetch phone products');
        }
        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error in fetchPhoneProducts:', error.message);
        return [];
    }
};

// Fetch laptop products
export const fetchLaptopProducts = async (props: FetchProductsProps): Promise<Product[]> => {
    try {
        const queryParams = new URLSearchParams(cleanParams(props?.searchParams)).toString();
        const url = `${process.env.NEXT_DOMAIN_URL}/products?category=laptop&${queryParams}`;
        console.log('Fetching laptop products:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            throw new Error('Failed to fetch laptop products');
        }
        const products = await res.json();
        return products;
    } catch (error) {
        console.error('Error in fetchLaptopProducts:', error.message);
        return [];
    }
};

// Fetch product detail
export const fetchProductDetail = async (props: FetchProductDetailProps): Promise<Product | null> => {
    try {
        const { _id } = props;
        const url = `${process.env.NEXT_DOMAIN_URL}/products/${_id}`;
        console.log('Fetching product detail:', url);

        const res = await fetch(url, { next: { revalidate: 60 } });
        if (!res.ok) {
            throw new Error('Failed to fetch product detail');
        }
        const product = await res.json();
        return product;
    } catch (error) {
        console.error('Error in fetchProductDetail:', error.message);
        return null;
    }
};
