export const dynamic = 'force-dynamic';
import { fetchLaptopProducts } from '@/api';
import ProductsPage from '@/components/products-page';
import { filterDataLaptop } from '@/components/products-page/products-data.mocks';

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

interface LaptopPageProps {
    searchParams?: SearchParams;
}

const LaptopPage = async ({ searchParams }: LaptopPageProps) => {
    try {
        const products = await fetchLaptopProducts({ searchParams });
        return (
            <div>
                {products && products.length > 0 ? (
                    <ProductsPage products={products} filterData={filterDataLaptop} />
                ) : (
                    <div>Không có sản phẩm nào được tìm thấy.</div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error loading laptop products:', error);
        return <div>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</div>;
    }
};

export default LaptopPage;
