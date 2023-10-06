'use client'

import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Rectangle, Tooltip, Polygon } from "react-leaflet"
import { useState } from "react";

export default function Home() {

  let resultJSON
  const [data, setData] = useState();

  function handleSearch() {

    let resultado

    const fields = {
      ref_bacen: (document.querySelector('.ref_bacen').value == '') ? 'NULL' : document.querySelector('.ref_bacen').value,
      nu_ordem: (document.querySelector('.nu_ordem').value == '') ? 'NULL' : document.querySelector('.nu_ordem').value,
      coordenadas: (document.querySelector('.coordenadas').value == '') ? 'NULL' : document.querySelector('.coordenadas').value,
      altitude: (document.querySelector('.altitude').value == '') ? 'NULL' : document.querySelector('.altitude').value,
      inicio_plantio: (document.querySelector('.inicio_plantio').value == '') ? 'NULL' : document.querySelector('.inicio_plantio').value,
      final_plantio: (document.querySelector('.final_plantio').value == '') ? 'NULL' : document.querySelector('.final_plantio').value,
      inicio_colheita: (document.querySelector('.inicio_colheita').value == '') ? 'NULL' : document.querySelector('.inicio_colheita').value,
      final_colheita: (document.querySelector('.final_colheita').value == '') ? 'NULL' : document.querySelector('.final_colheita').value,
      descricao_grao: (document.querySelector('.descricao_grao').value == '') ? 'NULL' : document.querySelector('.descricao_grao').value,
      descricao_producao: (document.querySelector('.descricao_producao').value == '') ? 'NULL' : document.querySelector('.descricao_producao').value,
      descricao_irrigacao: (document.querySelector('.descricao_irrigacao').value == '') ? 'NULL' : document.querySelector('.descricao_irrigacao').value,
      data_liberacao: (document.querySelector('.data_liberacao').value == '') ? 'NULL' : document.querySelector('.data_liberacao').value,
      data_vencimento: (document.querySelector('.data_vencimento').value == '') ? 'NULL' : document.querySelector('.data_vencimento').value,
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "ref_bacen": fields.ref_bacen,
      "nu_ordem": fields.nu_ordem,
      "coordenadas": fields.coordenadas,
      "altitude": fields.altitude,
      "inicio_plantio": fields.inicio_plantio,
      "final_plantio": fields.final_plantio,
      "inicio_colheita": fields.inicio_colheita,
      "final_colheita": fields.final_colheita,
      "descricao_grao": fields.descricao_grao,
      "descricao_producao": fields.descricao_producao,
      "descricao_irrigacao": fields.descricao_irrigacao,
      "data_liberacao": fields.data_liberacao,
      "data_vencimento": fields.data_vencimento,
      "descricao_ciclo": 'null',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/consulta_dinamica/", requestOptions)
      .then(response => response.text())
      .then(result => grava(result))
      .catch(error => console.log('error', error));


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
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ]

  return (
    <div className="relative">
      <nav className="h-[50px] w-full bg-[#10135E] flex justify-center items-center">
        <div className="flex bg-white w-max p-[10px] text-[15px] rounded-[5px]">
          <span className="pr-[8px] border-r-[2px] cursor-default">Filtros</span>
          <ul className="flex">
            <li className="flex items-center pr-[8px] border-r-[2px]">
              <span className="ml-[8px] mr-[6px] cursor-default">Código</span>
              <input className="cursor-pointer" type="checkbox" name="" id="" />
            </li>
            <li className="flex items-center pr-[8px] border-r-[2px]">
              <span className="ml-[8px] mr-[6px] cursor-default">Início da colheita</span>
              <input className="cursor-pointer" type="checkbox" name="" id="" />
            </li>
            <li className="flex items-center">
              <span className="ml-[8px] mr-[6px] cursor-default">Fim da colheita</span>
              <input className="cursor-pointer" type="checkbox" name="" id="" />
            </li>
          </ul>
        </div>
      </nav>
      <div className="absolute bg-white w-[300px] h-max z-[404] mx-auto inset-0 top-[55px] rounded-[5px] shadow-2xl">
        <div className="m-[20px]">
          <input className="w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[3px]" placeholder="Código" type="text" name="" id="" />
          <input className="w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[3px]" placeholder="Início da colheita" type="text" name="" id="" />
          <input className="w-full focus:outline-none border-b-[2px] focus:border-[#11145e] mb-[8px]" placeholder="Fim da colheita" type="text" name="" id="" />
          <button className="bg-[#11145e] text-white w-full rounded-[5px] p-[3px]">Localizar</button>
        </div>
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon}>
          <Tooltip sticky>
            <div className="flex flex-col text-left">
              <table>
                <tr>
                  <th>Código</th>
                  <td>197358</td>
                </tr>
                <tr>
                  <th>Início da colheita &nbsp;</th>
                  <td>03/02/2024</td>
                </tr>
              </table>
            </div>
          </Tooltip>
        </Polygon>
      </MapContainer>
    </div>
  );
}
