import type { FC } from "react";

export interface DrawerProps {
  open: boolean;
  relationId: number;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({ open, relationId, onClose }) => {
  // TODO: implement
  return <></>;
};

// TODO: implement
export const headerComponentMap = {
  tabs: () => {},
  addPaymentButton: () => {},
  actionsDropdown: () => {},
  sendEmailButton: () => {},
  printButton: () => {},
  convertToPdfButton: () => {},
  editButton: () => {},
  duplicateButton: () => {},
};

// TODO: implement
export const bodyComponentMap = {
  status: () => {},
  details: () => {},
  items: () => {},
  totals: () => {},
  payments: () => {},
  addPaymentForm: () => {},
  extra: () => {},
};

// TODO: implement
export const footerComponentMap = {};
