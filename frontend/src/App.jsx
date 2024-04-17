import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";

function App() {

  const { authUser, setAuthUser } = useAuthContext()

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        {/* <SignUp /> */}
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={'/signup'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={authUser ? <Navigate to={'/'} /> : <SignUp />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App