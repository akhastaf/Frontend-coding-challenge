import { get } from "lodash";
import { useEffect, useState } from "react";

export const evaluateConditionChain = (
  conditionChain: ConditionChain,
  object: Record<string, unknown>,
): boolean => {
  if (conditionChain.operator === 'and')
    return conditionChain.conditions.every((condition: Condition | ConditionChain) => evaluateCondition(condition, object))
  else if (conditionChain.operator === 'or')
    return conditionChain.conditions.some((condition: Condition | ConditionChain) => evaluateCondition(condition, object))
  return false;
};

function evaluateCondition(condition: Condition | ConditionChain, object: Record<string, unknown>) : boolean {
  if ("conditions" in condition && "operator" in condition)
    return evaluateConditionChain(condition, object)
  const value: any = get(object, condition.key)
  switch (condition.operator) {
    case "equal":
      return value === condition.value
    case "notEqual":
      return value !== condition.value
    case "greaterThan":
      return value > condition.value
    case "greaterThanOrEqual":
      return value >= condition.value
    case "lessThan":
      return value < condition.value
    case "lessThanOrEqual":
      return value <= condition.value
    case "contains":
      if (typeof value === 'string' || Array.isArray(value))
        return value.includes(condition.value)
      return false
    case "notContains":
      if (typeof value === 'string' || Array.isArray(value))
        return !value.includes(condition.value)
      return false
    default:
      return false
  }
}


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