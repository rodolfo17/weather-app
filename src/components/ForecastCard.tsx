import React from 'react';
import { Card, Image } from 'antd';

const { Meta } = Card;

const ForecastCard = (props: {
  temp: number
  name: string
  units: string
  desc: string
  image: string
}) => {
  const temp = props.temp + 'º' + props.units

  return (
    <Card
      style={{
        width: 250,
        margin: '20px 30px 20px',
        alignItems: 'center',
        background: '#DDDDDD'
      }}
      cover={
        <Image
          width={250}
          height={150}
          alt='weather icon'
          preview={false}
          src={props.image}
        />
      }
    >
      <Meta
        style={{ width: '100%' }}
        title={props.name + ' ' + temp}
        description={props.desc}
      />
    </Card>
  )
}

export default ForecastCard;
