import React, { useState, useEffect } from 'react';
import { Table, Input, message } from 'antd';

interface DataTableProps {
  base64Data: string;
  onChange: (updatedBytes: number[]) => void;
}

interface TableData {
  key: number;
  index: number;
  hex: string[];
  ascii: string;
}

// Hàm để chuyển đổi base64 sang mảng byte
const base64ToBytes = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  return Uint8Array.from(binaryString, char => char.charCodeAt(0));
};

// Hàm để chuyển đổi byte sang HEX
const byteToHex = (byte: number): string => {
  return byte.toString(16).padStart(2, '0').toUpperCase();
};

// Hàm để chuyển đổi byte sang ASCII
const byteToAscii = (byte: number): string => {
  return String.fromCharCode(byte);
};

export const DataTable: React.FC<DataTableProps> = ({ base64Data, onChange }) => {
  const [data, setData] = useState<TableData[]>([]);

  useEffect(() => {
    const bytes = base64ToBytes(base64Data);
    const tableData: TableData[] = [];
    for (let i = 0; i < bytes.length; i += 8) {
      const row = {
        key: i,
        index: i,
        hex: Array.from(bytes.slice(i, i + 8)).map(byteToHex),
        ascii: Array.from(bytes.slice(i, i + 8)).map(byteToAscii).join('')
      };
      tableData.push(row);
    }
    setData(tableData);
  }, [base64Data]);

  const handleHexChange = (value: string, rowIndex: number, colIndex: number) => {
    const hexValue = value.toUpperCase();
    const hexRegex = /(?<=^(..)*)([2-7]{1}[A-Fa-f0-9]{1})/;

    if (!hexRegex.test(hexValue)) {
      message.error('Invalid HEX value. Please enter a value between 00 and FF.');
      return;
    }

    const newData = [...data];
    newData[rowIndex].hex[colIndex] = hexValue;

    // Update ASCII value
    const byteValue = parseInt(hexValue, 16);
    newData[rowIndex].ascii = newData[rowIndex].hex.map(h => byteToAscii(parseInt(h, 16))).join('');

    setData(newData);

    // Trigger onChange
    const updatedBytes = newData.flatMap(row => row.hex.map(h => parseInt(h, 16)));
    onChange(updatedBytes);
  };

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Hex',
      dataIndex: 'hex',
      key: 'hex',
      render: (hex: string[], record: TableData, rowIndex: number) => (
        <div style={{ display: 'flex' }}>
          {hex.map((h, colIndex) => (
            <Input
              key={colIndex}
              value={h}
              maxLength={2}
              style={{ width: '40px', marginRight: '4px' }}
              onChange={e => handleHexChange(e.target.value, rowIndex, colIndex)}
            />
          ))}
        </div>
      )
    },
    {
      title: 'ASCII',
      dataIndex: 'ascii',
      key: 'ascii',
    },
  ];

  return <Table dataSource={data} columns={columns} pagination={false} />;
};