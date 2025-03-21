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
        <div>
            {/* Phần NavAdmin (ẩn trên mobile) */}
            <div className="max-xl:hidden">
                <NavAdmin />
            </div>

            {/* Phần banner */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Phần Nav cố định ở đầu trang */}
            <div className="fixed top-0 left-0 w-full bg-[#2A83E9] z-50">
                <Nav dataPlaces={dataPlaces} />
            </div>

            {/* Phần MenuBar cố định ngay dưới Nav */}
            <div className="fixed top-[60px] left-0 w-full bg-[#2A83E9] z-40">
                <MenuBar menuBar={menuBar} />
            </div>

            {/* Nội dung khác của trang */}
            <main className="pt-[120px]">
                <p>Đây là nội dung của trang nằm dưới Nav và MenuBar.</p>
                <p>Cuộn trang để kiểm tra hành vi cố định.</p>
            </main>
        </div>
    );
}

export default Header;
