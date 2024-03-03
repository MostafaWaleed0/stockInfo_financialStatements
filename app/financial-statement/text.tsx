import React from "react";

type ColorType = {
  good: number;
  bad: number;
  value: number;
};

function getColor({ good, bad, value }: ColorType): string {
  if (isNaN(value) || value === 0 || value === Infinity) {
    return "bg-gray-800";
  }

  if (good > bad) {
    if (value >= good) {
      return "bg-green-500";
    } else if (value <= bad) {
      return "bg-red-500";
    } else if (value > bad && value < good) {
      return "bg-yellow-400";
    }
  } else if (bad > good) {
    if (value <= good) {
      return "bg-green-500";
    } else if (value >= bad) {
      return "bg-red-500";
    } else if (value < bad && value > good) {
      return "bg-yellow-400";
    }
  }

  return "";
}

function Text({ good, bad, value = 0 }: ColorType) {
  const bgColorClass = getColor({ good, bad, value });
  const displayValue =
    isNaN(value) || value === 0 || value === Infinity ? "-" : value.toFixed(1);

  return (
    <div className={`p-2 text-center rounded overflow-hidden ${bgColorClass}`}>
      {displayValue}%
    </div>
  );
}

export default Text;
