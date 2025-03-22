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
            {/* Cố định NavAdmin ở phía trên cùng */}
            <div className='max-xl:hidden fixed top-0 left-0 w-full z-50'>
                <NavAdmin />
            </div>

            {/* Header với banner */}
            <header className="w-full pt-16"> {/* Thêm padding-top để tránh bị che bởi NavAdmin */}
                <img src={banner.src} alt="banner" className="w-full" />
            </header>

            {/* Cố định thanh địa điểm (data place) ở phía trên cùng */}
            <nav className="fixed top-16 left-0 w-full bg-[#2A83E9] z-40 max-xl:bg-transparent">
                <Nav dataPlaces={dataPlaces} />
            </nav>

            {/* Cố định thanh menu (menu bar) ở phía trên cùng */}
            <nav className="fixed top-28 left-0 w-full bg-[#2A83E9] z-30 max-xl:bg-transparent">
                <MenuBar menuBar={menuBar} />
            </nav>

            {/* Phần nội dung chính của trang */}
            <main className="pt-48"> {/* Thêm padding-top để tránh bị che bởi các thanh cố định */}
                {/* Nội dung chính của trang */}
            </main>
        </div>
    );
}

export default Header;
