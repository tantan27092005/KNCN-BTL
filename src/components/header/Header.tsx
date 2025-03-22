'use client';
import { menuBar } from './data.mocks';
import Nav from './Nav';
import MenuBar from './MenuBar';
import banner from './assets/banner.png';
import NavAdmin from '../auth/NavAdmin';
import { useState, useEffect } from 'react';

function Header() {
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

            {/* Thanh dataplace (sticky khi cuộn qua banner) */}
            <div className="sticky top-0 z-40">
                <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent">
                    <Nav dataPlaces={[]} />
                </nav>
            </div>

            {/* Thanh menubar (sticky khi cuộn qua banner) */}
            <div className="sticky top-12 z-30">
                <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent">
                    <MenuBar menuBar={menuBar} />
                </nav>
            </div>

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
