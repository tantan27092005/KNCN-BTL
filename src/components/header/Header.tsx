'use client'
import { menuBar } from './data.mocks';
import Nav from './Nav';
import MenuBar from './MenuBar';
import banner from './assets/banner.png'
import NavAdmin from '../auth/NavAdmin';
import { useState } from 'react';


function Header() {
    const [dataPlaces, setDataPlaces] = useState([])
    return (
        
        <div className="">
            <div className='max-xl:hidden'>
           <NavAdmin/>
            </div>
            <header className="w-full ">
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
        </div>
    );
}

export default Header;
