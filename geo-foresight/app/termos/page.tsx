'use client'
import React from 'react'

const Termos = () => {

  let email

  function verificaEmail(){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("http://127.0.0.1:5000/verificar_aceitacao_email", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        console.log(result)
        if (result.message == 'Envio de email permitido'){
          email = true
        }
        else{
          email = false
        }
        
      })
      .catch(error => console.log(error))
  }
  verificaEmail()

  function confirma(){
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const raw = JSON.stringify({
        "id_user": localStorage.getItem('user_id'),
        "id_termo": localStorage.getItem('id_termo'),
        "aceitacao_padrao": true,
        "aceitacao_email": email
      })

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:5000/aceitar_termo", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          window.location.href = '/'
        })
        .catch(error => console.log(error))
  }

  function logout() {
    localStorage.clear()
    window.location.href = '/login'
  }

  var requestOptions = {
    method: 'GET',
  };

  let termo = ''

  fetch("http://127.0.0.1:5000/termo_mais_recente", requestOptions)
    .then(response => response.text())
    .then(result => {
      result = JSON.parse(result)
      localStorage.setItem('id_termo', result.id)
      termo = result.termo
      document.getElementById('termo').innerHTML = termo
    })
    .catch(error => { console.log('error', error) });

  return (
    <div className='bg-[#e1e1e1] h-[100vh] flex justify-center items-center flex-col'>
      <div className="absolute right-2 top-2 h-[42px] w-[42px] bg-white rounded-[5px] flex items-center justify-center cursor-pointer" onClick={logout}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>
      <h1 className='text-[20px] w-[800px] font-bold'>Atualização nos termos e condições</h1>
      <div className='bg-white w-[800px] p-[30px] rounded-[5px] max-h-[70vh] overflow-y-scroll'>
        <p id='termo'></p>
      </div>
      <button onClick={confirma} className='mt-[50px] bg-[#28527a] px-[20px] py-[10px] rounded-[5px] font-bold text-[#fff]'>Li e concordo com os Termos e Condições</button>
    </div>
  )
}

export default Termos