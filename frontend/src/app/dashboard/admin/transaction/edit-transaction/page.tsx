"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface User {
    id: number;
    nama: string;
}

interface Book {
    id: number;
    judul: string;
}

export default function EditTransaction() {
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [userID, setUserID] = useState("");
    const [bookID, setBookID] = useState("");
    const [tanggalPinjam, setTanggalPinjam] = useState("");
    const [tanggalKembali, setTanggalKembali] = useState("");
    const [status, setStatus] = useState("Dipinjam");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { id } = useParams();

    // Log the transaction ID
    useEffect(() => {
        console.log("Transaction ID from params:", id);
    }, [id]);

    // Fetch users with error handling
    useEffect(() => {
        fetch("http://localhost:8081/users/users")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched users:", data);
                setUsers(data);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
            });
    }, []);

    // Fetch books with error handling
    useEffect(() => {
        fetch("http://localhost:8081/books/books")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched books:", data);
                setBooks(data);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                setError("Failed to load books");
            });
    }, []);

    // Fetch transaction details with error handling
    useEffect(() => {
        if (!id) {
            console.error("No transaction ID provided");
            setError("No transaction ID provided");
            return;
        }

        fetch(`http://localhost:8081/transactions/transaction/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched transaction:", data);
                if (!data) throw new Error("No transaction data received");
                
                setUserID(data.user_id?.toString() || "");
                setBookID(data.book_id?.toString() || "");
                setTanggalPinjam(data.tanggal_pinjam || "");
                setTanggalKembali(data.tanggal_kembali || "");
                setStatus(data.status || "Dipinjam");
            })
            .catch((err) => {
                console.error("Error fetching transaction:", err);
                setError(`Failed to load transaction: ${err.message}`);
            });
    }, [id]);

    // Handle form submission with error handling
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            if (!id) throw new Error("No transaction ID provided");
            if (!userID) throw new Error("User ID is required");
            if (!bookID) throw new Error("Book ID is required");
            if (!tanggalPinjam) throw new Error("Tanggal Pinjam is required");
            if (!tanggalKembali) throw new Error("Tanggal Kembali is required");

            const updatedTransaction = {
                user_id: parseInt(userID),
                book_id: parseInt(bookID),
                tanggal_pinjam: tanggalPinjam,
                tanggal_kembali: tanggalKembali,
                status,
            };

            console.log("Sending update with data:", updatedTransaction);

            const response = await fetch(`http://localhost:8081/transactions/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTransaction),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Update successful:", result);
            router.push("/dashboard/admin/transaction");
        } catch (err: any) {
            console.error("Error updating transaction:", err);
            setError(err.message || "Failed to update transaction");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Edit Transaction</h2>
            <form onSubmit={handleUpdate} className="space-y-4 mt-6">
                <div>
                    <label className="block">Peminjam:</label>
                    <select
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
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
                        value={bookID}
                        onChange={(e) => setBookID(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Pilih Buku</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.judul}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Tanggal Pinjam:</label>
                    <input
                        type="date"
                        value={tanggalPinjam}
                        onChange={(e) => setTanggalPinjam(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block">Tanggal Kembali:</label>
                    <input
                        type="date"
                        value={tanggalKembali}
                        onChange={(e) => setTanggalKembali(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Dipinjam">Dipinjam</option>
                        <option value="Dikembalikan">Dikembalikan</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Transaction
                </button>
            </form>
        </div>
    );
}
