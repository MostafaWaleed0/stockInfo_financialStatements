"use client";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import type {
  FinancialStatementType,
  FlatFinancialStatementType,
} from "@/lib/types";
import React from "react";
import FinancialStatementResults from "./financial-statement-results";

function FinancialStatementAnalysis() {
  const initialFinancialStatement: FinancialStatementType = {
    revenue: "",
    grossProfit: "",
    netIncome: "",
    "sg&a": "",
    interests: "",
    depreciation: "",
    totalAssets: "",
    totalLiabilities: "",
    totalEquity: "",
    retainedEarnings: "",
    incomeTaxes: "",
    capitalExpenditures: "",
    totalCostsAndExpenses: "",
  };

  function flattenObject(
    obj: FinancialStatementType
  ): FlatFinancialStatementType {
    const result: FlatFinancialStatementType = {};

    for (const key in obj) {
      result[key] = String(obj[key]);
    }

    return result;
  }

  function generateFinancialDataArray(
    length: number
  ): FlatFinancialStatementType[] {
    const flatFinancialStatement = flattenObject(initialFinancialStatement);

    return Array.from({ length }, (_, index) => {
      const financialStatement: FlatFinancialStatementType = {};
      for (const key in flatFinancialStatement) {
        if (flatFinancialStatement.hasOwnProperty(key)) {
          financialStatement[`${key}_${index}`] = String(
            flatFinancialStatement[key]
          );
        }
      }
      return financialStatement;
    });
  }

  const [statement, setStatement] = useLocalStorage(
    "values",
    generateFinancialDataArray(10)
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { name, value } = event.target;
    const formattedValue = value
      .replace(/[^0-9-]/g, "")
      .replace(/(-?\d)(?=(\d{3})+(?!\d))/g, "$1,");

    setStatement((prevData) => {
      const newData = [...prevData];
      newData[index][name] = formattedValue;
      return newData;
    });
  }

  // const handleClearAll = () => {
  //   setStatement((prevData) => {
  //     return prevData.map((item) => {
  //       const clearedItem = { ...item };
  //       for (const key in clearedItem) {
  //         if (clearedItem.hasOwnProperty(key) && key !== "name") {
  //           clearedItem[key] = "";
  //         }
  //       }
  //       return clearedItem;
  //     });
  //   });
  // };

  return (
    <div className="overflow-auto">
      <div className="bg-inherit rounded-lg shadow-lg shadow-slate-400/30 p-4 w-[2500px] xl:w-full">
        <h2 className="text-2xl font-semibold mb-4">
          Financial Statement Analysis
        </h2>
        <div className="table-auto">
          <div className="bg-inherit">
            <div className="grid grid-cols-[1.5fr_repeat(10,1fr)] gap-2">
              <div />
              {statement.map((_, index) => (
                <div
                  className="px-4 py-3 uppercase tracking-wider text-center"
                  key={index}
                >
                  FY{index + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-inherit divide-y divide-gray-200 px-6 pb-4">
            <div className="grid grid-cols-[1.5fr_repeat(10,1fr)] gap-2">
              <div>
                {Object.keys(initialFinancialStatement).map((key) => {
                  return (
                    <div
                      key={key}
                      className="whitespace-nowrap py-3 capitalize grid items-center "
                    >
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </div>
                  );
                })}
              </div>
              {statement.map((item, index) => (
                <div className="grid gap-1" key={index}>
                  {Object.keys(item).map((field) => (
                    <input
                      className="w-full border rounded py-2 px-3 bg-inherit"
                      type="text"
                      name={field}
                      value={item[field]}
                      key={field}
                      onChange={(event) => handleChange(event, index)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <FinancialStatementResults statement={statement} />
      </div>
    </div>
  );
}

export default FinancialStatementAnalysis;
