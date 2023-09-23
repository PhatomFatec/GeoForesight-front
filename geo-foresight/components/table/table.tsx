'use client'

import React from 'react'

const Table = ({ data }) => {
    if (!data) {
        return <div>Aguardando dados...</div>;
      }

      console.log(data)
    
      // Renderize sua tabela com base nos dados recebidos
      return (
        <table>
          <thead>
            <tr>
              <th>Coluna 1</th>
              <th>Coluna 2</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.coluna1}</td>
                <td>{item.coluna2}</td>
                {/* Adicione mais colunas conforme necessário */}
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default Table