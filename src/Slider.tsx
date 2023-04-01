import React, { useEffect, useRef, useState } from 'react';

type SliderProps =  {
  min: number;
  max: number;
}

const Slider: React.FC<SliderProps> = ({ min, max }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = useState(min);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    sliderRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderLeft = sliderRect.left;
    const sliderRight = sliderRect.right;

    const pointerPosition = event.clientX;
    const clampedPosition = Math.min(Math.max(pointerPosition, sliderLeft), sliderRight);

    const sliderWidth = sliderRight - sliderLeft;
    const normalizedPosition = (clampedPosition - sliderLeft) / sliderWidth;
    const newValue = min + (max - min) * normalizedPosition;

    setValue(newValue);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
    } else {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div>
      <div>Value: {Math.floor(value)}</div>
      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '300px',
          height: '50px',
          backgroundColor: 'lightgray',
          borderRadius: '25px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            position: 'absolute',
            left: `${((value - min) / (max - min)) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Slider;