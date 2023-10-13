'use client'

import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Rectangle, Tooltip, Polygon } from "react-leaflet"
import { useState, useEffect } from "react";

export default function Home() {

  let mock = [
    {
      "ref_bacen": 5555555,
      "nu_ponto": 1,
      "coordenadas": "-26.70581,-52.672342/-26.704525,-52.671505/-26.703145,-52.669939/-26.705656,-52.673651/-26.704008,-52.672557/-26.703663,-52.673801/-26.704046,-52.672406/-26.702628,-52.669789/-26.703145,-52.672964/-26.704947,-52.673544/-26.702455,-52.671806/-26.706251,-52.673179",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo",
      "solo": "terra",
      "clima": "quente",
      "ciclo_cultivo": "ciclo",
      "estado": "SP"
    },
    {
      "ref_bacen": 1111111,
      "nu_ponto": 2,
      "coordenadas": "-26.712394,-52.673286/-26.714378,-52.669402/-26.711541,-52.672514/-26.712145,-52.670207/-26.711666,-52.672406/-26.712988,-52.671226/-26.713256,-52.669306/-26.711483,-52.672696/-26.712212,-52.673651/-26.712384,-52.674155/-26.714751,-52.669145/-26.714004,-52.675131/-26.713036,-52.675217/-26.714694,-52.675711/-26.713592,-52.675121/-26.712662,-52.673715/-26.714589,-52.675818/-26.714454,-52.668941/-26.712499,-52.67172",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo",
      "solo": "terra",
      "clima": "quente",
      "ciclo_cultivo": "ciclo",
      "estado": "MG"
    },
    {
      "ref_bacen": 2222222,
      "nu_ponto": 3,
      "coordenadas": "-26.714359,-52.671585/-26.71492,-52.67084/-26.714996,-52.670963/-26.715289,-52.669815/-26.713286,-52.671886/-26.715198,-52.669408/-26.715499,-52.669831/-26.715634,-52.670067/-26.713923,-52.670743/-26.713511,-52.673769/-26.712969,-52.672809/-26.71342,-52.672927/-26.712989,-52.67253/-26.714038,-52.672015/-26.715327,-52.669585/-26.713008,-52.673002/-26.713621,-52.672562",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo",
      "solo": "terra",
      "clima": "quente",
      "ciclo_cultivo": "ciclo",
      "estado": "BH"
    },
    {
      "ref_bacen": 3333333,
      "nu_ponto": 4,
      "coordenadas": "-26.715313,-52.677014/-26.717239,-52.672691/-26.715504,-52.673452/-26.71605,-52.672927/-26.715054,-52.673967/-26.715303,-52.676049/-26.714594,-52.674901/-26.714268,-52.677014/-26.713923,-52.676221/-26.718638,-52.677122/-26.716616,-52.675974/-26.717737,-52.673774/-26.715907,-52.67283/-26.716319,-52.673334/-26.715226,-52.673721/-26.715265,-52.675759/-26.717402,-52.672809/-26.7149,-52.674611/-26.715198,-52.676178/-26.717986,-52.677969",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo",
      "solo": "terra",
      "clima": "quente",
      "ciclo_cultivo": "ciclo",
      "estado": "SC"
    },
    {
      "ref_bacen": 4444444,
      "nu_ponto": 5,
      "coordenadas": "-26.71801,-52.677953/-26.714804,-52.677819/-26.717114,-52.678259/-26.716635,-52.675942/-26.715235,-52.678763",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo",
      "solo": "terra",
      "clima": "quente",
      "ciclo_cultivo": "ciclo",
      "estado": "RS"
    }
  ]

  mock.forEach(gleba => {
    let coordenadasLista = []
    const coordenadas = (gleba.coordenadas).split('/')
    coordenadas.forEach(coordenada => {
      const teste = coordenada.split(',')
      coordenadasLista.push(teste)
    })
    gleba.coordenadas = coordenadasLista
  })


  let resultJSON
  const [data, setData] = useState(null);
  const [centro, setCentro] = useState([-23.0666038, -45.7199816])
  const [zoom, setZoom] = useState(6)

  function handleSearch() {

    let resultado

    const fields = {
      ref_bacen: (document.querySelector('#in_codigo').value == '') ? 'NULL' : document.querySelector('#in_codigo').value,
      inicio_plantio: (document.querySelector('#in_inicio_do_plantio').value == '') ? 'NULL' : document.querySelector('#in_inicio_do_plantio').value,
      final_plantio: (document.querySelector('#in_final_do_plantio').value == '') ? 'NULL' : document.querySelector('#in_final_do_plantio').value,
      inicio_colheita: (document.querySelector('#in_inicio_da_colheita').value == '') ? 'NULL' : document.querySelector('#in_inicio_da_colheita').value,
      final_colheita: (document.querySelector('#in_final_da_colheita').value == '') ? 'NULL' : document.querySelector('#in_final_da_colheita').value,
      grao: (document.querySelector('#in_grao').value == '') ? 'NULL' : document.querySelector('#in_grao').value,
      producao: (document.querySelector('#in_producao').value == '') ? 'NULL' : document.querySelector('#in_producao').value,
      irrigacao: (document.querySelector('#in_irrigacao').value == '') ? 'NULL' : document.querySelector('#in_irrigacao').value,
      solo: (document.querySelector('#in_solo').value == '') ? 'NULL' : document.querySelector('#in_solo').value,
      clima: (document.querySelector('#in_clima').value == '') ? 'NULL' : document.querySelector('#in_clima').value,
      ciclo_do_cultivo: (document.querySelector('#in_ciclo_do_cultivo').value == '') ? 'NULL' : document.querySelector('#in_ciclo_do_cultivo').value,
      estado: (document.querySelector('#in_estado').value == '') ? 'NULL' : document.querySelector('#in_estado').value,
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ref_bacen": fields.ref_bacen,
      "inicio_plantio": fields.inicio_plantio,
      "final_plantio": fields.final_plantio,
      "inicio_colheita": fields.inicio_colheita,
      "final_colheita": fields.final_colheita,
      "descricao_grao": fields.grao,
      "descricao_producao": fields.producao,
      "descricao_irrigacao": fields.irrigacao,
      "descricao_solo": fields.solo,
      "descricao_clima": fields.clima,
      "descricao_ciclo": fields.ciclo_do_cultivo,
      "estado": fields.estado,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // fetch("http://127.0.0.1:5000/consulta_dinamica/", requestOptions)
    //   .then(response => response.text())
    //   .then(result => grava(result))
    //   .catch(error => console.log('error', error));

    console.log(raw)

  }

  function grava(r: string) {
    const jsonResult = JSON.parse(r)
    setData(jsonResult)
  }

  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
      [51.53, -0.12],
    ]
  ]

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
    setCentro(mock[0].coordenadas[0])
    setZoom(15)
  }

  return (
    <div className="relative">
      <nav className="h-[50px] w-full bg-[#10135E] flex justify-center items-center">
        <div className="flex bg-white w-max p-[10px] text-[15px] rounded-[5px]">
          <span className="pr-[8px] border-r-[2px] cursor-default">Filtros</span>
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
              <span className="ml-[8px] mr-[6px] cursor-default">Ciclo do cultivo</span>
              <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_ciclo_do_cultivo" id="ch_ciclo_do_cultivo" />
            </li>
            <li className="flex items-center">
              <span className="ml-[8px] mr-[6px] cursor-default">Estado</span>
              <input onChange={generateForm} className="checkboxField cursor-pointer" type="checkbox" name="in_estado" id="ch_estado" />
            </li>
          </ul>
        </div>
      </nav>
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
          <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Clima" type="text" name="" id="in_clima" />
          <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Ciclo do cultivo" type="text" name="" id="in_ciclo_do_cultivo" />
          <input className="hidden w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Estado" type="text" name="" id="in_estado" />
          <button className="bg-[#11145e] text-white w-full rounded-[5px] p-[3px]" onClick={changeCenter}>Localizar</button>
        </div>
      </div>

      {/* <MapContainer center={mock[0].coordenadas[0]} zoom={15}> */}
      <MapContainer key={centro.toString()} center={centro} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mock ? (mock.map((gleba) => (
          <Polygon key={gleba.coordenadas} pathOptions={{ color: 'red' }} positions={gleba.coordenadas}>
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
                      <td>{gleba.inicio_plantio}</td>
                    </tr>
                    <tr>
                      <th>Final do plantio &nbsp;</th>
                      <td>{gleba.final_plantio}</td>
                    </tr>
                    <tr>
                      <th>Início da colheita &nbsp;</th>
                      <td>{gleba.inicio_colheita}</td>
                    </tr>
                    <tr>
                      <th>Fim da colheita &nbsp;</th>
                      <td>{gleba.final_colheita}</td>
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
                      <td>{gleba.solo}</td>
                    </tr>
                    <tr>
                      <th>Clima &nbsp;</th>
                      <td>{gleba.clima}</td>
                    </tr>
                    <tr>
                      <th>Ciclo do cultivo &nbsp;</th>
                      <td>{gleba.ciclo_cultivo}</td>
                    </tr>
                    <tr>
                      <th>Estado &nbsp;</th>
                      <td>{gleba.estado}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tooltip>
          </Polygon>
        ))) : null}


      </MapContainer>
    </div>
  );
}
