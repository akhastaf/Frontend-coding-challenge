import { useQuery } from "@tanstack/react-query";

export const useInvoice = (relationId: number) => {
  const fetchInvoice = async () => {
    const response = await fetch(`/api/invoices/${relationId}`);

    return response.json();
  };

  return useQuery(
    [relationId],
    fetchInvoice,
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );
};