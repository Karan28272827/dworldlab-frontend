import React, { useState, useEffect, useCallback, useMemo } from "react";

function UnitConverter() {
  // State variables for input value, selected input unit, selected output unit, and converted output
  const [inputValue, setInputValue] = useState("");
  const [inputUnit, setInputUnit] = useState("meters");
  const [outputUnit, setOutputUnit] = useState("kilometers");
  const [outputValue, setOutputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Memoize units object
  const units = useMemo(
    () => ({
      length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701,
      },
      mass: {
        grams: 1,
        kilograms: 0.001,
        milligrams: 1000,
        pounds: 0.00220462,
        ounces: 0.035274,
      },
      temperature: {
        celsius: {
          toKelvin: (c) => c + 273.15,
          toFahrenheit: (c) => (c * 9) / 5 + 32,
          fromKelvin: (k) => k - 273.15,
          fromFahrenheit: (f) => ((f - 32) * 5) / 9,
        },
        fahrenheit: {
          toKelvin: (f) => ((f - 32) * 5) / 9 + 273.15,
          toCelsius: (f) => ((f - 32) * 5) / 9,
          fromKelvin: (k) => ((k - 273.15) * 9) / 5 + 32,
          fromCelsius: (c) => (c * 9) / 5 + 32,
        },
        kelvin: {
          toCelsius: (k) => k - 273.15,
          toFahrenheit: (k) => ((k - 273.15) * 9) / 5 + 32,
          fromCelsius: (c) => c + 273.15,
          fromFahrenheit: (f) => ((f - 32) * 5) / 9 + 273.15,
        },
      },
      volume: {
        liters: 1,
        milliliters: 1000,
        cubicMeters: 0.001,
        gallons: 0.264172,
        quarts: 1.05669,
        pints: 2.11338,
        cups: 4.22675,
      },
      time: {
        seconds: 1,
        minutes: 1 / 60,
        hours: 1 / 3600,
        days: 1 / (3600 * 24),
        weeks: 1 / (3600 * 24 * 7),
      },
    }),
    [],
  );

  // Memoize getUnitCategory function
  const getUnitCategory = useCallback(
    (unit) => {
      for (const category in units) {
        if (units[category].hasOwnProperty(unit)) {
          return category;
        }
      }
      return null;
    },
    [units],
  );

  // Memoize convertUnits function
  const convertUnits = useCallback(() => {
    const value = parseFloat(inputValue);

    if (isNaN(value)) {
      setOutputValue("");
      setErrorMessage(inputValue === "" ? "" : "Please enter a valid number.");
      return;
    }

    const inputCategory = getUnitCategory(inputUnit);
    const outputCategory = getUnitCategory(outputUnit);

    if (!inputCategory || !outputCategory || inputCategory !== outputCategory) {
      setErrorMessage("Cannot convert between different unit categories.");
      setOutputValue("");
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    let convertedResult;

    if (inputCategory === "temperature") {
      // Temperature conversions are special as they are not linear
      const fromUnit = inputUnit;
      const toUnit = outputUnit;

      if (fromUnit === toUnit) {
        convertedResult = value;
      } else {
        // Convert input value to a common base (e.g., Celsius) first, then to target
        let baseValue;
        if (fromUnit === "celsius") baseValue = value;
        else if (fromUnit === "fahrenheit")
          baseValue = units.temperature.celsius.fromFahrenheit(value);
        else if (fromUnit === "kelvin")
          baseValue = units.temperature.celsius.fromKelvin(value);

        if (toUnit === "celsius") convertedResult = baseValue;
        else if (toUnit === "fahrenheit")
          convertedResult = units.temperature.fahrenheit.fromCelsius(baseValue);
        else if (toUnit === "kelvin")
          convertedResult = units.temperature.kelvin.fromCelsius(baseValue);
      }
    } else {
      // For other categories (length, mass, volume, time)
      const inputRate = units[inputCategory][inputUnit];
      const outputRate = units[outputCategory][outputUnit];

      if (inputRate && outputRate) {
        // Convert input value to the base unit (e.g., meters for length)
        const valueInBaseUnit = value / inputRate;
        // Convert from base unit to the target output unit
        convertedResult = valueInBaseUnit * outputRate;
      } else {
        setErrorMessage("Invalid unit selected.");
        setOutputValue("");
        return;
      }
    }

    setOutputValue(convertedResult.toFixed(4)); // Format to 4 decimal places
  }, [inputValue, inputUnit, outputUnit, getUnitCategory, units]);

  // Effect hook to perform conversion whenever input value or units change
  useEffect(() => {
    convertUnits();
  }, [inputValue, inputUnit, outputUnit, convertUnits]);

  /**
   * Handles changes to the input value.
   * @param {Event} e - The change event from the input field.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers, including decimals
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid number.");
    }
  };

  /**
   * Handles changes to the input unit selection.
   * @param {Event} e - The change event from the select field.
   */
  const handleInputUnitChange = (e) => {
    const newUnit = e.target.value;
    setInputUnit(newUnit);
    // If the output unit is in a different category, reset it to a default in the new category
    if (getUnitCategory(newUnit) !== getUnitCategory(outputUnit)) {
      const newCategory = getUnitCategory(newUnit);
      if (newCategory && Object.keys(units[newCategory]).length > 0) {
        setOutputUnit(Object.keys(units[newCategory])[0]);
      }
    }
  };

  /**
   * Handles changes to the output unit selection.
   * @param {Event} e - The change event from the select field.
   */
  const handleOutputUnitChange = (e) => {
    setOutputUnit(e.target.value);
  };

  // Get all unit categories for rendering select options
  const allUnitCategories = Object.keys(units);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 font-sans text-gray-800 flex flex-col items-center justify-center">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .card {
            @apply bg-white rounded-xl shadow-2xl p-8 space-y-6 w-full max-w-md;
          }
          .input-group {
            @apply flex flex-col space-y-2;
          }
          .input-label {
            @apply text-lg font-semibold text-gray-700;
          }
          .input-field {
            @apply p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out;
          }
          .select-field {
            @apply p-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.75rem center;
            background-size: 1.5em 1.5em;
            padding-right: 2.5rem;
          }
          .error-message {
            @apply text-red-600 text-sm mt-2;
          }
          .result-display {
            @apply bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-center text-xl font-bold;
          }
        `}
      </style>

      <div className="card">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Unit Converter
        </h1>

        {/* Input Section */}
        <div className="input-group">
          <label htmlFor="inputValue" className="input-label">
            Value to Convert:
          </label>
          <input
            id="inputValue"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter value"
            className="input-field"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        {/* Input Unit Selection */}
        <div className="input-group">
          <label htmlFor="inputUnit" className="input-label">
            From Unit:
          </label>
          <select
            id="inputUnit"
            value={inputUnit}
            onChange={handleInputUnitChange}
            className="select-field"
          >
            {allUnitCategories.map((category) => (
              <optgroup
                key={category}
                label={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                {Object.keys(units[category]).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() +
                      unit
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Output Unit Selection */}
        <div className="input-group">
          <label htmlFor="outputUnit" className="input-label">
            To Unit:
          </label>
          <select
            id="outputUnit"
            value={outputUnit}
            onChange={handleOutputUnitChange}
            className="select-field"
          >
            {/* Filter output units based on the category of the input unit */}
            {getUnitCategory(inputUnit) &&
              Object.keys(units[getUnitCategory(inputUnit)]).map((unit) => (
                <option key={unit} value={unit}>
                  {unit.charAt(0).toUpperCase() +
                    unit
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </option>
              ))}
          </select>
        </div>

        {/* Conversion Result */}
        <div className="result-display">
          <p>
            {outputValue}{" "}
            {outputUnit.charAt(0).toUpperCase() +
              outputUnit
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
