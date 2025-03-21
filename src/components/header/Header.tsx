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
                <div className="container mx-auto flex justify-between items-center py-4">
                    {/* Logo hoặc tên cửa hàng */}
                    <div className="text-white text-2xl font-bold">
                        Điện máy BÁCH KHOA
                    </div>

                    {/* Các nút hoặc thông tin khác */}
                    <div className="flex space-x-4">
                        <button className="text-white bg-transparent border border-white px-4 py-2 rounded">
                            Đăng nhập
                        </button>
                        <button className="text-white bg-transparent border border-white px-4 py-2 rounded">
                            Giỏ hàng (9)
                        </button>
                    </div>
                </div>
            </div>

            {/* Phần menu - màu vàng */}
            <nav className="padding bg-[#FFE8B9] w-full">
                <Nav dataPlaces={dataPlaces} />
                <MenuBar menuBar={menuBar} />
            </nav>
        </div>
    );
}

export default Header;
