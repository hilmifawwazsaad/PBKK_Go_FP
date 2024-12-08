'use client';

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type CategoryType = {
    id: number;
    nama: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
};

export default function BookCategory() {
    const [categories, setCategories] = useState<CategoryType[]>([]); // Perubahan nama state menjadi categories
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8081/categories/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data)) // Menggunakan setCategories, bukan setCategory
            .catch((error) => console.error("Error fetching book categories:", error));
    }, []);

    const handleAdd = () => {
        window.location.href = "/dashboard/admin/book-category/add-category-book";
    };

    const handleEdit = (id: number) => {
        router.push(`/dashboard/admin/book-category/edit-category-book?id=${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8081/categories/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setCategories(categories.filter((category) => category.id !== id)); // Menggunakan categories bukan Category
            } else {
                console.error("Error deleting book category:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting book category:", error);
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Halaman Kategori</h2>
            <p>Halaman untuk melihat kategori buku, menambah, mengedit, dan menghapus kategori buku.</p>
            <button
                className="mt-4 mb-4 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAdd}
            >
                Tambah Kategori
            </button>

            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-[#FF5A5F] text-[#F7F7F7]">
                        <th className="border border-gray-200 px-4 py-2">No</th>
                        <th className="border border-gray-200 px-4 py-2">Nama Kategori</th>
                        <th className="border border-gray-200 px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? ( // Memperbaiki pengecekan categories
                        <tr>
                            <td colSpan={3} className="text-center py-4">
                                Tidak ada data kategori
                            </td>
                        </tr>
                    ) : (
                        categories.map((category, index) => ( // Menggunakan categories
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{category.nama}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center space-x-4">
                                    <button
                                        className="text-yellow-500 hover:text-yellow-600"
                                        onClick={() => handleEdit(category.id)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
