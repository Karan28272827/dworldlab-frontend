import React, { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#42f8f5");
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  return (
    <div className="tool-ui">
      <div className="color-picker-wrapper">
        <input
          type="color"
          id="colorPickerInput"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <div id="colorPickerOutput" className="tool-output" style={{ flexGrow: 1 }}>
          HEX: {color}
          <br />
          RGB: rgb({r}, {g}, {b})
        </div>
      </div>
    </div>
  );
};

export default ColorPicker; 