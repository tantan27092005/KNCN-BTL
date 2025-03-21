import { bannerContent, images } from '../data-mock';
import BannerContent from './BannerContent';
import BannerSlider from '@/components/BannerSlider';
import banner_footer from '../assets/banner-footer.png';
import banner_big from '../assets/banner-big.png';

function Banner() {
    return (
        <div className="">
            {/* Phần banner-big và slider */}
            <div className="relative flex-1 flex justify-center items-center">
                {/* Banner-big với z-index cao hơn */}
                <img src={banner_big.src} alt="banner" className="object-contain w-full z-10" />

                {/* Slider với z-index thấp hơn và đặt ở phía dưới banner-big */}
                <div className="w-[80%] absolute bottom-0 left-1/2 transform -translate-x-1/2 z-40">
                    <BannerSlider images={images} visibleNumber={2} />
                </div>
            </div>

            {/* Phần banner content */}
            <div className="mt-28 gap-3 grid grid-cols-4 max-xl:grid max-lg:grid-cols-2 max-lg:mt-10">
                {bannerContent.map((value) => (
                    <BannerContent image={value.image} title={value.title} key={value.title} />
                ))}
            </div>

            {/* Phần banner footer */}
            <div className="w-full">
                <img src={banner_footer.src} alt="banner" className="w-full my-10 max-lg:my-6 rounded-md" />
            </div>
        </div>
    );
}

export default Banner;
