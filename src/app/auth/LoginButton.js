'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signin } from '../../components/counter/nameUserSlice';

const LoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.result));
                dispatch(signin({ name: data.result.name }));
                router.push('/admin');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
                Đăng nhập
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginButton;
