import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import InputPanel from './components/Inputs';
import ForecastCard from './components/ForecastCard';
import { Col, Layout, Image, Divider, Row, Skeleton, Alert } from 'antd';

type FORECAST = {
  number: number,
  name: string,
  startTime: string,
  endTime: string,
  isDaytime: boolean,
  temperature: number,
  temperatureUnit: string,
  temperatureTrend: string | null | any,
  windSpeed: string,
  windDirection: string,
  icon: string,
  shortForecast: string,
  detailedForecast: string,
}

type ADDRESS = {
  zip?: string,
  streetName?: string,
  preType?: string,
  city?: string,
  preDirection?: string,
  suffixDirection?: string,
  fromAddress?: string,
  state?: string,
  suffixType?: string,
  toAddress?: string,
  suffixQualifier?: string,
  preQualifier?: string,
}

const { Header, Footer, Content } = Layout;

function App() {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [address, setAddress] = useState({})
  const [seeWrongDir, setSeeWrongDir] = useState(false);

  const getData = (zip: string, address: string, siUnits: boolean) => {
    setLoading(true);
    axios({
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      },
      url: 'http://localhost:3333/forecast/',
      params: { zip, address, units: siUnits ? 'si' : 'us' }
    }).then(res => {
      setAddress(res.data.address)
      setForecast(res.data.forecast.periods)
      setLoading(false);
    }).catch(err => {
      setSeeWrongDir(true);
      setLoading(false);
    })
    
  }

  return (
    <Layout>
      <Header
        style={{
          background: 'linear-gradient(90deg,#ffc600 0,#fd6e6a 50%,#ffc600)',
          display: 'inline'
        }}
      >
        <Image
          alt='Logo'
          width="20%"
          height={50}
          preview={false}
          src={require('./Images/logo-light-no-tagline.webp')}
        />
        <Divider type='vertical' style={{ height: 50, borderWidth: 5 }} />
        Forecast Aplication
      </Header>
      <Layout style={{ minHeight: 550 }} >
        <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 550 }}>
          <Skeleton active loading={loading} >
            {seeWrongDir ? (
              <Alert
                closable
                showIcon
                type='warning'
                message="Warning"
                description="Direction not found, Verify the entered direction."
                onClose={() => setSeeWrongDir(false)}
              />
            ) : null}
            <Row align='middle' justify='space-around' >
              {(address as ADDRESS).streetName ? 
                (address as ADDRESS).streetName + ', ' + (address as ADDRESS).city + ', ' + (address as ADDRESS).state
              : null} 
            </Row>
            <Row align='middle' justify='space-around' >
              <InputPanel setData={getData} />
              <Col
                span={15}
                style={{ width: '100%', overflowX: 'auto', flexFlow: 'row', display: 'flex' }}
              >
                {forecast.map((value: FORECAST, index) => (
                  <ForecastCard
                    key={index}
                    name={value.name}
                    temp={value.temperature}
                    units={value.temperatureUnit}
                    desc={value.shortForecast}
                    image={value.icon}
                  />
                ))}
              </Col>
            </Row>
          </Skeleton>
        </Content>
      </Layout>
      <Footer
        style={{ background: 'linear-gradient(102deg,#00446a,#002235)', textAlign: 'center', color: 'white' }}
      >
        Powered by Rodolfo Cabello
        <Divider type='vertical' style={{ height: 50, borderWidth: 8, background: 'gray' }} />
        Distillery
      </Footer>
    </Layout>
  );
}

export default App;
