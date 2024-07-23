import { Input } from 'antd';
import React from 'react';

interface HexInputProps {
  values: string[];
  onChange: (index: number, value: string) => void;
}

const HexInput: React.FC<HexInputProps> = ({ values, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value.toUpperCase();
    if (/^[0-9A-F]{0,2}$/.test(newValue)) {
      onChange(index, newValue);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {values.map((value, index) => (
        <Input
          key={index}
          value={value}
          maxLength={2}
          variant='borderless'
          style={{ width: '40px', marginRight: '4px', textAlign: 'center' }}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
};

export default HexInput;
