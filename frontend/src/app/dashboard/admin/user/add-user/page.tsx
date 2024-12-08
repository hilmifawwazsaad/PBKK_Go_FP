// ./app/add-user/page.tsx
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUser() {
    const [nama, setNama] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState(true);
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter(); // Untuk redirect setelah user ditambahkan

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        const newUser = {
            nama,
            jenis_kelamin: jenisKelamin,
            nomor_telepon: nomorTelepon,
            email,
            alamat,
            user_type: userType,
            password,
        };

        fetch("http://localhost:8081/users/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Gagal menambahkan user");
                }
            })
            .then((data) => {
                console.log("User berhasil ditambahkan:", data);
                router.push('/dashboard/admin/user'); // Redirect ke halaman utama setelah berhasil
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-semibold">Tambah User</h2>
            <form onSubmit={handleAdd} className="space-y-4 mt-6">
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
                    onClick={handleAdd}
                >
                    Tambah User
                </button>
            </form>
        </div>
    );
}
