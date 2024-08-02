import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts/highstock'; 
import HighchartsReact from 'highcharts-react-official';
import priceData from '../../assets/priceData.json';
import TabsComponent from '../Tabs';
import './styles.css'

const LineChart = () => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
  const [activeTab, setActiveTab] = useState('Chart');

  useEffect(() => {
    if (priceData.length > 0) {
      const latestPrice = priceData[priceData.length - 1][1];
      const firstPrice = priceData[0][1];
      const changeValue = latestPrice - firstPrice;
      const changePercentage = (changeValue / firstPrice) * 100;
      setCurrentPrice(latestPrice);
      setPriceChange({ value: changeValue, percentage: changePercentage });
    }
  }, []);

  const options = {  currency: 'USD' };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  const configPrice = {
    chart: {
      height: 400,
      
    },
    title: {
      text: '',
    },
    xAxis: {
      type: 'datetime',
      labels: {
       enabled: false
        
      },
      title: {
        text: null,
      },
      
    },
    yAxis: {
      labels: {
        formatter: function () {
          return numberFormat.format(this.value);
        },
        style: {
          color: '#000',
        },
      },
    },
    tooltip: {
      shared: false,
      formatter: function () {
        return (
          numberFormat.format(this.y, 0)  
        );
      },
      backgroundColor: '#4B40EE',
      style:{
        color: '#fff'
      }
    },
    plotOptions: {
      series: {
        showInNavigator: false,
        gapSize: 6,
      },
    },
    rangeSelector: {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d',
        },
        {
          type: 'day',
          count: 3,
          text: '3d',
        },
        {
          type: 'week',
          count: 1,
          text: '1w',
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
            type: 'month',
            count: 6,
            text: '1m',
          },
          {
            type: 'year',
            count: 1,
            text: '1y',
          },
        {
          type: 'all',
          text: 'max',
        },
      ],
      selected: 1, 
      inputEnabled: false,
       buttonPosition: {
      align: 'right',
      x: 0,
    },
    labelStyle: {
      display: 'none', 
    },
    buttonTheme: {
      states: {
        hover: {
          fill: '#4B40EE',
          style: {
            color: '#FFFFFF', 
          },
        },
        select: {
          fill: '#4B40EE', 
          style: {
            color: '#FFFFFF', 
          },
        },
      },
    },
    },
    navigator: {
      enabled: false, 
      
    },
    series: [
      {
        name: 'Price',
        type: 'line',
        data: priceData.map(point => [point[0], point[1]]),
        tooltip: {
          valueDecimals: 2,
        },
        color: '#4B40EE',
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='title'>
          {numberFormat.format(currentPrice)}<sup style={{color: '#c1c2c3', fontSize: '20px', fontWeight: '400', marginLeft: '5px'}}>USD</sup>
        </div>
        <div>

        </div>

        <div style={{ color: priceChange.value >= 0 ? 'green' : 'red'}} className='price'>
          {priceChange.value >= 0 ? '+' : ''}
          {numberFormat.format(priceChange.value)} ({priceChange.percentage.toFixed(2)}%)
        </div>
      </div>

      <div>
  <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab}/>
</div>
{activeTab === 'Summary' && <HighchartsReact highcharts={Highcharts} constructorType={"chart"} options={configPrice} />}
{activeTab === 'Chart' && <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={configPrice} />}
{activeTab === 'Statistics' && <HighchartsReact highcharts={Highcharts} constructorType={"chart"} options={configPrice} />}
{activeTab === 'Analiysis' && <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={configPrice} />}
{activeTab === 'Settings' && <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={configPrice} />}

    </div>
  );
};

export default LineChart;
