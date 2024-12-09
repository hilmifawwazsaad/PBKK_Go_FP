'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
    id: number;
    nama: string;
}

interface BookData {
    judul: string;
    category_id: string;
    penulis: string;
    tahun_terbit: string;
    jumlah_halaman: string;
    bahasa_buku: string;
    stok: string;
}

export default function AddBook() {
    const [formData, setFormData] = useState<BookData>({
        judul: '',
        category_id: '',
        penulis: '',
        tahun_terbit: '',
        jumlah_halaman: '',
        bahasa_buku: '',
        stok: ''
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8081/categories/categories");
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError('Failed to load categories');
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        // Convert string values to numbers where needed
        const formattedData = {
            judul: formData.judul,
            category_id: parseInt(formData.category_id),
            penulis: formData.penulis,
            tahun_terbit: parseInt(formData.tahun_terbit),
            jumlah_halaman: parseInt(formData.jumlah_halaman),
            bahasa_buku: formData.bahasa_buku,
            stok: parseInt(formData.stok)
        };
    
        try {
            console.log("Sending formatted data:", formattedData); // Debug log
    
            const response = await fetch("http://localhost:8081/books/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
    
            if (!response.ok) {
                // Get the error message from the response
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add book');
            }
    
            const data = await response.json();
            console.log("Book successfully added:", data);
            router.push('/dashboard/admin/book');
        } catch (error) {
            setError(error.message || 'Failed to add book. Please try again.');
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-semibold mb-6">Add Book</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Book Title:
                    </label>
                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category:
                    </label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author:
                    </label>
                    <input
                        type="text"
                        name="penulis"
                        value={formData.penulis}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Publication:
                    </label>
                    <input
                        type="number"
                        name="tahun_terbit"
                        value={formData.tahun_terbit}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="1800"
                        max={new Date().getFullYear()}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Page Count:
                    </label>
                    <input
                        type="number"
                        name="jumlah_halaman"
                        value={formData.jumlah_halaman}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="1"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Language:
                    </label>
                    <input
                        type="text"
                        name="bahasa_buku"
                        value={formData.bahasa_buku}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock:
                    </label>
                    <input
                        type="number"
                        name="stok"
                        value={formData.stok}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="0"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Adding Book...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
}