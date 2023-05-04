import { get } from "lodash";
import { useEffect, useState } from "react";

export const evaluateConditionChain = (
  conditionChain: ConditionChain,
  object: Record<string, unknown>,
): boolean => {
  // TODO: implement
  return false;
};

export interface ConditionChain {
  conditions: Array<Condition | ConditionChain>;
  operator: "and" | "or";
}

interface Condition {
  key: string;
  value: any;
  operator: ConditionOperator;
}

type ConditionOperator =
  | "equal"
  | "notEqual"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "contains"
  | "notContains";