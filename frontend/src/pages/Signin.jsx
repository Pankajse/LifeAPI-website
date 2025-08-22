import whitelogo from '../assets/lifeapi_logo_white.png';
import redlogo from '../assets/lifeapi_logo_red.png';
import Input1 from '../components/input1';
import Button1 from '../components/Button1';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("before request");
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signin`, {
        email, password
      });
      console.log("after request");
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || "Something went wrong")
        return
      } else {
        setMsg("Network error. Please try again.");
        return
      }
    }
  }


  return (
    <div className='flex'>
      <div className='bg-white dark:bg-[#121212] h-screen w-full flex flex-col justify-center items-center gap-4 '>
        <img src={redlogo} alt="Logo" className='w-40 fixed p-3 top-2 left-2' />
        <h3 className='text-2xl font-semibold dark:text-[#B0B0B0] '>Log in to your account</h3>
        <form className='flex flex-col gap-3 w-full justify-center items-center p-5'>
          <Input1 placeholderText='EMAIL' type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Input1 placeholderText='PASSWORD' type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <h6 className='text-sm text-red-600'>{msg}</h6>
          <Button1 text="Sign In"
            onClick={onSubmitHandler}
          />
          <p className='text-xs font-normal dark:text-[#808080]'>New to LifeApi? <Link to="/signup" className="text-blue-600">Signup</Link></p>
        </form>
      </div>

      <div className='md:flex flex-col gap-5 justify-center items-center bg-linear-to-b dark:from-red-800 dark:to-red-950 from-red-500 to-red-800 h-screen w-full hidden '>
        <img src={whitelogo} alt="Logo" className=' w-70 ' />
        <h1 className=' text-3xl font-serif text-white font-extrabold pb-10 '>Every Drop Counts</h1>
      </div>
    </div>
  )
}

export default Signin