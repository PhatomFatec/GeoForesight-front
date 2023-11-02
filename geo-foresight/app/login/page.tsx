'use client'
import React from 'react'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Login = () => {

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

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(typeof(JSON.parse(result).access_token))
        console.log(result)

        if(typeof(JSON.parse(result).access_token) != undefined){
          localStorage.setItem('email', email)
          signIn(result)
          return
        }
        if(typeof(JSON.parse(result).message) != undefined){
          NotificationManager.error(JSON.parse(result).message)
        }
      })
      .catch(error => {
        console.log(error)
        NotificationManager.error('Erro na requisição');
      });

  }

  function verificaTermo(){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("http://127.0.0.1:5000/verificar_aceitacao", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        if(result.message == "Último termo já aceito"){
          window.location.href = '/'
        }
        else{
          window.location.href = '/termos'
        }
      })
      .catch(error => console.log(error))

  }

  setTimeout(() => {
    document.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        handleClick()
      }
    });
  }, "1000");

  function signIn(res: string) {
    const jsonResult = JSON.parse(res)
    console.log(jsonResult)
    if (jsonResult.access_token) {
      localStorage.setItem('token', jsonResult.access_token)
      localStorage.setItem('user_id', jsonResult.user_id)
      verificaTermo()
      // window.location.href = '/'
    }
  }

  function showTerms(){
    document.querySelector("#termo").style.display = "flex"
  }

  function hideTerms(){
    document.querySelector("#termo").style.display = "none"
  }

  function paginaCadastro(){
    window.location.href = '/cadastro'
  }

  if (!localStorage.getItem('token')) {

    return (
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='absolute right-5 bg-white top-5 px-[20px] py-[10px] rounded-[5px] cursor-pointer font-bold' onClick={paginaCadastro}>Registrar-se</div>
        <NotificationContainer/>
        <div className='bg-white w-[800px] h-[500px] rounded-[5px] p-[60px] flex justify-between align-center flex-col'>
          <h1 className='text-center text-[40px] font-bold'>Sign in</h1>
          <div className='flex flex-col h-[80px] justify-between px-[100px]'>
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-email' placeholder='E-mail' type="email" name="" id="" />
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-pass' placeholder='Password' type="password" />
          </div>
          <button className='bg-[#11145e] text-white w-[300px] rounded-[5px] p-[3px] mx-auto h-[50px] font-bold' onClick={handleClick}>Login</button>
        </div>
      </div>
    )
  }
  else {
    window.location.href = '/'
  }

}

export default Login