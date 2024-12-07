'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match');
            return;
        }

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        router.push('./login');
    };

    const handleLogin = () => {
        router.push('./login');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-gray-800">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-[#FF5A5F]">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5A5F]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF4045]"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={handleLogin} className="text-[#FF5A5F] hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
