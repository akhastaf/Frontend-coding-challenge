"use client";

import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import { useState } from "react";
import { DrawerProvider } from "@/providers/drawer";
import { Drawer } from "@/components/Drawer";
import { DrawerConfig } from "@/types/drawer";
import { Table } from "antd";
import { useInvoices } from "@/hooks/useInvoices";
import { ColumnsType } from "antd/es/table";
import { Invoice } from "@/types/invoice";

// ** the config is supposedly coming from the server
const config: DrawerConfig = {
  relationName: "invoices",
  headerLeft: {
    components: [
      {
        name: "tabs",
      },
    ],
  },
  headerRight: {
    components: [
      {
        name: "addPaymentButton",
        conditions: {
          operator: "and",
          conditions: [
            {
              key: "status.id",
              operator: "notEqual",
              value: "2",
            },
          ],
        },
      },
      {
        name: "actionsDropdown",
        extraProps: {
          actions: [
            "add_attachment",
            "mark_as_sent",
            "update_status",
            "convert",
            "duplicate",
            "delete",
          ],
        },
      },
      {
        name: "sendEmailButton",
      },
      {
        name: "printButton",
      },
      {
        name: "convertToPdfButton",
      },
      {
        name: "editButton",
      },
    ],
  },
  body: {
    tabs: [
      {
        name: "invoice",
        showInTabsList: true,
        components: [
          {
            name: "status",
            extraProps: {
              alignment: "left",
            },
          },
          {
            name: "details",
            extraProps: {
              numberField: "formatted_number",
              fields: [
                "date",
                "due_date",
                "location.name_location",
                "sale_agent.full_name",
              ],
              subject: {
                fields: ["ice"],
                addressFields: [
                  "billing_street",
                  "billing_city",
                  "billing_state",
                  "billingCountry.short_name",
                  "billing_zip",
                ],
              },
              custom_fields: true,
            },
          },
          {
            name: "items",
            extraProps: {
              items: {
                customFields: true,
                fields: [
                  "index",
                  "reference",
                  "description",
                  "quantity",
                  "rate",
                  "discount",
                  "tax_rate",
                  "total_rate",
                ],
              },
            },
          },
          {
            name: "totals",
            extraProps: {
              fields: [
                "subtotal",
                "discount",
                "increases",
                "client_discount",
                "taxes",
                "adjustment",
                "total",
              ],
              align: "right",
            },
          },
          {
            name: "extra",
            extraProps: {
              fields: ["client_note", "terms"],
            },
          },
          {
            name: "payments",
            extraProps: {
              items: {
                customFields: true,
                fields: ["name", "mode", "date", "amount", "options"],
              },
            },
          },
        ],
      },
      {
        name: "addPayment",
        showInTabsList: false,
        components: [
          {
            name: "addPaymentForm",
          },
          {
            name: "payments",
            extraProps: {
              items: {
                customFields: true,
                fields: ["name", "mode", "date", "amount", "options"],
              },
            },
          },
        ],
      },
    ],
  },
  footer: {
    components: [],
  },
};

export default function Home() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = (id: number) => {
    setSelectedInvoiceId(id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedInvoiceId(null);
    setIsDrawerOpen(false);
  };

  const columnDef: ColumnsType<Invoice> = [
    {
      title: "Invoice",
      dataIndex: "formatted_number",
      key: "formatted_number",
      // TODO: render as clickable to open the drawer with the correct ID
      onCell: (record) => ({
        onClick: () => {
          openDrawer(record.id)
        }
      })
    },
    {
      title: "Client",
      dataIndex: "client.name",
      key: "client.name",
      render: (value, record, index) => <span>{record.client.first_name}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value, record, index) => {
        const date = new Date(value);

        return <span>{date.toLocaleDateString()}</span>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  const { data: invoicesResponse } = useInvoices();

  return (
    <>
      <Table columns={columnDef} dataSource={invoicesResponse?.data}></Table>
      {selectedInvoiceId !== null && (
        <ErrorBoundary>
          <DrawerProvider config={config}>
            <Drawer
              onClose={closeDrawer}
              open={isDrawerOpen}
              relationId={selectedInvoiceId}
            />
          </DrawerProvider>
        </ErrorBoundary>
      )}
    </>
  );
}
