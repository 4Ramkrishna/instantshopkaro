import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom' 
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth'

const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate(); 
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address);
    try{
        const res = await axios.post("/api/v1/auth/login", {email,password});
        if(res.data.success){
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
        }else{
            toast.error(res.data.message);
        }
    }
    catch(e){
        toast.error("Something went wrong")
    }
  } 
  return (
    <Layout title={"Login"}>
        <div className='form-container' style={{ minHeight:"75vh" }}>
            <form onSubmit={handleSubmit}>
                <h4 className="title">Login Form</h4>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail" className="form-label">Email</label> */}
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required/>
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the password' required/>
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
       </div>
    </Layout>
  )
}
    
export default Login
