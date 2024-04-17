import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'
import { useAuthContext } from '../../context/AuthContext'

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const { setAuthUser } = useAuthContext()

    const { loading, signupFunc } = useSignUp()

    const handleGenderChange = (gender) => {
        setFormData({
            ...formData,
            gender: gender
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            console.log(data)
            setAuthUser(data)
            localStorage.setItem("chat-user", JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-green-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-3xl font-semibold text-centerb text-gray-300 ">Sign Up</h1>
                <span className="text-blue-500">ChatApp</span>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input type="text" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} value={formData.fullName} name="" placeholder='John Doe' className='w-full input input-bordered h-10' />
                    </div>
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
                        <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} name="" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>
                    <div>

                        <label htmlFor="" className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input type="password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} value={formData.confirmPassword} name="" placeholder='Enter password' className='w-full input input-bordered h-10' />
                    </div>

                    <GenderCheckBox handleGenderChange={handleGenderChange} selectedGender={formData.gender} />

                    <Link to="/login" className='text-sm hover:underline hover:text-blue-500 m-2 inline-block' >Already have an account?</Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp