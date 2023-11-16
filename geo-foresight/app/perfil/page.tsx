import React from 'react'

const Perfil = () => {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <div className='w-[547px] h-[682px] bg-[#f6f6f6] rounded-[5px] flex items-center flex-col'>
            <img className='mt-[72px] h-[191px] w-[191px] mb-[126px]' src="" alt="user" />
            <div className='flex border-b-[3px] w-[396px] justify-between'>
                <span>Marcus Vinícius Augusto Rocha</span>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </div>
            <label htmlFor="" className='mt-[5px] w-[396px] mb-[48px]'>Nome Completo</label>
            <div className='flex border-b-[3px] w-[396px] justify-between'>
                <span>Marcus Vinícius Augusto Rocha</span>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
            </div>
            <label htmlFor="" className='mt-[5px] w-[396px] mb-[84px]'>Nome Completo</label>
            <button className='w-[210px] h-[48px] bg-[#0EBD0A] rounded-[5px] text-[#fff] text-[24px]'>Salvar</button>
        </div>
    </div>
  )
}

export default Perfil