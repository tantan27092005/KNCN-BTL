import { bannerContent, images } from '../data-mock';
import BannerContent from './BannerContent';
//import BannerSlider from '@/components/BannerSlider';
import banner_footer from '../assets/banner-footer.png';
import banner_big from '../assets/banner-big.png';

function Banner() {
    return (
        <div className="">
            {/* Phần banner-big */}
            <div className="relative flex-1 flex justify-center items-center">
                <img src={banner_big.src} alt="banner" className="object-contain w-full" />
            </div>

            {/* Phần banner content */}
            <div className="mt-10 gap-3 grid grid-cols-4 max-xl:grid max-lg:grid-cols-2 max-lg:mt-6"> {/* Giảm margin-top */}
                {bannerContent.map((value) => (
                    <BannerContent image={value.image} title={value.title} key={value.title} />
                ))}
            </div>

            {/* Phần banner footer */}
            <div className="w-full">
                <img src={banner_footer.src} alt="banner" className="w-full my-6 max-lg:my-4 rounded-md" /> {/* Giảm margin */}
            </div>
        </div>
    );
}

export default Banner;
