import React, { useState } from 'react'
import {DataTable} from './components/DataTable'

const App: React.FC = () => {
  const base64Data = 'SGVsbG8gd29ybGQh'; // Dữ liệu base64 mẫu
  const handleDataChange = (updatedBytes: number[]) => {
    console.log('Updated Bytes:', updatedBytes);
  };

  return (
    <DataTable base64Data={base64Data} onChange={handleDataChange} />
  )
}

export default App
