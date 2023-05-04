import { DrawerState } from "@/types/drawer";
import {
  SET_CURRENT_TAB,
  SET_RELATION,
  SET_REFETCH,
} from "./actions";

interface Action<Payload> {
  type: string;
  payload?: {
    [key: string]: Payload;
  };
}

export const reducer = (
  state: DrawerState,
  action: Action<any>
): DrawerState => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_TAB: {
      // TODO: implement
      return state;
    }
    case SET_RELATION: {
      // TODO: implement
      return state;
    }
    case SET_REFETCH: {
      // TODO: implement
      return state;
    }
    default: {
      throw new Error("Invalid Action");
    }
  }
};