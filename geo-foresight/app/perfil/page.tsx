'use client'

import React from 'react'

const Perfil = () => {

  teste()

  function teste() {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch("http://127.0.0.1:5000/infousers", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        document.getElementById('nome').value = result.nome
        document.getElementById('email').value = result.email
        document.getElementById('telefone').value = result.telefone
      })
      .catch(error => console.log(error))
  }

  function altera() {

    const fields = {
      nome: document.querySelector('#nome').value,
      email: document.querySelector('#email').value,
      telefone: document.querySelector('#telefone').value
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    var raw = JSON.stringify({
      "nome": fields.nome,
      "email": fields.email,
      "telefone": fields.telefone
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/attuser", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        location.reload()
      })
      .catch(error => {
        console.log('error', error)
        // NotificationManager.error('Erro na requisição');
        // document.querySelector('.loading').style.display = 'none'
        // document.querySelector('.localizar').style.display = 'block'
      });
  }

  function edita(){
    document.getElementById('btnSave').style.visibility = 'visible'
    document.getElementById('nome').style.pointerEvents = 'auto'
    document.getElementById('email').style.pointerEvents = 'auto'
    document.getElementById('telefone').style.pointerEvents = 'auto'
  }

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <a href="/" className='fixed h-[30px] z-[1000] bg-white left-5 top-5 flex justify-center items-center px-3 rounded'>Voltar</a>
      <div className='w-[547px] h-[682px] bg-[#f6f6f6] rounded-[5px] flex items-center flex-col relative'>
        <div className='absolute right-[10px] top-[10px] cursor-pointer' onClick={edita}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </div>
        <img className='mt-[72px] h-[191px] w-[191px] mb-[126px]' src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="user" />
        <input id='nome' className='w-[400px] bg-transparent border-b-[2px] focus:outline-none focus:border-[#11145e] pointer-events-none' placeholder='Nome completo' type="text" />
        <label className='text-[12px] w-[400px] mb-[20px]'>Nome completo</label>
        <input id='email' className='w-[400px] bg-transparent border-b-[2px] focus:outline-none focus:border-[#11145e] pointer-events-none' placeholder='E-mail' type="text" />
        <label className='text-[12px] w-[400px] mb-[20px]'>E-mail</label>
        <input id='telefone' className='w-[400px] bg-transparent border-b-[2px] focus:outline-none focus:border-[#11145e] pointer-events-none' placeholder='Telefone' type="Telefone" />
        <label className='text-[12px] w-[400px] mb-[20px]'>Telefone</label>
        <button id='btnSave' className='bg-[#11145e] text-white w-[200px] rounded-[5px] p-[3px] flex justify-center items-center h-[30px] invisible' onClick={altera}>Salvar</button>
      </div>
    </div>
  )
}

export default Perfil