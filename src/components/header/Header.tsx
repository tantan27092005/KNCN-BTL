'use client';
import { menuBar } from './data.mocks';
import Nav from './Nav';
import MenuBar from './MenuBar';
import banner from './assets/banner.png';
import NavAdmin from '../auth/NavAdmin';
import { useState } from 'react';

function Header() {
    const [dataPlaces, setDataPlaces] = useState([]);

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

            {/* Phần Nav cố định khi cuộn trang */}
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent fixed top-0 left-0 right-0 z-50">
                <Nav dataPlaces={dataPlaces} />
            </nav>

            {/* Phần MenuBar cố định khi cuộn trang */}
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent fixed top-[60px] left-0 right-0 z-40">
                <MenuBar menuBar={menuBar} />
            </nav>

            {/* Thêm padding-top vào phần nội dung chính để tránh bị che khuất */}
            <div className="pt-[120px]"> {/* Giả sử tổng chiều cao của Nav và MenuBar là 120px */}
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
