import React, { useState } from 'react';
import { CloudOutlined } from '@ant-design/icons';
import { Col, Row, Button, Switch, Input, InputNumber, Select } from 'antd';

const InputPanel = (props: { setData: Function }) => {
  const [zip, setZip] = useState('')
  const [address, setAddress] = useState('')
  const [siUnits, setSiUnits] = useState(true)
  const [numberD, setNumberD] = useState(null)

  return (
    <Col span={6} style={{ height: '100%', marginTop: 10 }}>
      <Row align='middle' justify='center' style={{ margin: '20px 0px 0px', width: '100%' }} >
        <Col span={20} >
          Units
        </Col>
      </Row>
      <Row align='middle' justify='center' style={{ margin: '0px 0px 0px', width: '100%' }} >
        <Col span={20} >
          <Switch
            data-testid='unitsId'
            checkedChildren='SI'
            unCheckedChildren='US'
            checked={siUnits}
            onChange={val => setSiUnits(val)}
          />
        </Col>
      </Row>
      <Row align='middle' justify='center' style={{ margin: '30px 0px 20px' }} >
        <Col span={20} >
          Address
          <Input
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Col>
      </Row>
      <Row align='middle' justify='center' style={{ margin: '30px 0px 20px' }} >
        <Col span={20} >
          ZIP Code
          <InputNumber
            stringMode
            value={zip}
            onChange={code => setZip(code)}
            placeholder='ZIP'
            maxLength={5}
            minLength={4}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Row align='middle' justify='center' style={{ margin: '30px 0px 20px' }} >
        <Col span={20}>
          Number of days
          <Select
            style={{ width: '80%' }}
            value={numberD}
            onChange={val => setNumberD(val)}
            placeholder="Select a number of days"
          >
            {[1,2,3,4,5,6,7].map(val => (
              <Select.Option key={val} value={val}>{val}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row align='middle' justify='center' style={{ margin: '30px 0px 20px' }} >
        <Button
          type='primary'
          disabled={!zip || !address}
          icon={<CloudOutlined />}
          onClick={e => {
            e.preventDefault()
            props.setData(zip, address, siUnits, numberD)
          }}
        >
          Get forecast
        </Button>
      </Row>
    </Col>
  )
}

export default InputPanel;
