'use client'

import getRequest from "@/api/getRequest";

export default function Home() {

  function handleSearch() {
    const values = document.querySelectorAll('input')
    const teste = getRequest()
    let endpoint = '/'
    const table = document.querySelector('table')
    table.innerHTML = teste
    values.forEach(val =>{
      endpoint += val.getAttribute('field-name') + '=' + val.value + '&'
    })
    endpoint = endpoint.slice(0, -1)
    console.log(endpoint)
  }

  return (
    <div>
      <div className='bg-[#D9D9D9] m-7 w-max flex flex-col py-2 rounded-md items-center justify-between'>
        <div className="flex flex-col">
          <p className='mr-5 ml-5'>Código da Gleba</p>
          <input field-name="ref_bacen" className='rounded-md outline-none p-1 mr-5 mx-5' type="text" />
          <p className='mr-5 ml-5'>Ordem</p>
          <input field-name="teste" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Coordenadas</p>
          <input field-name="outro" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Altitude</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Início do plantio</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Final do plantio</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Início da colheita</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Fim da colheita</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Grão</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Produção</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Irrigação</p>
          <input field-name="" className='rounded-md outline-none p-1 mx-5' type="text" />
        </div>
        <button className='bg-[#376CB9] text-white h-15 mt-4 mb-2 w-36 rounded-md mr-5' onClick={handleSearch}>Localizar</button>
      </div>
      <table>

      </table>
    </div>
  );
}
