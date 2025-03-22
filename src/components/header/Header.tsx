'use client';
import { menuBar } from './data.mocks';
import Nav from './Nav';
import MenuBar from './MenuBar';
import banner from './assets/banner.png';
//import NavAdmin from '../auth/NavAdmin';
import { useState } from 'react';
import LoginButton from './LoginButton'; // Import component LoginButton

function Header() {
    const [dataPlaces, setDataPlaces] = useState([]);

    return (
        <div className="">
{/*             <div className='max-xl:hidden'>
                <NavAdmin />
            </div> */}
            <header className="w-full">
                <img src={banner.src} alt="banner" className="w-full" />
            </header>
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent">
                <Nav dataPlaces={dataPlaces} />
            </nav>
            <nav className="padding bg-[#2A83E9] w-full max-xl:bg-transparent">
                <MenuBar menuBar={menuBar} />
            </nav>
        </div>
    );
}

export default Header;
