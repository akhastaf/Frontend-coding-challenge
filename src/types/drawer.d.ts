import {
  bodyComponentMap,
  footerComponentMap,
  headerComponentMap,
} from "@/components/Drawer";
import { Invoice } from "./invoice";
import { ConditionChain } from "@/utils/evaluateConditionChain";

export interface DrawerConfig {
  relationName: RelationName;
  headerLeft: {
    /** @NOTE this property affects the whole header background for now, antd doesn't support style for each header side */
    backgroundColor?: string;
    textColor?: string;
    components: Array<HeaderDrawerComponentDef>;
  };
  headerRight: {
    components: Array<HeaderDrawerComponentDef>;
  };
  body: {
    tabs: Array<DrawerTabDef>;
  };
  footer: {
    components: Array<FooterDrawerComponentDef>;
  };
}

export interface DrawerTabDef {
  name: string;
  showInTabsList: boolean;
  components: Array<BodyDrawerComponentDef>;
}

export interface DrawerDocumentSubjectConfig {
  fields: Array<string>;
  addressFields: Array<string>;
}

export interface DrawerDocumentItemsConfig {
  customFields: boolean;
  fields: Array<string>;
}

export interface DrawerDocumentTotalsConfig {
  fields: Array<string>;
  align?: "left" | "right";
}

export interface DrawerDocumentPaymentsConfig {
  customFields: boolean;
  fields: Array<string>;
}

export interface DrawerDocumentMarginConfig {
  fields: Array<string>;
}

export interface DrawerComponentDef {
  conditions?: ConditionChain;
  extraProps?: {
    [key: string]: any;
    subject?: DrawerDocumentSubjectConfig;
    items?: DrawerDocumentItemsConfig;
  };
}

export interface HeaderDrawerComponentDef extends DrawerComponentDef {
  name: HeaderComponentName;
}

export interface BodyDrawerComponentDef extends DrawerComponentDef {
  name: BodyComponentName;
}

export interface FooterDrawerComponentDef extends DrawerComponentDef {
  name: FooterComponentName;
}

export type HeaderComponentMap = typeof headerComponentMap;
export type HeaderComponentName = keyof HeaderComponentMap;
export type HeaderComponent = HeaderComponentMap[HeaderComponentName];

export type BodyComponentMap = typeof bodyComponentMap;
export type BodyComponentName = keyof BodyComponentMap;
export type BodyComponent = BodyComponentMap[BodyComponentName];

export type FooterComponentMap = typeof footerComponentMap;
export type FooterComponentName = keyof FooterComponentMap;
export type FooterComponent = FooterComponentMap[FooterComponentName];

export interface RelationMap {
  invoices: Invoice;
  estimates: Estimate;
}

export type RelationName = keyof RelationMap;
export type Relation = RelationMap[RelationName];

export interface DrawerState {
  relation: Relation | undefined;
  config: DrawerConfig;
  currentTab?: string;
  refetch: () => void;
  setRelation: (relation: Relation | undefined) => void;
  setCurrentTab: (currentTab: string) => void;
  setRefetch: (refetch: () => void) => void;
  goToMainTab: () => void;
}
