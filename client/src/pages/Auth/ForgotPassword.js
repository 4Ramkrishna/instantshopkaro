import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState(""); 
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address);
    try{
        const res = await axios.post("/api/v1/auth/forgot-password", {email, newPassword, answer});
        if(res && res.data.success){
            toast.success(res.data.message);
            navigate("/login");
        }else{
            toast.error(res.data.message);
        }
    }
    catch(e){
        toast.error("Something went wrong")
    }
  };
  return (
    <Layout title={"Forgot Password"}>
        <div className='form-container' style={{ minHeight:"75vh" }}>
            <form onSubmit={handleSubmit}>
                <h4 className="title">Reset Password</h4>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputEmail" className="form-label">Email</label> */}
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' required/>
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                    <input type="password" className="form-control" id="exampleInputPassword1" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter the new password' required/>
                </div>
                <div className="mb-3">
                <input type="text" className="form-control" id="exampleInputPassword1" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder='Enter your favourite sports' required/>
                </div>
                <button type="submit" className="btn btn-primary">Reset</button>
            </form>
       </div>
    </Layout>
  )
}

export default ForgotPassword;  
