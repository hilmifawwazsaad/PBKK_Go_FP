//app/dashboard/admin/transaction/page.tsx

'use client'

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type TransactionType = {
    id: number;
    user: string;
    book: string;
    tanggal_pinjam: string;
    tanggal_kembali: string;
    status: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
};

export default function Transaction() {
    const [Transaction, setTransaction] = useState<TransactionType[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:8081/transactions/transactions", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setTransaction(data))
            .catch((error) => console.error("Error fetching transactions:", error));
    }, []);

    const handleAdd = () => {
        window.location.href = "/dashboard/admin/transaction/add-transaction";
    };

    const handleEdit = (id: number) => {
        router.push(`/dashboard/admin/transaction/edit-transaction?id=${id}`);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8081/transactions/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setTransaction(Transaction.filter((transaction) => transaction.id !== id));
            } else {
                console.error("Error deleting transaction:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };
    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Halaman Transaksi</h2>
            <p>Halaman untuk melakukan pencatatan peminjaman buku.</p>
            <button
                onClick={handleAdd}
                className="mt-4 mb-4 bg-blue-500 text-white px-4 py-3 rounded mt-4"
            >
                Tambah Transaksi
            </button>

            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-[#FF5A5F] text-[#F7F7F7]">
                        <th className="border border-gray-200 px-4 py-2">No</th>
                        <th className="border border-gray-200 px-4 py-2">Peminjam</th>
                        <th className="border border-gray-200 px-4 py-2">Judul Buku</th>
                        <th className="border border-gray-200 px-4 py-2">Tanggal Pinjam</th>
                        <th className="border border-gray-200 px-4 py-2">Tanggal Kembali</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                        <th className="border border-gray-200 px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Transaction.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                Tidak ada data pengguna
                            </td>
                        </tr>
                    ) : (
                        Transaction.map((transaction, index) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{transaction.user ? transaction.user.nama : "Nama Tidak Tersedia"}</td>
                                <td className="border border-gray-300 px-4 py-2">{transaction.book ? transaction.book.judul : "Buku Tidak Tersedia"}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {transaction.tanggal_pinjam ? new Date(transaction.tanggal_pinjam).toLocaleDateString() : "Tanggal Tidak Tersedia"}   
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {transaction.tanggal_kembali ? new Date(transaction.tanggal_kembali).toLocaleDateString() : "Tanggal Tidak Tersedia"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{transaction.status}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center space-x-4">
                                    <button 
                                        onClick={() => handleEdit(transaction.id)}
                                        className="text-yellow-500 hover:text-yellow-600">
                                        <FaEdit size={20} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(transaction.id)}
                                        className="text-red-500 hover:text-red-600">
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