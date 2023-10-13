import React from 'react'

const Login = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='bg-white w-[800px] h-[500px] rounded-[5px] p-[60px] flex justify-between align-center flex-col'>
        <h1 className='text-center text-[40px] font-bold'>Sign up</h1>
        <div className='flex flex-col h-[80px] justify-between px-[100px]'>
          <input className='border-b-[2px] focus:outline-none focus:border-[#11145e]' placeholder='E-mail' type="email" name="" id="" />
          <input className='border-b-[2px] focus:outline-none focus:border-[#11145e]' placeholder='Password' type="password" />
        </div>
        <button className='bg-[#11145e] text-white w-[300px] rounded-[5px] p-[3px] mx-auto h-[50px] font-bold'>Login</button>
      </div>
    </div>
  )
}

export default Login