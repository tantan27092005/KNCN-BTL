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
    try {
        const products = await fetchPhoneProducts({ searchParams });
        return (
            <div>
                {products && products.length > 0 ? (
                    <ProductsPage products={products} filterData={filterDataMobile} />
                ) : (
                    <div>Không có sản phẩm nào được tìm thấy.</div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching phone products:', error.message);
        return <div>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</div>;
    }
};

export default PhonePage;
