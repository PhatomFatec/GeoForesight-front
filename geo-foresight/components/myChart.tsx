import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  } from 'chart.js';
  
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
  );

const MyChart = (props) => {
  const numeros = props.minhaProp;
  const datas = props.minhaLista;
  const indice = props.inlista;
  const data = {
    labels: datas,
    datasets: [
      {
        label: 'Índice',
        data: indice,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Predição',
        data: numeros,
        backgroundColor: 'rgb(53, 162, 235)',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Para o eixo X (rótulos)
      },
      y: {
        type: 'linear', // Para o eixo Y (valores numéricos)
      },
    },
  };
  

  console.log(datas)

  return (
    <div className='w-full m-[10px] hidden' id='grafico'>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyChart;
