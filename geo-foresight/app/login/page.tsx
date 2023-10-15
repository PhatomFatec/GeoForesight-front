'use client'
import React from 'react'

const Login = () => {

  if(!localStorage.getItem('token')){
    function handleClick() {
      const email = document.querySelector('.in-email').value
      const pass = document.querySelector('.in-pass').value
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "email": email,
        "senha": pass,
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("http://127.0.0.1:5000/login/", requestOptions)
        .then(response => response.text())
        .then(result => signIn(result))
        .catch(error => console.log('error', error));
  
  
    }
  
    function signIn(res: string) {
      const jsonResult = JSON.parse(res)
      console.log(jsonResult)
      if(jsonResult.access_token){
        localStorage.setItem('token', jsonResult.access_token)
        window.location.href = '/'
      }
    }
  
    return (
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='bg-white w-[800px] h-[500px] rounded-[5px] p-[60px] flex justify-between align-center flex-col'>
          <h1 className='text-center text-[40px] font-bold'>Sign up</h1>
          <div className='flex flex-col h-[80px] justify-between px-[100px]'>
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-email' placeholder='E-mail' type="email" name="" id="" />
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-pass' placeholder='Password' type="password" />
          </div>
          <button className='bg-[#11145e] text-white w-[300px] rounded-[5px] p-[3px] mx-auto h-[50px] font-bold' onClick={handleClick}>Login</button>
        </div>
      </div>
    )
  }
  else{
    window.location.href = '/'
  }
  
}

export default Login