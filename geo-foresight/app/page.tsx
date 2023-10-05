'use client'

import "leaflet/dist/leaflet.css"

import {MapContainer, TileLayer, Rectangle} from "react-leaflet"
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
    [51.49, -0.08],
    [51.5, -0.06],
  ]

  return (
   <div>
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

<Rectangle bounds={rectangle} pathOptions={{ color: 'black' }}>
      
    </Rectangle>
    </MapContainer>
   </div>
  );
}
