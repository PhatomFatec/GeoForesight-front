import React from 'react'

const Search = () => {
  return (
    <div className='bg-[#D9D9D9] m-7 h-12 flex py-2 rounded-md items-center justify-between'>
      <div className="flex flex-row items-center">
        <p className='mr-5 ml-5'>Código da Gleba</p>
        <input className='rounded-md outline-none p-1 mr-5' type="text" />
      </div>
      <button className='bg-[#376CB9] text-white h-full w-36 rounded-md mr-5'>Localizar</button>
    </div>
  )
}

export default Search