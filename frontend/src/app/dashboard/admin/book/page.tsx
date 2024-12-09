'use client';

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type BookType = {
    id: number;
    category_id: number;
    judul: string;
    penulis: string;
    tahun_terbit: string;
    jumlah_halaman: string;
    bahasa_buku: string;
    stok: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
};

type CategoryType = {
    id: number;
    nama: string;
};

export default function Book() {
    const [books, setBooks] = useState<BookType[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:8081/books/books");
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
            setError(null);
        } catch (error) {
            console.error("Error fetching books:", error);
            setError("Failed to load books. Please try again later.");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:8081/categories/categories");
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Failed to load categories. Please try again later.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchBooks(), fetchCategories()]);
            setLoading(false);
        };
        
        fetchData();
    }, []);

    const handleAdd = () => {
        router.push("/dashboard/admin/book/add-book");  // Using router instead of window.location
    };

    const handleEdit = (id: number) => {
        router.push(`/dashboard/admin/book/edit-book?id=${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
            try {
                const response = await fetch(`http://localhost:8081/books/delete/${id}`, {
                    method: "DELETE",
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to delete book');
                }
                
                setBooks(books.filter((book) => book.id !== id));
                alert("Buku berhasil dihapus");
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Terjadi kesalahan saat menghapus buku");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-5">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                    <button
                        onClick={() => {
                            setError(null);
                            fetchBooks();
                            fetchCategories();
                        }}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Halaman Buku</h2>
            <p>Halaman untuk melihat buku, menambah, mengedit, dan menghapus buku.</p>
            <button
                className="mt-4 mb-4 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAdd}
            >
                Tambah Buku
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-[#FF5A5F] text-[#F7F7F7]">
                            <th className="border border-gray-200 px-4 py-3 font-medium">No</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Judul</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Kategori</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Penulis</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Tahun Terbit</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Jumlah Halaman</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Bahasa</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Stok</th>
                            <th className="border border-gray-200 px-4 py-3 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-4">
                                    Tidak ada data buku
                                </td>
                            </tr>
                        ) : (
                            books.map((book, index) => (
                                <tr key={book.id}>
                                    <td className="border border-gray-200 px-4 py-3">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-3">{book.judul}</td>
                                    <td className="border border-gray-200 px-4 py-3">
                                        {categories.find((category) => category.id === book.category_id)?.nama || 'Unknown'}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-3">{book.penulis}</td>
                                    <td className="border border-gray-200 px-4 py-3">{book.tahun_terbit}</td>
                                    <td className="border border-gray-200 px-4 py-3">{book.jumlah_halaman}</td>
                                    <td className="border border-gray-200 px-4 py-3">{book.bahasa_buku}</td>
                                    <td className="border border-gray-200 px-4 py-3">{book.stok}</td>
                                    <td className="border border-gray-200 px-4 py-3 flex gap-2">
                                        <FaEdit
                                            className="text-blue-500 cursor-pointer hover:text-blue-700"
                                            onClick={() => handleEdit(book.id)}
                                        />
                                        <FaTrash
                                            className="text-red-500 cursor-pointer hover:text-red-700"
                                            onClick={() => handleDelete(book.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}