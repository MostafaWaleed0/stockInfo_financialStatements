import type {
  BusinessTypeMetrics,
  FinancialStatementResultsType,
  FlatFinancialStatementType,
  MetricsType,
} from "@/lib/types";
import React, { ChangeEvent, useState } from "react";
import Text from "./text";

type FinancialStatementResultsProps = {
  statement: FlatFinancialStatementType[];
};

const BusinessTypeMetrics: BusinessTypeMetrics = {
  industrial: {
    "Gross Margin": { good: 40, bad: 20 },
    "Net Income": { good: 20, bad: 10 },
    "SG&A Sales Ratio": { good: 30, bad: 60 },
    ROA: { good: 30, bad: 5 },
  },
  bank: {
    "Gross Margin": { good: 40, bad: 20 },
    "Net Income": { good: 20, bad: 10 },
    "SG&A Sales Ratio": { good: 30, bad: 60 },
    ROA: { good: 30, bad: 5 },
  },
  technology: {
    "Gross Margin": { good: 40, bad: 20 },
    "Net Income": { good: 20, bad: 10 },
    "SG&A Sales Ratio": { good: 30, bad: 60 },
    ROA: { good: 30, bad: 5 },
  },
};

const metrics: MetricsType[] = [
  {
    values: ["grossProfit", "revenue"],
    label: "Gross Margin",
    calculate: (value1, value2) => (value1 / value2) * 100,
  },
  {
    values: ["netIncome", "revenue"],
    label: "Net Income",
    calculate: (value1, value2) => (value1 / value2) * 100,
  },
  {
    values: ["sg&a", "revenue"],
    label: "SG&A Sales Ratio",
    calculate: (value1, value2) => (value1 / value2) * 100,
  },

  {
    values: ["netIncome", "totalAssets"],
    label: "ROA",
    calculate: (value1, value2) => (value1 / value2) * 100,
  },
];

const FinancialStatementResults: React.FC<FinancialStatementResultsProps> = ({
  statement,
}) => {
  const [type, setType] = useState("industrial");
  const [result, setResult] = useState<MetricsType[]>(metrics);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const newType = event.target.value;
    setType(newType);

    const updatedMetrics = metrics.map((metric) => {
      const { label } = metric;
      const { good, bad } =
        BusinessTypeMetrics[newType as keyof BusinessTypeMetrics][label];
      return { ...metric, good, bad };
    });

    setResult(updatedMetrics);
  }

  function convertData() {
    return statement.map((item) => {
      const newItem: FinancialStatementResultsType = {};
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = Number(item[key].replace(/[^0-9.]/g, ""));
          newItem[key] = value;
        }
      }
      return newItem;
    });
  }

  return (
    <div className="rounded-lg shadow-lg p-4">
      <div>
        <select
          onChange={handleChange}
          className="capitalize w-56 text-blue-800 px-2 py-1 rounded"
        >
          {Object.keys(BusinessTypeMetrics).map((key) => [
            <option key={key} value="bank" className="font-bold">
              {key}
            </option>,
          ])}
        </select>
      </div>
      {result.map(({ values, label, calculate }, metricIndex) => (
        <div
          key={metricIndex}
          className="grid grid-cols-11 items-center gap-x-2 mt-5"
        >
          {label}:
          {convertData().map((item, index) => {
            const value = values.map((value) => {
              return item[`${value}_${index}`];
            });
            const { good, bad } =
              BusinessTypeMetrics[type as keyof BusinessTypeMetrics][label] ||
              0;
            const calculatedValue = calculate(...value);

            return (
              <div key={index}>
                <Text good={good} bad={bad} value={calculatedValue} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FinancialStatementResults;
// {
//   values: ["netIncome", "totalEquity"],
//   label: "Return on Equity (%)",
//   calculate: (value1, value2) => (value1 / value2) * 100,
// },
