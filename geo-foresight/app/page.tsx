'use client'

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Rectangle, Tooltip, Polygon } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import MyChart from "@/components/myChart";

export default function Home() {

  let dataa

  const [resultadoPesquisa, setResultadoPesquisa] = useState([])
  const [data, setData] = useState([]);
  const [centro, setCentro] = useState([-15.7217003, -48.1021702])
  const [zoom, setZoom] = useState(6)
  const [listaaa, setListaaa] = useState(0);
  const [dateee, setDateee] = useState(0);

  useEffect(() => {
    if (data.length > 0) {
      changeCenter()
    }
  }, [data]);

  document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      handleSearch()
    }
  });


  function handleSearch() {

    document.querySelector('.localizar').style.display = 'none'
    document.querySelector('.loading').style.display = 'block'

    const fields = {
      ref_bacen: (document.querySelector('#in_codigo').value == '') ? null : document.querySelector('#in_codigo').value,
      inicio_plantio: (document.querySelector('#in_inicio_do_plantio').value == '') ? null : document.querySelector('#in_inicio_do_plantio').value,
      final_plantio: (document.querySelector('#in_final_do_plantio').value == '') ? null : document.querySelector('#in_final_do_plantio').value,
      inicio_colheita: (document.querySelector('#in_inicio_da_colheita').value == '') ? null : document.querySelector('#in_inicio_da_colheita').value,
      final_colheita: (document.querySelector('#in_final_da_colheita').value == '') ? null : document.querySelector('#in_final_da_colheita').value,
      grao: (document.querySelector('#in_grao').value == '') ? null : document.querySelector('#in_grao').value,
      producao: (document.querySelector('#in_producao').value == '') ? null : document.querySelector('#in_producao').value,
      irrigacao: (document.querySelector('#in_irrigacao').value == '') ? null : document.querySelector('#in_irrigacao').value,
      solo: (document.querySelector('#in_solo').value == '') ? null : document.querySelector('#in_solo').value,
      clima: (document.querySelector('#in_clima').value == '') ? null : document.querySelector('#in_clima').value,
      ciclo_do_cultivo: (document.querySelector('#in_ciclo_do_cultivo').value == '') ? null : document.querySelector('#in_ciclo_do_cultivo').value,
      estado: (document.querySelector('#in_estado').value == '') ? null : document.querySelector('#in_estado').value,
      municipio: (document.querySelector('#in_municipio').value == '') ? null : document.querySelector('#in_municipio').value,
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

    var raw = JSON.stringify({
      "ref_bacen": fields.ref_bacen,
      "nu_identificador": null,
      "coordenadas": null,
      "inicio_plantio": fields.inicio_plantio,
      "final_plantio": fields.final_plantio,
      "inicio_colheita": fields.inicio_colheita,
      "final_colheita": fields.final_colheita,
      "descricao_irrigacao": fields.irrigacao,
      "descricao_solo": fields.solo,
      "descricao_evento": fields.clima,
      "descricao_cultiva": fields.ciclo_do_cultivo,
      "descricao_ciclo": null,
      "descricao_grao": fields.grao,
      "descricao_producao": fields.producao,
      "estado": fields.estado,
      "municipio": fields.municipio,
      "produto": null
    });
    console.log(JSON.parse(raw))

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/consultaNova", requestOptions)
      .then(response => response.text())
      .then(result => grava(result))
      .catch(error => {
        console.log('error', error)
        NotificationManager.error('Erro na requisição');
        document.querySelector('.loading').style.display = 'none'
        document.querySelector('.localizar').style.display = 'block'
      });
  }

  function grava(r: string) {

    document.querySelector('.localizar').style.display = 'block'
    document.querySelector('.loading').style.display = 'none'

    const jsonResult = JSON.parse(r)

    jsonResult.forEach(gleba => {
      let coordenadasLista = []
      const coordenadas = (gleba.coordenadas).split('/')
      coordenadas.forEach(coordenada => {
        const teste = coordenada.split(',')
        coordenadasLista.push(teste)
      })
      gleba.coordenadas = coordenadasLista
    })

    setData(jsonResult)

    dataa = jsonResult

    setTimeout(() => {
      glebaEventListener()
    }, "1000");
  }



  function generateForm() {
    const checkboxFields = document.querySelectorAll('.checkboxField')
    checkboxFields.forEach(checkbox => {
      const input = document.querySelector(`#${checkbox.name}`)
      if (checkbox.checked) {
        input.style.display = 'block'
      }
      else {
        input.style.display = 'none'
        input.value = ''
      }
    })
  }

  function changeCenter() {
    setCentro(data[0].coordenadas[0])
    setZoom(17)
  }

  function logout() {
    localStorage.clear()
    window.location.href = '/login'
  }

  function loadIconNotification() {
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
        if (result.message == "Envio de email permitido") {
          setTimeout(() => {
            document.querySelector("#notOn").style.display = 'block'
            document.querySelector("#notOff").style.display = 'none'

            emailLiberado = true
          }, "1000");
        }
        else {
          setTimeout(() => {
            document.querySelector("#notOn").style.display = 'none'
            document.querySelector("#notOff").style.display = 'block'

            emailLiberado = false
          }, "1000");
        }
      })
      .catch(error => console.log(error))
  }

  let emailLiberado = ''

  loadIconNotification()

  function emailNotification() {
    const notOnIcon = document.getElementById('notOn')
    const notOffIcon = document.getElementById('notOff')
    if (emailLiberado) {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const raw = JSON.stringify({
        "id_user": localStorage.getItem('user_id'),
        "id_termo": localStorage.getItem('id_termo'),
        "aceitacao_padrao": true,
        "aceitacao_email": false
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
          notOnIcon.style.display = 'none'
          notOffIcon.style.display = 'block'
          NotificationManager.success('Notificações desabilitadas');
          loadIconNotification()
        })
        .catch(error => {
          console.log(error)
          NotificationManager.error('Erro na requisição');
        })

    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

      const raw = JSON.stringify({
        "id_user": localStorage.getItem('user_id'),
        "id_termo": localStorage.getItem('id_termo'),
        "aceitacao_padrao": true,
        "aceitacao_email": true
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
          notOnIcon.style.display = 'block'
          notOffIcon.style.display = 'none'
          NotificationManager.success('Notificações habilitadas');
          loadIconNotification()
        })
        .catch(error => {
          console.log(error)
          NotificationManager.error('Erro na requisição');
        })

    }

  }

  function termo() {
    var requestOptions = {
      method: 'GET',
    };

    fetch("http://127.0.0.1:5000/termo_mais_recente", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        localStorage.setItem('id_termo', result.id)
      })
      .catch(error => { console.log('error', error) });
  }

  termo()

  // leaflet-interactive

  let listaa = []
  let datee = []

  function glebaEventListener() {
    const glebasIdentificadas = document.querySelectorAll('.leaflet-interactive')
    glebasIdentificadas.forEach(g => {
      g.addEventListener("click", function () {
        listaa = []
        datee = []
        const attrProcurado = g.getAttribute('d')
        let posicaoElemento = -1;

        for (var i = 0; i < glebasIdentificadas.length; i++) {
          var el = glebasIdentificadas[i];
          var nomeAtributo = el.getAttribute('d');

          if (nomeAtributo === attrProcurado) {
            posicaoElemento = i;
            break;
          }
        }
        const refbacen = dataa[posicaoElemento].ref_bacen // Retornando o array referente à gleba clicada

        console.log(refbacen)

        dataa.forEach(element => {
          if (element.ref_bacen == refbacen) {
            if(!datee.includes(element.date)){
              datee.push(element.date)
              listaa.push(element.previsao)
            }
          }
        });
        setListaaa(listaa)
        setDateee(datee)
      })
    })
    glebasIdentificadas.forEach(g => {
      g.addEventListener("focus", function () {
        document.querySelector('#grafico').style.display = 'block'
        document.querySelector('#textoGrafico').style.display = 'none'
      })
      g.addEventListener("blur", function () {
        document.querySelector('#grafico').style.display = 'none'
        document.querySelector('#textoGrafico').style.display = 'block'
      })
    })
  }

  if (localStorage.getItem('token')) {

    return (
      <div className="relative">
        <div onClick={emailNotification} className="fixed z-[1000] bg-white w-[50px] h-[50px] bottom-3 left-3 rounded-[25px] flex items-center shadow-lg flex-row overflow-hidden hover:w-[246px] emailAnimation cursor-pointer">
          <div className="svg min-w-[50px] h-[50px] flex justify-center items-center ">
            <svg id="notOn" className="hidden" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <svg id="notOff" className="text-[red] hidden" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
          </div>
          <p className="min-w-max">Notificações por e-mail</p>
        </div>
        <nav className="h-[50px] w-full absolute z-[500] flex justify-center items-center">
          <NotificationContainer />
          <div className="flex bg-white w-max p-[10px] text-[15px] rounded-[5px]">
            {/* <span className="pr-[8px] border-r-[2px] cursor-default">Filtros</span> */}
            <ul className="flex">
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Código</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_codigo" id="ch_codigo" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Início do plantio</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_inicio_do_plantio" id="ch_inicio_do_plantio" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Final do plantio</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_final_do_plantio" id="ch_final_do_plantio" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Início da colheita</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_inicio_da_colheita" id="ch_inicio_da_colheita" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Final da colheita</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_final_da_colheita" id="ch_final_da_colheita" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Grão</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_grao" id="ch_grao" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Produção</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_producao" id="ch_producao" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Irrigação</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_irrigacao" id="ch_irrigacao" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Solo</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_solo" id="ch_solo" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Clima</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_clima" id="ch_clima" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Cultivo</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_ciclo_do_cultivo" id="ch_ciclo_do_cultivo" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Identificador</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_identificador" id="ch_identificador" />
              </li>
              <li className="flex items-center pr-[8px] border-r-[2px]">
                <span className="ml-[8px] mr-[6px] cursor-default">Estado</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_estado" id="ch_estado" />
              </li>
              <li className="flex items-center">
                <span className="ml-[8px] mr-[6px] cursor-default">Município</span>
                <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_municipio" id="ch_municipio" />
              </li>
            </ul>
          </div>
          <div className="absolute right-2 h-[42px] w-[42px] bg-white rounded-[5px] flex items-center justify-center cursor-pointer" onClick={logout}><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div>
        </nav>
        <div className="absolute w-[500px] rounded-[5px] bg-white z-[900] right-2 bottom-6 flex justify-center items-center">
          {/* <p id="textoGrafico" className="text-center text-[#b5b5b5]">Clique em uma gleba para ver a série temporal</p> */}
          <MyChart minhaProp={listaaa} setMinhaProp={setListaaa} minhaLista={dateee} setMinhaLista={setDateee}/>
        </div>
        <div className="absolute bg-white w-[300px] h-max z-[404] mx-auto inset-0 top-[55px] rounded-[5px] shadow-2xl">
          <div className="m-[20px]">
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[3px]" placeholder="Código" type="text" name="" id="in_codigo" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[3px]" placeholder="Início do plantio" type="text" name="" id="in_inicio_do_plantio" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Final do plantio" type="text" name="" id="in_final_do_plantio" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Início da colheita" type="text" name="" id="in_inicio_da_colheita" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Final da colheita" type="text" name="" id="in_final_da_colheita" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Grão" type="text" name="" id="in_grao" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Produção" type="text" name="" id="in_producao" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Irrigação" type="text" name="" id="in_irrigacao" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Solo" type="text" name="" id="in_solo" />
            {/* <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Clima" type="text" name="" id="in_clima" /> */}
            <select className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" name="in_clima" id="in_clima">
              <option value="">Selecione um clima</option>
              <option value="Chuva excessiva">Chuva excessiva</option>
              <option value="Geada">Geada</option>
              <option value="Granizo">Granizo</option>
              <option value="Seca">Seca</option>
              <option value="Tromba de agua">Tromba de agua</option>
              <option value="Vendaval">Vendaval</option>
              <option value="Vento frio">Vento frio</option>
              <option value="Vento forte">Vento forte</option>
              <option value="Variacao excessiva de temperatura">Variacao excessiva de temperatura</option>
              <option value="Raio">Raio</option>
              <option value="Outros fenomenos naturais fortuitos">Outros fenomenos naturais fortuitos</option>
              <option value="Doenca ou praga">Doenca ou praga</option>
              <option value="Enchentes">Enchentes</option>
              <option value="Chuva na colheita">Chuva na colheita</option>
            </select>
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Cultivo" type="text" name="" id="in_ciclo_do_cultivo" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Identificador" type="text" name="" id="in_identificador" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Estado" type="text" name="" id="in_estado" />
            <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Município" type="text" name="" id="in_municipio" />
            <button className="bg-[#11145e] text-white w-full rounded-[5px] p-[3px] flex justify-center items-center h-[30px]" onClick={handleSearch}>
              <span className="localizar">Localizar</span>
              <span className="loading"></span>
            </button>
          </div>
        </div>

        <MapContainer key={centro.toString()} center={centro} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data ? (data.map((gleba) => (
            <div className="MarcusRocha">
              <Polygon key={gleba.coordenadas} pathOptions={{ color: 'blue' }} positions={gleba.coordenadas}>
                <Tooltip sticky>
                  <div className="flex flex-col text-left">
                    <table>
                      <tbody>
                        <tr>
                          <th>ref_bacen</th>
                          <td>{gleba.ref_bacen}</td>
                        </tr>
                        <tr>
                          <th>Início do plantio &nbsp;</th>
                          <td>{new Date(gleba.inicio_plantio).toLocaleDateString('pt-BR')}</td>
                        </tr>
                        <tr>
                          <th>Final do plantio &nbsp;</th>
                          <td>{new Date(gleba.final_plantio).toLocaleDateString('pt-BR')}</td>
                        </tr>
                        <tr>
                          <th>Início da colheita &nbsp;</th>
                          <td>{new Date(gleba.inicio_colheita).toLocaleDateString('pt-BR')}</td>
                        </tr>
                        <tr>
                          <th>Fim da colheita &nbsp;</th>
                          <td>{new Date(gleba.final_colheita).toLocaleDateString('pt-BR')}</td>
                        </tr>
                        <tr>
                          <th>Grão &nbsp;</th>
                          <td>{gleba.descricao_grao}</td>
                        </tr>
                        <tr>
                          <th>Produção &nbsp;</th>
                          <td>{gleba.descricao_producao}</td>
                        </tr>
                        <tr>
                          <th>Irrigação &nbsp;</th>
                          <td>{gleba.descricao_irrigacao}</td>
                        </tr>
                        <tr>
                          <th>Solo &nbsp;</th>
                          <td>{gleba.descricao_solo}</td>
                        </tr>
                        {/* <tr>
                      <th>Clima &nbsp;</th>
                      <td>{gleba.descricao_clima}</td>
                    </tr> */}
                        <tr>
                          <th>Evento climático &nbsp;</th>
                          <td>{gleba.descricao_evento}</td>
                        </tr>
                        <tr>
                          <th>Cultivar &nbsp;</th>
                          <td>{gleba.descricao_cultiva}</td>
                        </tr>
                        <tr>
                          <th>Identificador &nbsp;</th>
                          <td>{gleba.nu_identificador}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tooltip>
              </Polygon>
            </div>
          ))) : null}
        </MapContainer>
      </div>
    );
  }
  else {
    window.location.href = '/login'
  }
}
