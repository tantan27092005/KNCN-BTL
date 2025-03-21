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
        dataFlashSaleRandom = await fetchPhoneProducts({ searchParams: { limit: 10 } });
        console.log('Fetched Flash Sale products:', dataFlashSaleRandom);
    } catch (error) {
        console.error('Error fetching Flash Sale data:', error.message);
    }

    try {
        dataLaptopRandom = await fetchLaptopProducts({ searchParams: { limit: 10 } });
        console.log('Fetched Laptop Promotion products:', dataLaptopRandom);
    } catch (error) {
        console.error('Error fetching Laptop Promotion data:', error.message);
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
