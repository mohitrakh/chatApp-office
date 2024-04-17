import { useState } from "react"
import toast from "react-hot-toast"


const useSignUp = () => {
 
 const [loading, setLoading] = useState(false)
 const signupFunc = async(fullName, username, password, confirmPassword, gender) => {
   const sucess = handleInputErrors({fullName, username, password, confirmPassword, gender})
   if (!sucess) {
    return
   }
   try {
    const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
    });
    const data = await res.json();
    console.log(data)
   } catch (error) {
    toast.error(error.message)
    console.log(error)
   } finally{
    setLoading(false)
   }
console.log({fullName, username, password, confirmPassword, gender}, "data in signup")
 }
 return {loading, signupFunc}
}

export default useSignUp


function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if (!fullName || !username || !password || !confirmPassword || !gender ) {
        toast.error("Please fill all the field");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if (password.length < 6) {
        toast.error("password is short")
        return false
    }
}