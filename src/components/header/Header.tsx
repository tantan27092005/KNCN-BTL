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
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent sticky top-0 z-50">
                <Nav dataPlaces={dataPlaces} />
            </nav>

            {/* Phần MenuBar cố định khi cuộn trang */}
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent sticky top-[60px] z-40">
                <MenuBar menuBar={menuBar} />
            </nav>
        </div>
    );
}

export default Header;
