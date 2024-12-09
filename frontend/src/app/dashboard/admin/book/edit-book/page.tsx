'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditBook() {
    const [judul, setJudul] = useState("")
    const [penulis, setPenulis] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [tahunTerbit, setTahunTerbit] = useState("")
    const [jumlahHalaman, setJumlahHalaman] = useState("")
    const [bahasaBuku, setBahasaBuku] = useState("")
    const [stok, setStok] = useState(0)
    const [categories, setCategories] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    const bookId = searchParams.get("id");
    // const categoryId = searchParams.get("category_id");

    // Fetch data buku berdasarkan ID
    useEffect(() => {
        if (bookId) {
            fetch(`http://localhost:8081/books/book/${bookId}`)
                .then((response) => response.json())
                .then((data) => {
                    setJudul(data.judul);
                    setPenulis(data.penulis);
                    setTahunTerbit(data.tahun_terbit);
                    setJumlahHalaman(data.jumlah_halaman);
                    setBahasaBuku(data.bahasa_buku);
                    setStok(data.stok);
                })
                .catch((error) => {
                    console.error("Error fetching book data:", error);
                });
        }
    }
        , [bookId]);

    // Fetch daftar kategori
    useEffect(() => {
        fetch(`http://localhost:8081/categories/categories`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);



    // Handle edit form submission
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBook = {
            judul,
            kategori_id: categoryId,
            penulis,
            tahun_terbit: tahunTerbit,
            jumlah_halaman: jumlahHalaman,
            bahasa_buku: bahasaBuku,
            stok,
        };

        // Kirimkan data yang diperbarui ke backend
        fetch(`http://localhost:8081/books/edit/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Gagal memperbarui buku");
                }
            })
            .then(() => {
                // Redirect ke halaman daftar buku setelah berhasil memperbarui buku
                router.push("/dashboard/admin/book");
            })
            .catch((error) => {
                console.error("Error updating book:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Edit Buku</h2>
            <form onSubmit={handleEdit} className="space-y-4 mt-6">
                <div>
                    <label className="block">Judul Buku:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Kategori:</label>
                    <select
                        className="border px-3 py-2 w-full"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        {Array.isArray(categories) && categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.nama}
                            </option>
                        ))}

                    </select>
                </div>

                <div>
                    <label className="block">Penulis:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={penulis}
                        onChange={(e) => setPenulis(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Tahun Terbit:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={tahunTerbit}
                        onChange={(e) => setTahunTerbit(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Jumlah Halaman:</label>
                    <input
                        type="number"
                        className="border px-3 py-2 w-full"
                        value={jumlahHalaman}
                        onChange={(e) => setJumlahHalaman(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Bahasa Buku:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={bahasaBuku}
                        onChange={(e) => setBahasaBuku(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block">Stok:</label>
                    <input
                        type="number"
                        className="border px-3 py-2 w-full"
                        value={stok}
                        onChange={(e) => setStok(parseInt(e.target.value))}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Perbarui Buku
                </button>
            </form>
        </div>
    );
}
