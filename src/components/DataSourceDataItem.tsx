import { Button, Flex } from 'antd'
import React, { useState } from 'react'

interface DataSourceDataItemProps {
  data: any
}

const DataSourceDataItem = (props: DataSourceDataItemProps) => {
  const { data } = props
  const [showAllKeys, setShowAllKeys] = useState(false)

  const visibleKeys = showAllKeys ? Object.keys(data) : Object.keys(data).slice(0, 2)

  return (
    <div>
      {visibleKeys.sort().map((key) => (
        <div key={key} style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 'bold' }}>{key}:</span> {data[key]}
        </div>
      ))}
      {Object.keys(data).length > 2 && (
        <Button type='link' onClick={() => setShowAllKeys(!showAllKeys)}>
          {showAllKeys ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}

export default DataSourceDataItem
