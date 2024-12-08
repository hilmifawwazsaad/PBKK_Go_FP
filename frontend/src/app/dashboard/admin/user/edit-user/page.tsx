"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditUser() {
    const [nama, setNama] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState(true);
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter(); // Untuk redirect setelah user diperbarui
    const searchParams = useSearchParams(); // Untuk mendapatkan id user dari URL

    const userId = searchParams.get("id"); // Ambil ID pengguna dari query parameter (misalnya: /edit-user?id=1)

    useEffect(() => {
        // Ambil data pengguna berdasarkan ID
        if (userId) {
            fetch(`http://localhost:8081/users/user/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    // Set form data dengan informasi pengguna
                    setNama(data.nama);
                    setJenisKelamin(data.jenis_kelamin);
                    setNomorTelepon(data.nomor_telepon);
                    setEmail(data.email);
                    setAlamat(data.alamat);
                    setUserType(data.user_type);
                    setPassword(data.password);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [userId]);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUser = {
            nama,
            jenis_kelamin: jenisKelamin,
            nomor_telepon: nomorTelepon,
            email,
            alamat,
            user_type: userType,
            password,
        };

        // Kirimkan data yang diperbarui ke backend
        fetch(`http://localhost:8081/users/edit/${userId}`, {
            method: "PUT", // Ganti dengan PUT untuk update data
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Gagal memperbarui user");
                }
            })
            .then((data) => {
                console.log("User berhasil diperbarui:", data);
                router.push('/dashboard/admin/user'); // Redirect ke halaman utama setelah berhasil
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Edit User</h2>
            <form onSubmit={handleEdit} className="space-y-4 mt-6">
                <div>
                    <label className="block">Nama:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Jenis Kelamin:</label>
                    <select
                        className="border px-3 py-2 w-full"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value === "true")}
                        required
                    >
                        <option value="true">Laki-laki</option>
                        <option value="false">Perempuan</option>
                    </select>
                </div>
                <div>
                    <label className="block">Nomor Telepon:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={nomorTelepon}
                        onChange={(e) => setNomorTelepon(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Email:</label>
                    <input
                        type="email"
                        className="border px-3 py-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Alamat:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Tipe User:</label>
                    <input
                        type="text"
                        className="border px-3 py-2 w-full"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block">Password:</label>
                    <input
                        type="password"
                        className="border px-3 py-2 w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FF5A5F] text-white px-4 py-2 rounded mt-4"
                >
                    Perbarui User
                </button>
            </form>
        </div>
    );
}
