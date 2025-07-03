export const colorPicker = {
  id: "color-picker",
  title: "Color Picker",
  description: "Pick a color and get its HEX, RGB, and HSL values.",
  render: () => `
    <div class="tool-ui">
      <div class="color-picker-wrapper">
        <input type="color" id="colorPickerInput" value="#42f8f5">
        <div id="colorPickerOutput" class="tool-output" style="flex-grow: 1;"></div>
      </div>
    </div>`,
  init: () => {
    const picker = document.getElementById("colorPickerInput");
    const output = document.getElementById("colorPickerOutput");
    function updateColor() {
      const hex = picker.value;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      output.innerHTML = `HEX: ${hex}<br>RGB: rgb(${r}, ${g}, ${b})`;
    }
    picker.addEventListener("input", updateColor);
    updateColor(); // Initial call
  },
}; 