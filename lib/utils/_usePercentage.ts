import React from "react";

function _usePercentage(num1: number, num2: number) {
  return Math.floor((num1 / num2) * 100) || 0;
}

export default _usePercentage;
