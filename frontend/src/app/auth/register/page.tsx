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
        <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans">
            <div className="w-full max-w-sm p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button onClick={handleLogin} className="text-blue-500 hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
