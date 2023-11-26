'use client'
import { truncate } from 'fs/promises';
import React, { useEffect, useState } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

let checkEmail = false

let termo0
let termoId

var requestOptions = {
    method: 'GET',
};

fetch("http://127.0.0.1:5000/termo_mais_recente", requestOptions)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result)
        console.log(result)
        termo0 = result[1].termo
        termoId = result[1].id
    })
    .catch(error => { console.log('error', error) });

const Cadastro = () => {
    let checkPassword = false


    function handleBlur() {
        const emailField = document.querySelector('#email')
        const emailValue = emailField.value
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validou = regex.test(emailValue)

        if (validou) {
            emailField.style.borderBottom = 'solid 2px #e5e7eb'
            emailField.style.background = '#fff'
            checkEmail = true
            allFieldsFilled()
        } else {
            emailField.style.borderBottom = 'solid 2px red'
            emailField.style.background = '#ff00002e'
            checkEmail = false
            allFieldsFilled()
        }
    }

    function allFieldsFilled() {
        const nome = document.querySelector('#nome').value != ''
        const termos = document.querySelector('#terms').checked == true

        if (nome && checkEmail && checkPassword && termos) {
            const button = document.querySelector('#register')
            button.disabled = false
        }
        else {
            const button = document.querySelector('#register')
            button.disabled = true
        }
    }

    const [inputValue2, setInputValue2] = useState('');

    function allFieldsFilled2(event) {

        const value = event.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, ''); // Bloqueia caracteres especiais e numéricos

        setInputValue2(sanitizedValue);

        const nome = document.querySelector('#nome').value != ''
        const termos = document.querySelector('#terms').checked == true

        if (nome && checkEmail && checkPassword && termos) {
            const button = document.querySelector('#register')
            button.disabled = false
        }
        else {
            const button = document.querySelector('#register')
            button.disabled = true
        }
    }

    const [inputValue, setInputValue] = useState('');

    function cadastra() {
        const email = document.querySelector('#email').value
        const pass = document.querySelector('#password').value
        const nome = document.querySelector('#nome').value
        // const receberEmail = document.querySelector('#emailsms').checked

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "nome": nome,
            "email": email,
            "senha": pass,
            "aceites": [
                {"id_termo": termoId, "aceite": true}
              ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        console.log(requestOptions)

        fetch("http://127.0.0.1:5000/cadastro", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                window.location.href = '/login'
            })
            .catch(error => {
                console.log(error)
                NotificationManager.error('Erro na requisição');
            });
    }

    const handleChange = () => {
        const inputValue = document.querySelector('#password').value
        setInputValue(inputValue);
        const confirm = document.querySelector('#confirm').value

        const maiuscula = /[A-Z]/.test(inputValue)
        const numero = /\d/.test(inputValue)
        const caracteres = inputValue.length >= 8
        const coincidem = inputValue == confirm

        const maiusculaLabel = document.querySelector('#maiuscula')
        const numeroLabel = document.querySelector('#numero')
        const caracteresLabel = document.querySelector('#caracteres')
        const coincidemLabel = document.querySelector('#coincidem')

        maiuscula ? maiusculaLabel.style.color = "green" : maiusculaLabel.style.color = "#e1e1e1"
        numero ? numeroLabel.style.color = "green" : numeroLabel.style.color = "#e1e1e1"
        caracteres ? caracteresLabel.style.color = "green" : caracteresLabel.style.color = "#e1e1e1"
        if (coincidem && caracteres && numero && maiuscula) {
            coincidemLabel.style.color = "green"
        }
        else {
            coincidemLabel.style.color = "#e1e1e1"
        }

        if (maiuscula && numero && caracteres && coincidem) {
            checkPassword = true
        }
        else {
            checkPassword = false
        }
        allFieldsFilled()
    };

    // Função que recebe o botão como parâmetro
    const minhaFuncao = (botao) => {
        botao.disabled = true
    };

    // UseEffect para chamar a função após o componente ser montado
    useEffect(() => {
        const botao = document.getElementById('register'); // ou outra forma de selecionar o botão
        if (botao) {
            minhaFuncao(botao);
        }
    }, []);

    function paginaLogin() {
        window.location.href = '/login'
    }

    function seila() {
        setTimeout(() => {
            document.getElementById('textoTermo').innerHTML = termo0
        }, "1000");

    }

    seila()

    function mostraTermos() {
        const termo = document.getElementById('containerTermo')
        termo.style.display = 'flex'
    }

    function escondeTermo() {
        const termo = document.getElementById('containerTermo')
        termo.style.display = 'none'
    }

    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <div onClick={escondeTermo} id='containerTermo' className='hidden absolute w-full h-full flex justify-center items-center bg-[#00000082] z-[1000]'>
                <p id='textoTermo' className='bg-white p-[20px] rounded-[5px]'></p>
            </div>
            <div className='absolute right-5 bg-white top-5 px-[20px] py-[10px] rounded-[5px] cursor-pointer font-bold' onClick={paginaLogin}>Entrar</div>
            <NotificationContainer />
            <div className='bg-white w-[800px] h-[600px] rounded-[5px] p-[60px] flex justify-between align-center flex-col'>
                <h1 className='text-center text-[40px] font-bold'>Sign up</h1>
                <div className='flex flex-col h-[300px] justify-between px-[100px]'>
                    <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-email mb-[10px]' placeholder='Name' type="text" name="" id="nome" value={inputValue2} onChange={allFieldsFilled2} />
                    <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-email mb-[10px]' placeholder='E-mail' type="email" name="" id="email" onBlur={handleBlur} />
                    <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-pass mb-[10px]' placeholder='Password' type="password" id='password' value={inputValue} onChange={handleChange} />
                    <input className='border-b-[2px] focus:outline-none focus:border-[#11145e] in-pass mb-[10px]' placeholder='Confirm your password' id='confirm' onChange={handleChange} type="password" />
                    <div className='flex'>
                        <input className='mr-[10px]' type="checkbox" onChange={allFieldsFilled} name='terms' id="terms" />
                        <label htmlFor="terms">Concordo e aceito os <span onClick={mostraTermos} className='hover:text-cyan-600 font-bold cursor-pointer'>Termos e condições</span></label>
                    </div>
                    {/* <div className='flex'>
                        <input className='mr-[10px]' type="checkbox" name='emailsms' id="emailsms" />
                        <label htmlFor="terms">Quero receber e-mails informativos</label>
                    </div> */}
                    <div className='text-[14px] text-[#e1e1e1]'>
                        <p id='maiuscula'>Contém ao menos uma letra maiúscula</p>
                        <p id='numero'>Contém ao menos um número</p>
                        <p id='caracteres'>Contém ao menos 8 caracteres</p>
                        <p id='coincidem'>As senhas coincidem</p>
                    </div>
                </div>

                <button onClick={cadastra} className='bg-[#11145e] text-white w-[300px] rounded-[5px] p-[3px] mx-auto h-[50px] font-bold disabled:opacity-50 disabled:bg-gray-400 disabled:pointer-events-none' id='register'>Register</button>
            </div>
        </div>
    )
}

export default Cadastro