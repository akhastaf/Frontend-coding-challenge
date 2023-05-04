import { UseQueryResult } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";
import { createContext, useContext, useReducer } from "react";
import { SET_CURRENT_TAB, SET_RELATION, SET_REFETCH } from "./actions";
import { reducer } from "./reducer";
import { DrawerConfig, DrawerState, Relation } from "@/types/drawer";

const contextDefaultValue = {
  relation: undefined,
  config: {} as DrawerConfig,
  refetch: () => {},
  setCurrentTab: (tab: string) => {},
  setRelation: (relation: Relation | undefined) => {},
  setRefetch: (refetch: () => void) => {},
  goToMainTab: () => {},
};

const DrawerContext = createContext<DrawerState>(contextDefaultValue);

const DrawerProvider: FC<PropsWithChildren & { config: DrawerConfig }> = ({
  children,
  config,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...contextDefaultValue,
    config,
  });

  const setCurrentTab = (tab: string) => {
    dispatch({
      type: SET_CURRENT_TAB,
      payload: { currentTab: tab },
    });
  };

  const setRelation = (relation: Relation | undefined) => {
    dispatch({
      type: SET_RELATION,
      payload: { relation },
    });
  };

  const setRefetch = (refetch: (() => void) | undefined) => {
    dispatch({
      type: SET_REFETCH,
      payload: { refetch },
    });
  };

  const goToMainTab = () => {
    dispatch({
      type: SET_CURRENT_TAB,
      payload: { currentTab: config.body.tabs[0].name },
    });
  };

  return (
    <DrawerContext.Provider
      value={{
        ...state,
        setCurrentTab,
        setRelation,
        setRefetch,
        goToMainTab,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export { DrawerContext, DrawerProvider };
