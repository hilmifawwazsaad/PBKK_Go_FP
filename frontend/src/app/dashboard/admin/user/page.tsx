'use client';

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type UsersType = {
    id: number;
    nama: string;
    jenis_kelamin: boolean;
    nomor_telepon: string;
    email: string;
    alamat: string;
    user_type: string;
    transaction: null | any;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
};

export default function User() {
    const [users, setUsers] = useState<UsersType[]>([]);
    const router = useRouter();

    // Fetch data users
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

    const handleAdd = () => {
        window.location.href = "/dashboard/admin/user/add-user";
    };

    const handleEdit = (id: number) => {
        router.push(`/dashboard/admin/user/edit-user?id=${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
            try {
                const response = await fetch(`http://localhost:8081/users/delete/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    setUsers(users.filter((user) => user.id !== id));
                    alert("Pengguna berhasil dihapus");
                } else {
                    console.error("Error deleting user:", response.statusText);
                    alert("Gagal menghapus pengguna");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Terjadi kesalahan saat menghapus pengguna");
            }
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Halaman Pengguna</h2>
            <p>Halaman untuk melihat daftar pengguna, menambahkan, mengedit, dan menghapus pengguna.</p>
            <button
                className="mt-4 mb-4 px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAdd}
            >
                Tambah User
            </button>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-[#FF5A5F] text-[#F7F7F7]">
                        <th className="border border-gray-200 px-4 py-3 font-medium">No</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Nama</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Jenis Kelamin</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Nomor Telepon</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Email</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Alamat</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Tipe User</th>
                        <th className="border border-gray-200 px-4 py-3 font-medium">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4">
                                Tidak ada data pengguna
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.nama}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.jenis_kelamin ? "Laki-laki" : "Perempuan"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{user.nomor_telepon}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.alamat}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.user_type === "admin" ? "Admin" : "User"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                    <button
                                        className="text-yellow-500 hover:text-yellow-600"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => handleDelete(user.id)}
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
