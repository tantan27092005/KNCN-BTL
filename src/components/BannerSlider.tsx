'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSlider = ({ images, visibleNumber }) => {
    return (
        <div className="w-full h-[180px] overflow-hidden"> {/* Đặt kích thước cố định cho container */}
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={visibleNumber}
                navigation
                pagination={{ clickable: true }}
                style={{ width: '100%', height: '100%' }} // Đặt kích thước cố định cho Swiper
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image.src}
                            alt="image"
                            className="rounded-md w-full h-full object-cover" // Đảm bảo hình ảnh phủ đầy slide
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
