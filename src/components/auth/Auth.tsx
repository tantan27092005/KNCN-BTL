'use client';
import Button from '../button/Button';
import Input from './Input';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { signin } from '../counter/nameUserSlice';

const Auth = ({ formData, handleChange, handleSubmit, isSignup, switchMode }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const handleTestLogin = async (e) => {
        e.preventDefault();
        // Logic đăng nhập test local
        const testUser = {
            name: 'Người dùng Test',
            email: formData.email,
            token: 'fake-token-for-testing',
        };
        localStorage.setItem('token', testUser.token);
        localStorage.setItem('user', JSON.stringify(testUser));
        dispatch(signin({ name: testUser.name }));
        router.push('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
    };

    return (
        <div className="text-md font-medium text-gray-900 space-y-4 bg-white py-8 px-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            {/* Phần tiêu đề */}
            <div className="text-center">
                <FontAwesomeIcon icon={faLock} className="text-blue-500 text-4xl mb-4" /> {/* Icon màu xanh */}
                <h2 className="text-2xl font-bold text-gray-800">
                    {isSignup ? 'Đăng ký' : 'Đăng nhập'}
                </h2>
                <p className="text-gray-600 mt-2">
                    {isSignup ? 'Tạo tài khoản mới' : 'Đăng nhập để tiếp tục'}
                </p>
            </div>

            {/* Form đăng nhập/đăng ký */}
            <form onSubmit={handleTestLogin} className="space-y-4 mt-6">
                {isSignup && (
                    <>
                        <Input
                            name={'firstName'}
                            placeholder={'Họ'}
                            label={'Họ'}
                            handleChange={handleChange}
                            type={'text'}
                            value={formData.firstName}
                        />
                        <Input
                            name={'lastName'}
                            placeholder={'Tên'}
                            label={'Tên'}
                            handleChange={handleChange}
                            type={'text'}
                            value={formData.lastName}
                        />
                    </>
                )}
                <Input
                    name={'email'}
                    placeholder={'Email'}
                    label={'Email'}
                    handleChange={handleChange}
                    type={'email'}
                    value={formData.email}
                />
                <Input
                    name={'password'}
                    placeholder={'Mật khẩu'}
                    label={'Mật khẩu'}
                    handleChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    handleShowPassword={handleShowPassword}
                    value={formData.password}
                />
                {isSignup && (
                    <Input
                        name={'confirmPassword'}
                        placeholder={'Nhập lại mật khẩu'}
                        label={'Nhập lại mật khẩu'}
                        handleChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        handleShowPassword={handleShowPassword}
                        value={formData.confirmPassword}
                    />
                )}
                <div className="mt-6">
                    <Button
                        type="submit"
                        title={isSignup ? 'Đăng ký' : 'Đăng nhập'}
                        color={'white'}
                        bgBtn={'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
                        className="w-full"
                    />
                </div>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={switchMode}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        {isSignup ? 'Đã có tài khoản? Đăng nhập' : "Chưa có tài khoản? Đăng ký"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
