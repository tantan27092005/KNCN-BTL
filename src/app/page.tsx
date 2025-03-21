import Banner from '@/components/home-sections/Banner/Banner';
import CateFuture from '@/components/home-sections/CateFuture/CateFuture';
import Promo from '@/components/home-sections/Promo';
import FlashSaleDeals from '@/components/home-sections/Deals/FlashSaleDeals';
import PromotionDeals from '@/components/home-sections/Deals/PromotionDeals';
import { fetchLaptopProducts, fetchPhoneProducts } from '@/api';

export default async function Home() {
    let dataFlashSaleRandom: any[] = [];
    let dataLaptopRandom: any[] = [];

    try {
        // Fetch phone products (Flash Sale)
        dataFlashSaleRandom = await fetchPhoneProducts({ searchParams: { limit: 10 } }) || [];
        console.log('Fetched phone products for Flash Sale:', dataFlashSaleRandom);
    } catch (error) {
        console.error('Error fetching Flash Sale products:', error.message);
    }

    try {
        // Fetch laptop products (Promotions)
        dataLaptopRandom = await fetchLaptopProducts({ searchParams: { limit: 10 } }) || [];
        console.log('Fetched laptop products for Promotions:', dataLaptopRandom);
    } catch (error) {
        console.error('Error fetching Laptop products:', error.message);
    }

    return (
        <main className="bg-[#f3efef] space-y-[30px]">
            <section className="padding max-lg:hidden">
                <Banner />
            </section>
            <section className="padding">
                <FlashSaleDeals dataFlashSaleRandom={dataFlashSaleRandom} />
            </section>
            <section className="padding">
                <PromotionDeals dataLaptopRandom={dataLaptopRandom} />
            </section>
            <section className="padding max-lg:hidden">
                <CateFuture />
            </section>
            <section className="padding">
                <Promo />
            </section>
        </main>
    );
}
