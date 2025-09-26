import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import logoLogin from '/todo_login.svg';
import apiClient from "../config/api";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        const response = await apiClient.post('/auth/login',{username, password})

        if(response.status === 200){
            localStorage.setItem('token', response.token);
            toast.success('Login successful');
            setTimeout(() => {
                navigate('/');
            }, 1000); 
        } else {
            // toast.error('Login failed: ' + result.message);
            toast.error('Login failed');
            setPassword('');
        }
    }

    return (
        <>
            <Toaster position="top-right"
            reverseOrder={false} />
            <div className="flex flex-row w-4xl h-128 p-6 bg-white rounded shadow-md mx-auto mt-25 ">
            
            <div className="w-2/3">
                <img src={logoLogin} className=" logo h-full" alt="Vite logo" />
            </div>
            <div className="w-1/3 my-auto mr-6">
                <h1 className="text-2xl font-bold mb-4">Todo Login</h1>
                <p className="text-sm">Sign in to started your journey to create amazing activities!</p>
                <form className="mt-4" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="text-sm block text-gray-700">Username:</label>
                        <input type="text" className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-sm" onChange={(e) => {
                            setUsername(e.target.value)
                        }} required />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm block text-gray-700">Password:</label>
                        <input type="password" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} required />
                    </div>
                    <div className="flex flex-row items-end justify-between">
                        <button type="submit" className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                        Login
                        </button>

                        <span className="text-xs text-blue-400 cursor-pointer"><Link to="/register">Buat akun?</Link></span>
                    </div>
                </form>
            </div>
            </div>
            
        </>
    )
}