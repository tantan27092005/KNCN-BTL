'use client'
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

            {/* Phần Banner (toàn bộ chiều rộng) */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Phần giữa (chứa logo) - màu xanh dương */}
            <div className="w-full padding bg-[#2A83E9]">
                {/* Giữ nguyên nội dung hiện có */}
                <Nav dataPlaces={dataPlaces} />
            </div>

            {/* Phần menu - màu vàng */}
            <nav className="padding bg-[#FFE8B9] w-full">
                <MenuBar menuBar={menuBar} />
            </nav>
        </div>
    );
}

export default Header;
