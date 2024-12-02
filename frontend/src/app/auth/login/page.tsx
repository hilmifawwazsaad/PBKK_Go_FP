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

        router.push('/dashboard/admin'); 
    };

    const handleRegister = () => {
        router.push('./register');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-black dark:text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-400"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <button onClick={handleRegister} className="text-blue-500 dark:text-blue-400 hover:underline">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
