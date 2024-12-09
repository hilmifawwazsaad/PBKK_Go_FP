'use client'

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditCategory() {
    const [nama, setNama] = useState(""); // State untuk menyimpan nama kategori
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("id");

    useEffect(() => {
        if (categoryId) {
            fetch(`http://localhost:8081/categories/category/${categoryId}`)
                .then((response) => response.json())
                .then((data) => {
                    setNama(data.nama); // Set nama kategori
                })
                .catch((error) => {
                    console.error("Error fetching category data:", error);
                });
        }
    }, [categoryId]);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedCategory = {
            nama,
        };

        fetch(`http://localhost:8081/categories/edit/${categoryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCategory),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Gagal memperbarui kategori buku");
                }
            })
            .then((data) => {
                console.log("Kategori buku berhasil diperbarui:", data);
                router.push("/dashboard/admin/book-category");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Edit Kategori Buku</h2>
            <form onSubmit={handleEdit} className="space-y-4 mt-6">
                <div>
                    <label className="block">Nama:</label>
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
                    Edit Kategori Buku
                </button>
            </form>
        </div>
    );
}
