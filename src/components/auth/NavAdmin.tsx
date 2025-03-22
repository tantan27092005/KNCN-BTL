'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { menuBarAdmin } from './data-menu.mocks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../counter/nameUserSlice';

interface INameUser {
    name?: string;
}

const NavAdmin = () => {
    const [menuBarVisible, setMenuBarVisible] = useState(false);
    const nameUser = useSelector((state) => state.nameUser.value);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className="relative flex justify-end items-center h-10 px-4">
            <div className="flex items-center space-x-4">
                {/* Nút user icon */}
                <button onClick={() => setMenuBarVisible(!menuBarVisible)}>
                    <FontAwesomeIcon icon={faUser} className="h-5 text-gray-300" />
                </button>

                {/* Dropdown menu */}
                {menuBarVisible && (
                    <ul className="absolute left-0 w-[95%] bg-slate-50 p-4 rounded-lg shadow-lg top-[100px] text-sm text-gray-700 dark:text-gray-400">
                        {menuBarAdmin.map((menu) => (
                            <li
                                key={menu.id}
                                className="block px-4 py-2 hover:bg-gray-100 hover:italic dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <Link href={menu.link} className="flex space-x-3">
                                    <p>{menu.title}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Phần đăng nhập/đăng xuất */}
                <nav className="flex flex-col items-end">
                    {nameUser !== '' ? (
                        <>
                            <p className="text-white">Xin chào {nameUser.name}</p>
                            <button
                                onClick={handleLogout}
                                className="text-white text-sm bg-transparent border-none focus:outline-none hover:text-gray-300"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <Link href={'/auth'} className="text-white text-sm">
                            <button className="text-white bg-transparent border-none focus:outline-none hover:text-gray-300">
                                Đăng nhập
                            </button>
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default NavAdmin;
