import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";


const LogoutButton = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    const logout = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                }
            })
            const data = await res.json();
            localStorage.removeItem("chat-user");
            setAuthUser(null)
            setIsLoading(false)
            console.log(data)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <div className='mt-auto'>
            {!isLoading ? (
                <BiLogOut onClick={() => logout()} className='w-6 h-6 text-white cursor-pointer' />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    );
};
export default LogoutButton;