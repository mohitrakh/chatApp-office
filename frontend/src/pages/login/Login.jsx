import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const login = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            const data = await res.json()
            console.log(data);
            setAuthUser(data);
            localStorage.setItem("chat-user", JSON.stringify(data))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-3xl font-semibold text-centerb text-gray-300 ">Login</h1>
                <span className="text-blue-500">ChatApp</span>
                <form action="" onSubmit={login}>
                    <div>

                        <label htmlFor="" className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" name="" onChange={(e) => setFormData({ ...formData, username: e.target.value })} value={formData.username} placeholder='Enter username' className='w-full input input-bordered h-10' />
                    </div>
                    <div>

                        <label htmlFor="" className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} ame="" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>
                    <Link to="/signup" className='text-sm hover:underline hover:text-blue-500 inline-block' >Dont have an account?</Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login