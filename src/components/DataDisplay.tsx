import { List } from 'antd'
import React from 'react'
import DataSourceDataItem from './DataSourceDataItem'

const data = [
  {
    key: '1',
    name: 'John',
    fileIds: 'vcbnncvdf65',
    data: {
      street: '10 Downing Street',
      city: 'London'
    }
  },
  {
    key: '2',
    name: 'John',
    fileIds: 'dasdg4232fsd',
    data: {
      street: '10 Downing Street',
      city: 'London',
      adress: 'abc'
    }
  },
  {
    key: '2',
    name: 'John',
    fileIds: 'dasdg4232fsd',
    data: {
      street: '10 Downing Street'
    }
  }
]

const DataDisplay = () => {
  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <DataSourceDataItem data={item.data} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default DataDisplay
