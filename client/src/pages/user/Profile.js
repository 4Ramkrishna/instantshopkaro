import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState("");

  useEffect(()=>{
    const {email, name, phone, address} = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);

  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const {data} = await axios.put("/api/v1/auth/profile", {name,email,password,phone,address});
        if(data?.error){
          toast.error(data?.error);
        }
        else{
          setAuth({ ...auth, user: data?.updatedUser});
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully!");
        }
    }
    catch(e){
        toast.error("Something went wrong")
    }
  } 

  return (
    <Layout title={"Your Profile"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className='form-container' style={{ minHeight:"75vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Update Profile</h4>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name'  autoFocus/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' disabled/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the password' />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Enter your phone number' />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Enter your address' />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
