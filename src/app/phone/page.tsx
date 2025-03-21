export const dynamic = 'force-dynamic';
import { fetchPhoneProducts } from '@/api';
import ProductsPage from '@/components/products-page';
import { filterDataMobile } from '@/components/products-page/products-data.mocks';

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

interface PhonePageProps {
    searchParams?: SearchParams;
}

const PhonePage = async ({ searchParams }: PhonePageProps) => {
    const products = await fetchPhoneProducts({ searchParams });
    return (
        <div>
            <ProductsPage products={products} filterData={filterDataMobile} />
        </div>
    );
};

export default PhonePage;
