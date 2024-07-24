import { Input, InputRef } from 'antd';
import React, { useRef } from 'react';

interface HexInputProps {
  values: string[];
  onChange: (index: number, value: string) => void;
}

const HexInput: React.FC<HexInputProps> = ({ values, onChange }) => {
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(index);
    
    const newValue = e.target.value.toUpperCase();
    if (/^[0-9A-F]{0,2}$/.test(newValue)) {
      if (newValue.length === 2 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
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
          style={{ width: '40px', marginRight: '4px', textAlign: 'center' }}
          onChange={(e) => handleChange(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default HexInput;
