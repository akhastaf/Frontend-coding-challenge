import { useQuery } from "@tanstack/react-query";

export const useInvoices = () => {
  const fetchInvoices = async () => {
    const response = await fetch("/api/invoices");

    return response.json();
  };

  return useQuery(
    ["invoices"],
    fetchInvoices,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
};