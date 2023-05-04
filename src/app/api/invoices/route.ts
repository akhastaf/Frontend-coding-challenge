import invoices from "./invoices.json";

export async function GET(request: Request) {
  return new Response(JSON.stringify(invoices), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}
