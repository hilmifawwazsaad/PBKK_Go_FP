'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTransaction() {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState<any[]>([]);
    const [userID, setUserID] = useState("");  // Store the selected user ID
    const [bookID, setBookID] = useState("");  // Store the selected book ID
    const [tanggalPinjam, setTanggalPinjam] = useState("");  // Store tanggal pinjam
    const [tanggalKembali, setTanggalKembali] = useState("");  // Store tanggal kembali
    const [status, setStatus] = useState("Dipinjam");  // Default status is "Dipinjam"

    const router = useRouter();

    // Fetch users
    useEffect(() => {
        fetch("http://localhost:8081/users/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Fetch books
    useEffect(() => {
        fetch("http://localhost:8081/books/books", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Ensure books is always an array
                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    console.error("Books data is not an array:", data);
                    setBooks([]);  // Fallback to empty array
                }
            })
            .catch((error) => console.error("Error fetching books:", error));
    }, []);

    // Handle form submit
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const newTransaction = {
            user_id: parseInt(userID),
            book_id: parseInt(bookID),
            tanggal_pinjam: new Date(tanggalPinjam).toISOString().split('T')[0],
            tanggal_kembali: new Date(tanggalKembali).toISOString().split('T')[0],
            status,
        };

        fetch("http://localhost:8081/transactions/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.error || "Gagal menambahkan transaksi");
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("Transaksi berhasil ditambahkan:", data);
                router.push("/dashboard/admin/transaction");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Tambah Transaksi</h2>
            <form onSubmit={handleAdd} className="space-y-4 mt-6">
                <div>
                    <label className="block">Peminjam:</label>
                    <select
                        value={userID}  // Bind to userID state
                        onChange={(e) => setUserID(e.target.value)}  // Set selected user ID
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Pilih Peminjam</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Judul Buku:</label>
                    <select
                        value={bookID}  // Bind to bookID state
                        onChange={(e) => setBookID(e.target.value)}  // Set selected book ID
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Pilih Buku</option>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.judul}
                                </option>
                            ))
                        ) : (
                            <option disabled>No books available</option>
                        )}
                    </select>
                </div>

                <div>
                    <label className="block">Tanggal Pinjam:</label>
                    <input
                        type="date"
                        value={tanggalPinjam}  // Bind to tanggalPinjam state
                        onChange={(e) => setTanggalPinjam(e.target.value)}  // Set tanggalPinjam state
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block">Tanggal Kembali:</label>
                    <input
                        type="date"
                        value={tanggalKembali}  // Bind to tanggalKembali state
                        onChange={(e) => setTanggalKembali(e.target.value)}  // Set tanggalKembali state
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block">Status:</label>
                    <select
                        value={status}  // Bind to status state
                        onChange={(e) => setStatus(e.target.value)}  // Set status state
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Dipinjam">Dipinjam</option>
                        <option value="Dikembalikan">Dikembalikan</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Tambah Transaksi
                </button>
            </form>
        </div>
    );
}
