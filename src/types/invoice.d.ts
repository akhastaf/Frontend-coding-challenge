export interface Invoice {
  id: number;
  sent: boolean;
  sent_date: string;
  client_id: number;
  number: number;
  formatted_number: string;
  year: number;
  created_date: string;
  date: string;
  due_date: string;
  sub_total: number;
  total: number;
  adjustment: number | null;
  added_from: number;
  status_text: string;
  status_id: number;
  client_note: string;
  admin_note: string;
  last_overdue_reminder: string;
  discount_percent: number;
  discount_total: number;
  discount_type: DiscountType;
  recurring: number;
  last_recurring_date: string;
  terms: string;
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: Country;
  shipping_street: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: Country;
  include_shipping: boolean;
  show_shipping_on_invoice: boolean;
  estimate_id: number;
  estimated_date: string;
  purchase_order_id: number;
  purchase_order_date: string;
  discount_percent_customer: number;
  discount_total_customer: number;
  project_id: number;
  reference: string;
  total_net: number;
  discount_percent_total_net: number;
  template_id: number;
  template: Template;
  location_id: number;
  exchange_rate: number;
  total_changed: number;
  delivery_note_id: number;
  delivery_note_date: string;
  compta_lock: number;
  compta_submited: number;
  compta_submit_date: string;
  archive: number;
  custom_fields: Array<CustomField>;
  client: Client;
  currency: Currency;
  items: Array<Item>;
  allowed_payment_modes: Array<PaymentMode>;
  payment_records?: Array<PaymentRecord>;
  sale_agent: SaleAgent;
  status: Status;
  label?: string;
  value?: number;
}

export interface Item {
  id: number;
  quantity: number;
  product_id: number;
  reference: string;
  invoice_reference?: string;
  invoice_id?: number;
  exchange_rate?: number;
  import_file_id?: number;
  description: string;
  long_description: string;
  rate: number;
  item_order: number;
  discount: number;
  conditioning_id: number;
  batch_id: number;
  qty_text: string;
  rate_text: string;
  total_rate_text: string;
  tax: {
    id: number;
    name: string;
    rate: number;
  };
  custom_fields: CustomField[];
  product: Product;
  variations: { [key: string]: string },
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  reference_product: string;
  barcode: string;
  tag?: string;
  cost_price_ht: number;
  cost_price_ttc: number;
  price_last_purchase: number;
  selling_price: number;
  vat_category: number;
  product_category: number;
  product_image?: string;
  stock_min_security: number;
  stock_min_alert: number;
  item_type: number;
  reference: string;
  date_update: string;
  status: boolean;
  variations: any[];
  total_locations_stock: number;
  category?: {
    id: number;
    name: string;
    intitule_discount: string;
    percentage_discount: number;
    show_in_invoice_discount: boolean;
    intitule_increases: string;
    percentage_increases: number;
    show_in_invoice_increases: boolean;
  };
  tax?: {
    id: number;
    name: string;
    rate: number;
  };
  stock: {
    id: number;
    location_id: number;
    batch_id: number;
    unit: number;
    product_id: number;
    location?: any;
    batch?: any;
  };
  custom_fields: CustomField[];
  item_types: {
    id: number;
    name: string;
    default_id: number;
  }[];
}

export type DiscountType = "before_tax" | "after_tax" | "no_discount";

export interface Country {
  id: number;
  short_name: string;
  long_name: string;
  iso2: string;
}

export interface Template {
  id: number;
  name: string;
  active: number;
  file_for: number;
  rel_type: string;
}

export interface CustomField {
  id?: number;
  value: string;
  rel_id?: number;
  id_plus?: number;
  field_to?: string;
  field_id: number;
  field_type?: string;
  field_name?: string;
}

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  phonenumber: string;
  email: string;
  code: string;
  vat: string;
  city: string;
  country: Country;
  address: string;
  active: string;
  company?: Client;
  billing_street: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billingCountry: Country;
  defaultCurrency: Currency;
  credit_max: number;
  discount_name: string;
  discount_percent: number;
  ice: string;
  zip: string;
  state: string;
  shipping_street: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shippingCountry: Country;
  longitude: string;
  latitude: string;
  primary_contact: string;
  account_number: string;
  name_bank: string;
  bank_address: string;
  discount_show_in_invoice: number;
  groups: { [key: string]: number | string }[];
  payment_period: number;
  created_at: string;
  custom_fields?: Array<CustomField>;
  entreprise?: Enterprise;
  label?: string;
  value?: number;
}

export interface Currency {
  id: number;
  name: string;
  full_name: string;
  symbol: string;
  is_default: boolean;
  default_exchange_rate: number;
}

export interface PaymentMode {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  default_id: number;
  label?: string;
  value?: number;
}

export interface PaymentRecord {
  addedfrom: number;
  amount: number;
  avoir_id: number;
  date: Date;
  daterecorded: Date;
  exchange_rate: number;
  id: number;
  id_entreprise: number;
  invoice?: Invoice;
  invoice_id: number;
  note: string;
  paymentmode: number;
  payment_mode: PaymentMode,
  total_changed: number;
  transaction: null;
  transaction_id: string | null;
  cheque?: Cheque;
  custom_fields?: Array<CustomField>;
}

export interface Cheque {
  id: number;
  entreprise_id: number;
  payment_id: number;
  bank_id: number;
  is_supplier: boolean;
  number: string;
  due_date: Date;
  status: number;
  comment: string;
  effet: boolean;
  datecreated: Date;
  addedfrom: number;
}

export interface SaleAgent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  admin: boolean;
  default_client_id: number;
  default_payment_mode_id: number;
  is_pos_active: boolean;
  location_id: number;
  language: string;
}

export interface Status {
  id: number;
  label: string;
  color: string;
}

export interface Enterprise {
  id?: number | string;
  name: string;
  pack: number;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  ice: string;
  cnss: string;
  if: string;
  patente: string;
  rc: string;
  logo: string;
}