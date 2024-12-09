'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryBook() {
    const [nama, setNama] = useState(""); // State untuk menyimpan nama kategori
    const router = useRouter();

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory = {
            nama,
        };

        fetch("http://localhost:8081/categories/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Gagal menambahkan kategori buku");
                }
            })
            .then((data) => {
                console.log("Kategori buku berhasil ditambahkan:", data);
                router.push('/dashboard/admin/book-category');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Tambah Kategori Buku</h2>
            <form onSubmit={handleAdd} className="space-y-4 mt-6">
                <div>
                    <label className="block">Nama Kategori:</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)} // Mengupdate state nama
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tambah Kategori Buku
                </button>
            </form>
        </div>
    );
}
