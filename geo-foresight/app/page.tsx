'use client'

import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Rectangle, Tooltip, Polygon } from "react-leaflet"
import { useState } from "react";

export default function Home() {

  let lista = []
  let glebas = []

  const mock = [
    {
      "ref_bacen": 10046272,
      "nu_ponto": 1,
      "coordenadas": "-26.70581,-52.672342/-26.704525,-52.671505/-26.703145,-52.669939/-26.705656,-52.673651/-26.704008,-52.672557/-26.703663,-52.673801/-26.704046,-52.672406/-26.702628,-52.669789/-26.703145,-52.672964/-26.704947,-52.673544/-26.702455,-52.671806/-26.706251,-52.673179",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo"
    },
    {
      "ref_bacen": 10046272,
      "nu_ponto": 2,
      "coordenadas": "-26.712394,-52.673286/-26.714378,-52.669402/-26.711541,-52.672514/-26.712145,-52.670207/-26.711666,-52.672406/-26.712988,-52.671226/-26.713256,-52.669306/-26.711483,-52.672696/-26.712212,-52.673651/-26.712384,-52.674155/-26.714751,-52.669145/-26.714004,-52.675131/-26.713036,-52.675217/-26.714694,-52.675711/-26.713592,-52.675121/-26.712662,-52.673715/-26.714589,-52.675818/-26.714454,-52.668941/-26.712499,-52.67172",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo"
    },
    {
      "ref_bacen": 10046272,
      "nu_ponto": 3,
      "coordenadas": "-26.714359,-52.671585/-26.71492,-52.67084/-26.714996,-52.670963/-26.715289,-52.669815/-26.713286,-52.671886/-26.715198,-52.669408/-26.715499,-52.669831/-26.715634,-52.670067/-26.713923,-52.670743/-26.713511,-52.673769/-26.712969,-52.672809/-26.71342,-52.672927/-26.712989,-52.67253/-26.714038,-52.672015/-26.715327,-52.669585/-26.713008,-52.673002/-26.713621,-52.672562",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo"
    },
    {
      "ref_bacen": 10046272,
      "nu_ponto": 4,
      "coordenadas": "-26.715313,-52.677014/-26.717239,-52.672691/-26.715504,-52.673452/-26.71605,-52.672927/-26.715054,-52.673967/-26.715303,-52.676049/-26.714594,-52.674901/-26.714268,-52.677014/-26.713923,-52.676221/-26.718638,-52.677122/-26.716616,-52.675974/-26.717737,-52.673774/-26.715907,-52.67283/-26.716319,-52.673334/-26.715226,-52.673721/-26.715265,-52.675759/-26.717402,-52.672809/-26.7149,-52.674611/-26.715198,-52.676178/-26.717986,-52.677969",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo"
    },
    {
      "ref_bacen": 10046272,
      "nu_ponto": 5,
      "coordenadas": "-26.71801,-52.677953/-26.714804,-52.677819/-26.717114,-52.678259/-26.716635,-52.675942/-26.715235,-52.678763",
      "inicio_plantio": "2017-01-06",
      "final_plantio": "2017-06-30",
      "data_vencimento": "2018-15-01",
      "inicio_colheita": "2017-01-11",
      "final_colheita": "2017-30-11",
      "descricao_irrigacao": "Não Irrigado",
      "descricao_producao": "Anual",
      "descricao_grao": "Grão/Consumo"
    }
  ]

  mock.forEach(info => {
    glebas.push(info.coordenadas)
  })

  const mockData = "-27.581945,-52.911433/-27.581453,-52.910541/-27.581244,-52.911188/-27.581249,-52.911945/-27.582079,-52.912399"
  const mockData2 = "-27.584834,-52.908943/-27.584613,-52.909261/-27.584557,-52.909637/-27.582901,-52.912305/-27.584384,-52.911806/-27.585235,-52.909157/-27.583418,-52.90842/-27.582591,-52.908813/-27.584006,-52.912067/-27.582943,-52.908826/-27.584919,-52.909941/-27.583935,-52.909929/-27.583408,-52.908948/-27.583924,-52.908877/-27.582262,-52.912351/-27.58371,-52.909816/-27.582098,-52.911536/-27.583929,-52.910071/-27.584271,-52.908681/-27.585124,-52.910861/-27.585003,-52.910562/-27.583521,-52.908378/-27.584255,-52.909124/-27.584976,-52.910988/-27.584456,-52.908731/-27.582528,-52.910404/-27.583159,-52.90953/-27.583126,-52.91019/-27.584657,-52.909195/-27.58421,-52.911989/-27.584653,-52.911458/-27.584441,-52.909505/-27.583013,-52.908247/-27.582719,-52.908773"
  const mockData3 = "-27.580697,-52.909224/-27.580792,-52.911511/-27.579541,-52.91047/-27.579716,-52.910516/-27.578925,-52.910103/-27.579566,-52.910906/-27.579062,-52.911529/-27.580401,-52.910063/-27.581186,-52.909229/-27.578566,-52.911579/-27.578688,-52.909626/-27.580446,-52.910436/-27.58126,-52.910425/-27.581034,-52.91145/-27.579597,-52.911458/-27.578755,-52.91126/-27.579081,-52.910396/-27.579792,-52.910643/-27.578985,-52.909786/-27.579234,-52.910502/-27.580869,-52.909999/-27.580571,-52.909803/-27.57921,-52.911041/-27.579662,-52.911565/-27.578929,-52.909971/-27.581412,-52.909909/-27.578905,-52.909716/-27.581386,-52.910404/-27.580277,-52.911396/-27.581381,-52.909671/-27.579693,-52.911134"

  // const glebas = [mockData, mockData2, mockData3]

  console.log(glebas)

  

  glebas.forEach(gleba => {
    const listaPontos = gleba.split('/')
    const teste = []
    listaPontos.forEach(ponto => {
      const coord = ponto.split(',');

      teste.push(coord)
    });
    lista.push(teste);
  })

  console.log(lista)

  let resultJSON
  const [data, setData] = useState(null);

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

  const rectangle = [
    [51.49, -1.08],
    [51.5, -0.06],
  ]

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
          <button className="bg-[#11145e] text-white w-full rounded-[5px] p-[3px]" onClick={handleSearch}>Localizar</button>
        </div>
      </div>

      <MapContainer center={[-27.581249, -52.911945]} zoom={17}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {lista.map((a) => (
          <Polygon pathOptions={{ color: 'red' }} positions={a}>
            <Tooltip sticky>
              <div className="flex flex-col text-left">
                <table>
                  <tbody>
                    <tr>
                      <th>Código</th>
                      <td>{data}</td>
                    </tr>
                    <tr>
                      <th>Início da colheita &nbsp;</th>
                      <td>03/02/2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tooltip>
          </Polygon>
        ))}


      </MapContainer>
    </div>
  );
}
