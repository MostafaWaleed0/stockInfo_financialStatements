export type FinancialStatementType = {
  [key: string]: string;
};

export type FlatFinancialStatementType = {
  [key: string]: string;
};

export type FinancialStatementResultsType = {
  [x: string]: number;
};

type BusinessType = "bank" | "industrial" | "technology";

type BusinessMetricValues = {
  good: number;
  bad: number;
};

export type BusinessTypeMetrics = {
  [key in BusinessType]: {
    [metric: string]: BusinessMetricValues;
  };
};

export type MetricsType = {
  values: string[];
  label: string;
  calculate: (...value: number[]) => number;
};
