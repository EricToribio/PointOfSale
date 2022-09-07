
interface tableHeader {
    Name: string;
    Tab:string;
}

export const tableHeaders : tableHeader[] = [
    {Name: "Open Invoices", Tab: "openInvoices"},
    {Name: "Waiting for pick up", Tab: "pickUp"},
    {Name: "Paid Invoices", Tab: "paidInvoices"},
    {Name: "All Invoices", Tab: "allInvoices"}
]