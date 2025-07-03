import React, { useState, useEffect, useCallback } from "react";
import "./EmiCalculator.css";

function EmiCalculator() {
  // State variables for principal amount, annual interest rate, loan tenure, and calculated EMI
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState(""); // Annual interest rate in percentage
  const [tenure, setTenure] = useState(""); // Tenure in years
  const [tenureUnit, setTenureUnit] = useState("years"); // 'years' or 'months'
  const [emi, setEmi] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Wrap calculateEmi in useCallback and move above useEffect
  const calculateEmi = useCallback(() => {
    const p = parseFloat(principal);
    const annualR = parseFloat(interestRate);
    let n = parseInt(tenure);

    // Validate inputs
    if (isNaN(p) || p <= 0) {
      setEmi(null);
      setErrorMessage(
        principal === "" ? "" : "Please enter a valid principal amount (> 0).",
      );
      return;
    }
    if (isNaN(annualR) || annualR < 0) {
      setEmi(null);
      setErrorMessage(
        interestRate === "" ? "" : "Please enter a valid interest rate (>= 0).",
      );
      return;
    }
    if (isNaN(n) || n <= 0) {
      setEmi(null);
      setErrorMessage(
        tenure === "" ? "" : "Please enter a valid loan tenure (> 0).",
      );
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    // Convert annual interest rate to monthly rate
    const r = annualR / (12 * 100);

    // Convert tenure to months if in years
    if (tenureUnit === "years") {
      n *= 12;
    }

    let calculatedEmi;

    if (r === 0) {
      // Simple division if interest rate is 0
      calculatedEmi = p / n;
    } else {
      // EMI formula
      const numerator = p * r * Math.pow(1 + r, n);
      const denominator = Math.pow(1 + r, n) - 1;
      calculatedEmi = numerator / denominator;
    }

    setEmi(calculatedEmi.toFixed(2)); // Format to 2 decimal places
  }, [principal, interestRate, tenure, tenureUnit]);

  // Effect hook to recalculate EMI whenever inputs change
  useEffect(() => {
    calculateEmi();
  }, [principal, interestRate, tenure, tenureUnit, calculateEmi]);

  /**
   * Handles changes to the principal amount input.
   * @param {Event} e - The change event from the input field.
   */
  const handlePrincipalChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPrincipal(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Principal must be a valid number.");
    }
  };

  /**
   * Handles changes to the annual interest rate input.
   * @param {Event} e - The change event from the input field.
   */
  const handleInterestRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInterestRate(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Interest rate must be a valid number.");
    }
  };

  /**
   * Handles changes to the loan tenure input.
   * @param {Event} e - The change event from the input field.
   */
  const handleTenureChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      // Tenure should be a whole number
      setTenure(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Loan tenure must be a whole number.");
    }
  };

  /**
   * Handles changes to the loan tenure unit (years/months).
   * @param {Event} e - The change event from the select field.
   */
  const handleTenureUnitChange = (e) => {
    setTenureUnit(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-100 p-4 font-sans text-gray-800 flex flex-col items-center justify-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="card">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-6">
          EMI Calculator
        </h1>

        {/* Principal Amount Input */}
        <div className="input-group">
          <label htmlFor="principal" className="input-label">
            Principal Amount ($):
          </label>
          <input
            id="principal"
            type="text"
            value={principal}
            onChange={handlePrincipalChange}
            placeholder="e.g., 100000"
            className="input-field"
          />
        </div>

        {/* Annual Interest Rate Input */}
        <div className="input-group">
          <label htmlFor="interestRate" className="input-label">
            Annual Interest Rate (%):
          </label>
          <input
            id="interestRate"
            type="text"
            value={interestRate}
            onChange={handleInterestRateChange}
            placeholder="e.g., 8.5"
            className="input-field"
          />
        </div>

        {/* Loan Tenure Input with Unit Selection */}
        <div className="input-group">
          <label htmlFor="tenure" className="input-label">
            Loan Tenure:
          </label>
          <div className="flex space-x-2">
            <input
              id="tenure"
              type="text"
              value={tenure}
              onChange={handleTenureChange}
              placeholder="e.g., 5"
              className="input-field flex-grow"
            />
            <select
              id="tenureUnit"
              value={tenureUnit}
              onChange={handleTenureUnitChange}
              className="select-field w-24"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        {/* Error Message Display */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* EMI Result Display */}
        {emi !== null && !errorMessage && (
          <div className="result-display">
            <p>Your Monthly EMI: ${emi}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmiCalculator;
