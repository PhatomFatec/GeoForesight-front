'use client'
import React from 'react'

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

    fetch("http://127.0.0.1:5000/login/", requestOptions)
      .then(response => response.text())
      .then(result => signIn(result))
      .catch(error => console.log('error', error));

  }

  document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      handleClick()
    }
  });

  function signIn(res: string) {
    const jsonResult = JSON.parse(res)
    console.log(jsonResult)
    if (jsonResult.access_token) {
      localStorage.setItem('token', jsonResult.access_token)
      window.location.href = '/'
    }
  }

  function showTerms(){
    document.querySelector("#termo").style.display = "flex"
  }

  function hideTerms(){
    document.querySelector("#termo").style.display = "none"
  }

  if (!localStorage.getItem('token')) {

    return (
      <div className='flex w-full h-screen justify-center items-center'>
        <div className='bg-white w-[800px] h-[500px] rounded-[5px] p-[60px] flex justify-between align-center flex-col'>
          <h1 className='text-center text-[40px] font-bold'>Sign in</h1>
          <div className='flex flex-col h-[80px] justify-between px-[100px]'>
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-email' placeholder='E-mail' type="email" name="" id="" />
            <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-pass' placeholder='Password' type="password" />
          </div>
          <span className='text-center '>Ao fazer login você concorda com os <span onClick={showTerms} className='text-teal-500 cursor-pointer'>Termos e condições</span></span>
          <button className='bg-[#11145e] text-white w-[300px] rounded-[5px] p-[3px] mx-auto h-[50px] font-bold' onClick={handleClick}>Login</button>
        </div>
        <div id='termo' onClick={hideTerms} className='absolute w-full h-full flex justify-center items-center bg-[#0000007a] hidden'>
          <div className='relative bg-white w-[80%] p-8 rounded-[5px]'>
            <strong className='w-full flex justify-center'>TERMOS DE USO E POLÍTICA DE PRIVACIDADE</strong>
            <br/>
            Bem-vindo ao Geoforesight, operado por Phantom. Ao acessar nosso site, você concorda com estes Termos de Uso e com nossa Política de Privacidade. Se você não concorda com estes termos, por favor, não use nosso site.

            1. USO DO SITE

            1.1. Você concorda em usar este site apenas para fins legais e de acordo com todas as leis e regulamentos aplicáveis.

            1.2. Você não deve usar nosso site de qualquer forma que possa danificar, desativar, sobrecarregar ou prejudicar nosso servidor, rede de computadores ou outras redes conectadas ao nosso site.

            2. CONTEÚDO DO SITE

            2.1. O conteúdo deste site é apenas para fins informativos. Podemos modificar, substituir ou remover qualquer parte do conteúdo sem aviso prévio.

            2.2. Todas as marcas registradas, nomes comerciais, logotipos e outros materiais relacionados ao nosso site são de propriedade da Phantom ou de seus licenciantes e não podem ser usados sem permissão por escrito.

            3. POLÍTICA DE PRIVACIDADE

            3.1. Nós respeitamos sua privacidade e protegemos suas informações pessoais de acordo com nossa Política de Privacidade. Ao usar nosso site, você concorda com a coleta e o uso de suas informações de acordo com nossa Política de Privacidade.

            4. LIMITAÇÃO DE RESPONSABILIDADE

            4.1. Este site é fornecido "como está" e "conforme disponível". Não oferecemos garantias de qualquer tipo, expressas ou implícitas, sobre a precisão, confiabilidade ou disponibilidade do site.

            4.2. Não nos responsabilizamos por danos diretos, indiretos, incidentais, especiais ou consequenciais que possam surgir do uso ou da incapacidade de usar nosso site.

            5. DISPOSIÇÕES GERAIS

            5.1. Estes Termos de Uso e nossa Política de Privacidade constituem o acordo completo entre você e Phantom em relação ao uso do site.

            5.2. Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio. As modificações entram em vigor imediatamente após serem publicadas no site.

            Ao usar nosso site, você indica que aceita estes Termos de Uso e concorda em obedecê-los. Se você não concorda com estes termos, por favor, não use nosso site.

            Para quaisquer dúvidas ou preocupações sobre estes Termos de Uso, entre em contato conosco através do e-mail: contato@phantom.com.br

            Data de Última Atualização: 17/10/2023
            <br/>
            <span className='w-full justify-center flex text-[10px]'>[Copyright © 2023 Phantom. Todos os direitos reservados.]</span>
          </div>
        </div>
      </div>
    )
  }
  else {
    window.location.href = '/'
  }

}

export default Login