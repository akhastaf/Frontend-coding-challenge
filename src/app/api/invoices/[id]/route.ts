import type { NextRequest, NextResponse } from "next/server";
import invoices from "../invoices.json";
import { Invoice } from "@/types/invoice";

// @ts-ignore
const invoiceList = invoices.data as Array<Invoice>;

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  console.log(params);

  const invoice = invoiceList.find((invoice: Invoice) => params.id === `${invoice.id}`);


  if (!invoice) {
    return new Response(JSON.stringify({}), {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(invoice), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
