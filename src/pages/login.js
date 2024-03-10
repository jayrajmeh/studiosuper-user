// LoginPage.js

import React, { useState } from 'react';
import { ApiPostNoAuth } from '../helpers/API/ApiData';
import { toast, ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast } from '../helpers/Toast';
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as authUtil from "../utils/auth.util";




const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();


  const [button, setbutton] = useState(false); 
  const submit = () =>{
    if(!phone || !date){
      console.log("ssss")
      ErrorToast("Something Missing");
    }else{
      var accountData1 = {
        phonenumber: phone,
        dateOfBirth: date,
      };
      console.log(accountData1)
      ApiPostNoAuth("student/login", accountData1)
        .then((res) => {
          console.log("res", res);
          if (res.data.status === 200) {
            SuccessToast(res && res.data && res.data.message);
            authUtil.setToken(res.data.data.token);
            // authUtil.setRToken(res.data.data.refresh_token);
            console.log(res.data.data.token);
            disableLoading();
            window.location.href = "/home"
          } else if (res.data.status === 401) {
            console.log(res);
            ErrorToast(res.data.message);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          ErrorToast(err.message);
          setbutton(false);
          disableLoading();
        });
    }
    
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  return (
    <div className="login-container">
     <Toaster/>

      <h2>Login</h2>
      {/* <form> */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" onChange={(e)=>setPhone(e.target.value)} value={phone} required />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" onChange={(e)=>setDate(e.target.value)} value={date} required />
        </div>
        <div className="form-group">
              
              
          <button disabled={button} onClick={()=>submit()}>Login {loading && <span className="ml-3 spinner spinner-white"></span>}</button>
        </div>
      {/* </form> */}
    </div>
  );
};

export default LoginPage;
