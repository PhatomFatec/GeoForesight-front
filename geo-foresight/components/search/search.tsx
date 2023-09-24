'use client'
import React from 'react'
import getRequest from '@/api/getRequest';

const Search = () => {

  function handleClick() {
    const teste = getRequest()
    console.log(teste);
  }

  return (
    <div className='bg-[#D9D9D9] m-7 w-max flex flex-col py-2 rounded-md items-center justify-between'>
      <div className="flex flex-col">
        <p className='mr-5 ml-5'>Código da Gleba</p>
        <input className='rounded-md outline-none p-1 mr-5 mx-5' type="text" />
        <p className='mr-5 ml-5'>Ordem</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Coordenadas</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Altitude</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Início do plantio</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Final do plantio</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Início da colheita</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Solo</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Grão</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Produção</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Irrigação</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Clima</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Evento</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
        <p className='mr-5 ml-5'>Estado</p>
        <input className='rounded-md outline-none p-1 mx-5' type="text" />
      </div>
      <button className='bg-[#376CB9] text-white h-15 mt-4 mb-2 w-36 rounded-md mr-5' onClick={handleClick}>Localizar</button>
    </div>
  )
}

export default Search