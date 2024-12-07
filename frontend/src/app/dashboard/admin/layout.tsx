'use client';

import React, { useState } from 'react';
import { FaBook, FaHome, FaUser, FaList, FaExchangeAlt, FaChevronLeft, FaChevronRight, FaDoorOpen } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        router.push('/');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: FaHome, route: '/dashboard/admin' },
        { id: 'user', label: 'User', icon: FaUser, route: '/dashboard/admin/user' },
        { id: 'book', label: 'Book', icon: FaBook, route: '/dashboard/admin/book' },
        { id: 'book-category', label: 'Book Category', icon: FaList, route: '/dashboard/admin/book-category' },
        { id: 'transaction', label: 'Transaction', icon: FaExchangeAlt, route: '/dashboard/admin/transaction' },
    ];

    return (
        <div className="flex min-h-screen font-sans bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-white shadow-md p-6 transition-all duration-300 ease-in-out relative`}>
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-9 bg-white rounded-full p-1 shadow-md"
                >
                    {isSidebarOpen ? <FaChevronLeft size={20} /> : <FaChevronRight size={20} />}
                </button>

                <div className="text-center mb-6">
                    <div className={`flex justify-center ${isSidebarOpen ? 'mb-2' : ''}`}>
                        <img
                            src="https://via.placeholder.com/100"
                            alt="Profile"
                            className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${isSidebarOpen ? 'w-16 h-16' : 'w-12 h-12'}`}
                        />
                    </div>
                    {isSidebarOpen && (
                        <p className="text-sm text-gray-500 mt-2">
                            Selamat Datang, <br /> ADMIN
                        </p>
                    )}
                </div>

                <nav className="space-y-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => router.push(item.route)}
                                className={`flex items-center w-full text-left px-3 py-3 rounded-lg transition-colors duration-150 ease-in-out ${pathname === item.route ? 'bg-[#FF5A5F] text-white font-medium' : 'text-gray-600 hover:bg-[#FF5A5F] hover:text-white'}`}
                            >
                                <Icon className={`${isSidebarOpen ? 'mr-3' : 'mr-0'}`} size={20} />
                                {isSidebarOpen && <span>{item.label}</span>}
                            </button>
                        );
                    })}

                    {/* Logout Button */}
                    <div className="mt-auto">
                        <button
                            onClick={() => setLogoutModalOpen(true)}
                            className="flex items-center w-full text-left px-3 py-3 rounded-lg text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white transition-colors duration-150 ease-in-out"
                        >
                            <FaDoorOpen className={`${isSidebarOpen ? 'mr-3' : 'mr-0'}`} size={20} />
                            {isSidebarOpen && <span>Logout</span>}
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {children}
            </main>

            {/* Logout Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Konfirmasi Logout</h2>
                        <p className="mb-6">Apakah Anda yakin ingin keluar?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
