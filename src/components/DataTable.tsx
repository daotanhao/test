import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import HexInput from './HexInput';

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
      const rowHex = Array.from(bytes.slice(i, i + 8)).map(byteToHex);
      while (rowHex.length < 8) {
        rowHex.push('');
      }
      const row = {
        key: i,
        index: i,
        hex: rowHex,
        ascii: rowHex.map(h => (h ? byteToAscii(parseInt(h, 16)) : '')).join('')
      };
      tableData.push(row);
    }
    setData(tableData);
  }, [base64Data]);

  const handleHexChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...data];
    newData[rowIndex].hex[colIndex] = value;

    // Update ASCII value
    newData[rowIndex].ascii = newData[rowIndex].hex.map(h => (h ? byteToAscii(parseInt(h, 16)) : '')).join('');

    setData(newData);

    // Trigger onChange
    const updatedBytes = newData.flatMap(row => row.hex.map(h => (h ? parseInt(h, 16) : 0)));
    onChange(updatedBytes);
  };

  const addRow = () => {
    const newIndex = data.length * 8;
    const newRow = {
      key: newIndex,
      index: newIndex,
      hex: Array(8).fill(''),
      ascii: ''
    };
    const newData = [...data, newRow];
    setData(newData);
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
        <HexInput
          values={hex}
          onChange={(colIndex, value) => handleHexChange(rowIndex, colIndex, value)}
        />
      )
    },
    {
      title: 'ASCII',
      dataIndex: 'ascii',
      key: 'ascii',
    },
  ];

  return (
    <div>
      <Button onClick={addRow} type="primary" style={{ marginBottom: '16px' }}>
        Add Row
      </Button>
      <Table showHeader={false} dataSource={data} columns={columns} pagination={false} />
    </div>
  );
};
