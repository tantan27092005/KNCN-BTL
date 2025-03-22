'use client';
import { menuBar } from './data.mocks';
import Nav from './Nav';
import MenuBar from './MenuBar';
import banner from './assets/banner.png';
import NavAdmin from '../auth/NavAdmin';
import { useState, useEffect } from 'react';

function Header() {
    const [dataPlaces, setDataPlaces] = useState([]);
    const [isSticky, setIsSticky] = useState(false);

    // Theo dõi sự kiện cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            const bannerHeight = document.querySelector('header').offsetHeight; // Lấy chiều cao của banner
            if (window.scrollY > bannerHeight) {
                setIsSticky(true); // Khi cuộn qua banner, đặt isSticky thành true
            } else {
                setIsSticky(false); // Khi cuộn lên trên banner, đặt isSticky thành false
            }
        };

        window.addEventListener('scroll', handleScroll); // Thêm sự kiện lắng nghe cuộn trang
        return () => {
            window.removeEventListener('scroll', handleScroll); // Dọn dẹp sự kiện khi component unmount
        };
    }, []);

    return (
        <div className="">
            {/* NavAdmin (cố định luôn ở trên cùng) */}
            <div className='max-xl:hidden fixed top-0 left-0 w-full z-50'>
                <NavAdmin />
            </div>

            {/* Header với banner */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Thanh dataplace (cố định khi cuộn qua banner) */}
            <nav className={`w-full bg-[#2A83E9] max-xl:bg-transparent transition-all duration-300 ${isSticky ? 'fixed top-0 z-40 shadow-md' : ''}`}>
                <Nav dataPlaces={dataPlaces} />
            </nav>

            {/* Thanh menubar (cố định khi cuộn qua banner) */}
            <nav className={`w-full bg-[#2A83E9] max-xl:bg-transparent transition-all duration-300 ${isSticky ? 'fixed top-12 z-30 shadow-md' : ''}`}>
                <MenuBar menuBar={menuBar} />
            </nav>

            {/* Phần nội dung chính của trang */}
            <main className="pt-4">
                {/* Nội dung chính của trang */}
                <div className="h-screen bg-gray-100 p-4">
                    Cuộn xuống để xem hiệu ứng cố định thanh menu và dataplace.
                </div>
            </main>
        </div>
    );
}

export default Header;
