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

    useEffect(() => {
        const handleScroll = () => {
            // Lấy vị trí cuộn hiện tại của trang
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Nếu cuộn xuống qua banner (giả sử banner cao 200px), kích hoạt sticky
            if (scrollTop > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Thêm sự kiện lắng nghe cuộn trang
        window.addEventListener('scroll', handleScroll);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="">
            {/* Phần NavAdmin (ẩn trên mobile) */}
            <div className='max-xl:hidden'>
                <NavAdmin />
            </div>

            {/* Phần banner */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Phần Nav (thanh dataplace) */}
            <nav
                className={`padding bg-[#2A83E9] w-full max-xl:bg-transparent ${
                    isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'
                }`}
            >
                <Nav dataPlaces={dataPlaces} />
            </nav>

            {/* Phần MenuBar */}
            <nav
                className={`padding bg-[#2A83E9] w-full max-xl:bg-transparent ${
                    isSticky ? 'fixed top-[60px] left-0 right-0 z-40' : 'relative'
                }`}
            >
                <MenuBar menuBar={menuBar} />
            </nav>

            {/* Thêm padding-top vào phần nội dung chính để tránh bị che khuất */}
            <div className={`${isSticky ? 'pt-[120px]' : ''}`}>
                {/* Phần nội dung chính của trang */}
                {/* Ví dụ: */}
                <div className="p-4">
                    <h1>Nội dung chính của trang</h1>
                    <p>Cuộn trang để xem hiệu ứng cố định.</p>
                </div>
            </div>
        </div>
    );
}

export default Header;
