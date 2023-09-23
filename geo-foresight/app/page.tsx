'use client'

import { useState } from "react";

export default function Home() {

  let resultJSON
  const [data, setData] = useState([]);

  function handleSearch() {

    const fields = {
      ref_bacen: (document.querySelector('.ref_bacen').value == '') ? 'NULL' : document.querySelector('.ref_bacen').value,
      nu_ordem: (document.querySelector('.nu_ordem').value == '') ? 'NULL' : document.querySelector('.nu_ordem').value,
      coordenadas: (document.querySelector('.coordenadas').value == '') ? 'NULL' : document.querySelector('.coordenadas').value,
      altitude: (document.querySelector('.ref_bacen').value == '') ? 'NULL' : document.querySelector('.ref_bacen').value,
      inicio_plantio: (document.querySelector('.inicio_plantio').value == '') ? 'NULL' : document.querySelector('.inicio_plantio').value,
      final_plantio: (document.querySelector('.final_plantio').value == '') ? 'NULL' : document.querySelector('.final_plantio').value,
      inicio_colheita: (document.querySelector('.inicio_colheita').value == '') ? 'NULL' : document.querySelector('.inicio_colheita').value,
      final_colheita: (document.querySelector('.final_colheita').value == '') ? 'NULL' : document.querySelector('.final_colheita').value,
      descricao_grao: (document.querySelector('.descricao_grao').value == '') ? 'NULL' : document.querySelector('.descricao_grao').value,
      descricao_producao: (document.querySelector('.descricao_producao').value == '') ? 'NULL' : document.querySelector('.descricao_producao').value,
      descricao_irrigacao: (document.querySelector('.descricao_irrigacao').value == '') ? 'NULL' : document.querySelector('.descricao_irrigacao').value,
      data_liberacao: (document.querySelector('.data_liberacao').value == '') ? 'NULL' : document.querySelector('.data_liberacao').value,
      data_vencimento: (document.querySelector('.data_vencimento').value == '') ? 'NULL' : document.querySelector('.data_vencimento').value,
      descricao_ciclo: (document.querySelector('.descricao_ciclo').value == '') ? 'NULL' : document.querySelector('.descricao_ciclo').value
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
      "descricao_ciclo": fields.descricao_ciclo,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080", requestOptions)
      .then(response => setData(response))
      .catch(error => console.log('error', error));

  }

  return (
    <div className="flex">
      <div className='bg-[#D9D9D9] m-7 w-max flex flex-col py-2 rounded-md items-center justify-between'>
        <div className="flex flex-col">
          <p className='mr-5 ml-5'>Código da Gleba</p>
          <input field-name="ref_bacen" className='ref_bacen rounded-md outline-none p-1 mr-5 mx-5' type="text" />
          <p className='mr-5 ml-5'>Ordem</p>
          <input field-name="nu_ordem" className='nu_ordem rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Coordenadas</p>
          <input field-name="coordenadas" className='coordenadas rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Altitude</p>
          <input field-name="altitude" className='altitude rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Início do plantio</p>
          <input field-name="inicio_plantio" className='inicio_plantio rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Final do plantio</p>
          <input field-name="final_plantio" className='final_plantio rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Início da colheita</p>
          <input field-name="inicio_colheita" className='inicio_colheita rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Fim da colheita</p>
          <input field-name="final_colheita" className='final_colheita rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Grão</p>
          <input field-name="descricao_grao" className='descricao_grao rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Produção</p>
          <input field-name="descricao_producao" className='descricao_producao rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Irrigação</p>
          <input field-name="descricao_irrigacao" className='descricao_irrigacao rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Data Liberação</p>
          <input field-name="data_liberacao" className='data_liberacao rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Data Vencimento</p>
          <input field-name="data_vencimento" className='data_vencimento rounded-md outline-none p-1 mx-5' type="text" />
          <p className='mr-5 ml-5'>Ciclo</p>
          <input field-name="descricao_ciclo" className='descricao_ciclo rounded-md outline-none p-1 mx-5' type="text" />
        </div>
        <button className='bg-[#376CB9] text-white h-15 mt-4 mb-2 w-36 rounded-md mr-5' onClick={handleSearch}>Localizar</button>
      </div>
      <table className="my-7">
        <tr className="bg-white h-2">
          <th>ref_bacen</th>
          <th>nu_ordem</th>
          <th>coordenadas</th>
          <th>altitude</th>
          <th>inicio_plantio</th>
          <th>final_plantio</th>
          <th>inicio_colheita</th>
          <th>final_colheita</th>
          <th>descricao_grao</th>
          <th>descricao_producao</th>
          <th>descricao_irrigacao</th>
          <th>data_liberacao</th>
          <th>data_vencimento</th>
          <th>descricao_ciclo</th>
        </tr>
        <tr className="h-2 bg-white">
          <td>{data}</td>
          <td>aaa</td>
          <td>aaa</td>
          <td>aaa</td>
        </tr>
        <tr></tr>
      </table>
    </div>
  );
}
