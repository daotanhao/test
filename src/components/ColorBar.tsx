import React from 'react';
import { scaleLinear } from 'd3-scale';
import { red, green, yellow, gold, lime} from '@ant-design/colors'

const ColorBar = ({ numSegments = 10, min = 0, max = 100, width = 500, height = 50, colorRange = ['red', 'green'] }) => {
  // Tạo scale để sinh màu từ thang màu truyền vào
  const colorScale = scaleLinear()
    .domain([min, max]) // Giá trị min và max
    .range(colorRange); // Mảng các màu cho range

  // Tạo các đoạn màu (segments) để chia thanh bar thành các phần nhỏ
  const segmentWidth = width / numSegments;
  const segments = Array.from({ length: numSegments }, (_, i) => {
    const value = (i / numSegments) * (max - min) + min; // Tính giá trị bắt đầu của mỗi segment
    return {
      color: colorScale(value),
      value,
      width: segmentWidth,
    };
  });

  return (
    <div>
      <div style={{ display: 'flex', width: `${width}px`, height: `${height}px`, border: '1px solid #ddd', position: 'relative' }}>
        {/* Duyệt qua từng segment và hiển thị */}
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              width: `${segment.width}px`,
              height: '100%',
              backgroundColor: segment.color,
              position: 'relative',
            }}
          />
        ))}
        {/* Hiển thị các giá trị tại các vạch ngăn cách */}
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: '-20px',
              left: `${(index / numSegments) * 100}%`,
              transform: 'translateX(-50%)',
              fontSize: '10px',
            }}
          >
            {Math.round(segment.value)}
          </div>
        ))}
        {/* Hiển thị giá trị tại điểm cuối */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '0',
            transform: 'translateX(50%)',
            fontSize: '10px',
          }}
        >
          {Math.round(max)}
        </div>
      </div>
    </div>
  );
};

export default ColorBar;
