import React, { useState } from "react";

const SliderCard = ({ title, min, max, value, setValue, color }) => {
  // Ensure percent is valid and within 0-100
  const percent = !isNaN(value) ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="card shadow-sm p-3 mb-3">
      <div className="d-flex justify-content-between mb-2">
        <h6 className="mb-0">{title}</h6>
        <span className="fw-bold">{isNaN(value) ? 0 : value}</span>
      </div>

      <input
        type="range"
        className="custom-slider"
        value={isNaN(value) ? 0 : value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, ${color} ${percent}%, #ddd ${percent}%)`,
        }}
      />
    </div>
  );
};

function RangeSlider() {
  const [price, setPrice] = useState(50);
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);
  const [progress, setProgress] = useState(25);
  const [inputValue, setInputValue] = useState("");

  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return "";
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle input change safely
  const handleChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    const numericValue = parseInt(raw, 10);

    setInputValue(formatNumber(raw));

    // Only update price if it's a valid number within slider range
    if (!isNaN(numericValue)) {
      const clampedValue = Math.min(Math.max(numericValue, 0), 100);
      setPrice(clampedValue);
    }
  };

  return (
    <div className="bg-light">
      <div className="flex-grow-1 p-0 p-lg-2">
        <h4 className="mb-4">Advanced Range Sliders</h4>

        <SliderCard
          title="Price Range"
          min={0}
          max={100}
          value={price}
          // value={inputValue}
          setValue={(val) => {
            setPrice(val);
            // setInputValue(val.toString());
          }}
          color="green"
        />

        <SliderCard
          title="Volume"
          min={0}
          max={100}
          value={volume}
          setValue={setVolume}
          color="blue"
        />

        <SliderCard
          title="Brightness"
          min={0}
          max={100}
          value={brightness}
          setValue={setBrightness}
          color="orange"
        />

        <SliderCard
          title="Progress"
          min={0}
          max={100}
          value={progress}
          setValue={setProgress}
          color="purple"
        />
        {/* <SliderCard 
        min= {10}
        max={100}
        value={}
        /> */}

        {/* <div className="col-lg-6 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter value"
            value={inputValue}
            // onChange={handleChange}
          />
        </div> */}
      </div>
    </div>
  );
}

export default RangeSlider;
