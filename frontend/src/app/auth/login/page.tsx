'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        router.push('./../dashboard/admin'); 
    };

    const handleRegister = () => {
        router.push('./register');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white text-gray-800">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-[#FF5A5F]">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-[#FF5A5F] text-white rounded-md hover:bg-[#FF4045]"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={handleRegister} className="text-[#FF5A5F] hover:underline">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
