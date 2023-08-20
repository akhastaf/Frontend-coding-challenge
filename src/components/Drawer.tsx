import { useInvoice } from "@/hooks/useInvoice";
import { Button, Space, Drawer as AntDrawer } from "antd";
import type { FC } from "react";

export interface DrawerProps {
  open: boolean;
  relationId: number;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({ open, relationId, onClose }) => {
  // TODO: implement
  const { data: invoice } = useInvoice(relationId)
  console.log(JSON.stringify(invoice))
  return <>
    <AntDrawer
        title="Invoice"
        placement="right"
        size="large"
        onClose={onClose}
        open={open}
        
      >
        {/* <p>{ invoice.id }</p> */}
      </AntDrawer>
  </>;
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
