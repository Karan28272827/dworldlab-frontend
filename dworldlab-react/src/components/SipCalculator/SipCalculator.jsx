import React, { useState, useEffect, useCallback } from "react";
import "./SipCalculator.css";

function SipCalculator() {
  // State variables for monthly investment, annual return rate, investment period, and calculated values
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturnRate, setAnnualReturnRate] = useState(""); // Annual return rate in percentage
  const [investmentPeriod, setInvestmentPeriod] = useState(""); // Investment period in years
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Wrap calculateSip in useCallback and move above useEffect
  const calculateSip = useCallback(() => {
    const p = parseFloat(monthlyInvestment);
    const annualR = parseFloat(annualReturnRate);
    const years = parseInt(investmentPeriod);

    // Validate inputs
    if (isNaN(p) || p <= 0) {
      setMaturityAmount(null);
      setTotalInvestment(null);
      setErrorMessage(
        monthlyInvestment === ""
          ? ""
          : "Please enter a valid monthly investment (> 0).",
      );
      return;
    }
    if (isNaN(annualR) || annualR < 0) {
      setMaturityAmount(null);
      setTotalInvestment(null);
      setErrorMessage(
        annualReturnRate === ""
          ? ""
          : "Please enter a valid annual return rate (>= 0).",
      );
      return;
    }
    if (isNaN(years) || years <= 0) {
      setMaturityAmount(null);
      setTotalInvestment(null);
      setErrorMessage(
        investmentPeriod === ""
          ? ""
          : "Please enter a valid investment period (> 0).",
      );
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    // Convert annual return rate to monthly rate
    const r = annualR / (12 * 100);
    // Total number of payments (months)
    const n = years * 12;

    let calculatedMaturityAmount;

    if (r === 0) {
      // Simple calculation if return rate is 0
      calculatedMaturityAmount = p * n;
    } else {
      // SIP Maturity Amount formula
      calculatedMaturityAmount = ((p * (Math.pow(1 + r, n) - 1)) / r) * (1 + r);
    }

    const calculatedTotalInvestment = p * n;

    setMaturityAmount(calculatedMaturityAmount.toFixed(2)); // Format to 2 decimal places
    setTotalInvestment(calculatedTotalInvestment.toFixed(2)); // Format to 2 decimal places
  }, [monthlyInvestment, annualReturnRate, investmentPeriod]);

  // Effect hook to recalculate SIP whenever inputs change
  useEffect(() => {
    calculateSip();
  }, [monthlyInvestment, annualReturnRate, investmentPeriod, calculateSip]);

  /**
   * Handles changes to the monthly investment input.
   * @param {Event} e - The change event from the input field.
   */
  const handleMonthlyInvestmentChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setMonthlyInvestment(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Monthly investment must be a valid number.");
    }
  };

  /**
   * Handles changes to the annual return rate input.
   * @param {Event} e - The change event from the input field.
   */
  const handleAnnualReturnRateChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAnnualReturnRate(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Annual return rate must be a valid number.");
    }
  };

  /**
   * Handles changes to the investment period input.
   * @param {Event} e - The change event from the input field.
   */
  const handleInvestmentPeriodChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      // Period should be a whole number
      setInvestmentPeriod(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Investment period must be a whole number.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 font-sans text-gray-800 flex flex-col items-center justify-center">
      <script src="https://cdn.tailwindcss.com"></script>

      <div className="card">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6">
          SIP Calculator
        </h1>

        {/* Monthly Investment Input */}
        <div className="input-group">
          <label htmlFor="monthlyInvestment" className="input-label">
            Monthly Investment ($):
          </label>
          <input
            id="monthlyInvestment"
            type="text"
            value={monthlyInvestment}
            onChange={handleMonthlyInvestmentChange}
            placeholder="e.g., 5000"
            className="input-field"
          />
        </div>

        {/* Expected Annual Return Rate Input */}
        <div className="input-group">
          <label htmlFor="annualReturnRate" className="input-label">
            Expected Annual Return Rate (%):
          </label>
          <input
            id="annualReturnRate"
            type="text"
            value={annualReturnRate}
            onChange={handleAnnualReturnRateChange}
            placeholder="e.g., 12"
            className="input-field"
          />
        </div>

        {/* Investment Period Input */}
        <div className="input-group">
          <label htmlFor="investmentPeriod" className="input-label">
            Investment Period (Years):
          </label>
          <input
            id="investmentPeriod"
            type="text"
            value={investmentPeriod}
            onChange={handleInvestmentPeriodChange}
            placeholder="e.g., 10"
            className="input-field"
          />
        </div>

        {/* Error Message Display */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Results Display */}
        {maturityAmount !== null &&
          totalInvestment !== null &&
          !errorMessage && (
            <div className="space-y-4 mt-6">
              <div className="result-display">
                <p>Total Investment: ${totalInvestment}</p>
              </div>
              <div className="result-display">
                <p>Estimated Maturity Amount: ${maturityAmount}</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SipCalculator;
