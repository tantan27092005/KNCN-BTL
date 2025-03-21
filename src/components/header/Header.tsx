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
            <div className="max-xl:hidden">
                <NavAdmin />
            </div>

            {/* Phần banner */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Phần Nav cố định ở đầu trang */}
            <div className="fixed top-0 left-0 z-50 bg-[#2A83E9] w-full">
                <nav className="padding w-full">
                    <Nav dataPlaces={dataPlaces} />
                </nav>
            </div>

            {/* Phần MenuBar cố định ngay dưới Nav */}
            <div className="fixed top-[60px] left-0 z-40 bg-[#2A83E9] w-full">
                <nav className="padding w-full">
                    <MenuBar menuBar={menuBar} />
                </nav>
            </div>

            {/* Nội dung khác của trang */}
            <div className="pt-[120px]">
                <p>Đây là nội dung của trang nằm dưới Nav và MenuBar.</p>
                <p>Cuộn trang để kiểm tra hành vi cố định.</p>
            </div>
        </div>
    );
}

export default Header;
