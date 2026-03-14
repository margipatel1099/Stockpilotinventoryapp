export const warehouses = [
  { id: 1, name: "Main Warehouse", location: "Building A", capacity: 10000 },
  { id: 2, name: "Production Warehouse", location: "Building B", capacity: 5000 },
  { id: 3, name: "Cold Storage", location: "Building C", capacity: 3000 },
];

export const products = [
  { id: 1, name: "Widget A", sku: "WGT-001", category: "Electronics", stock: 250, location: "A-01-05", warehouse: "Main Warehouse", minStock: 100 },
  { id: 2, name: "Gadget B", sku: "GDG-002", category: "Electronics", stock: 45, location: "A-02-10", warehouse: "Main Warehouse", minStock: 50 },
  { id: 3, name: "Component C", sku: "CMP-003", category: "Parts", stock: 890, location: "B-01-03", warehouse: "Production Warehouse", minStock: 200 },
  { id: 4, name: "Tool D", sku: "TOL-004", category: "Tools", stock: 15, location: "A-03-07", warehouse: "Main Warehouse", minStock: 25 },
  { id: 5, name: "Material E", sku: "MAT-005", category: "Raw Materials", stock: 560, location: "B-02-12", warehouse: "Production Warehouse", minStock: 300 },
  { id: 6, name: "Device F", sku: "DEV-006", category: "Electronics", stock: 120, location: "A-01-09", warehouse: "Main Warehouse", minStock: 75 },
  { id: 7, name: "Part G", sku: "PRT-007", category: "Parts", stock: 340, location: "B-03-05", warehouse: "Production Warehouse", minStock: 150 },
  { id: 8, name: "Supply H", sku: "SUP-008", category: "Supplies", stock: 8, location: "C-01-02", warehouse: "Cold Storage", minStock: 20 },
];

export const categories = ["All", "Electronics", "Parts", "Tools", "Raw Materials", "Supplies"];

export const suppliers = [
  { id: 1, name: "TechCorp Industries", email: "orders@techcorp.com" },
  { id: 2, name: "Global Parts Ltd", email: "sales@globalparts.com" },
  { id: 3, name: "Supply Chain Co", email: "info@supplychain.com" },
];

export const pendingReceipts = [
  { id: "RCP-001", supplier: "TechCorp Industries", items: 3, expectedDate: "2026-03-15", status: "Pending" },
  { id: "RCP-002", supplier: "Global Parts Ltd", items: 5, expectedDate: "2026-03-16", status: "Pending" },
  { id: "RCP-003", supplier: "Supply Chain Co", items: 2, expectedDate: "2026-03-17", status: "In Transit" },
];

export const pendingDeliveries = [
  { id: "DEL-001", customer: "ABC Manufacturing", items: 4, deliveryDate: "2026-03-15", status: "Preparing" },
  { id: "DEL-002", customer: "XYZ Corp", items: 2, deliveryDate: "2026-03-16", status: "Ready to Ship" },
];

export const internalTransfers = [
  { id: "TRF-001", from: "Main Warehouse", to: "Production Warehouse", items: 3, date: "2026-03-14", status: "In Progress" },
  { id: "TRF-002", from: "Cold Storage", to: "Main Warehouse", items: 1, date: "2026-03-14", status: "Completed" },
];

export const stockMovementHistory = [
  { 
    id: 1, 
    date: "2026-03-14 10:30", 
    product: "Widget A", 
    sku: "WGT-001",
    type: "Receipt", 
    quantity: 100, 
    warehouse: "Main Warehouse", 
    reference: "RCP-100", 
    user: "John Doe",
    balanceBefore: 150,
    balanceAfter: 250
  },
  { 
    id: 2, 
    date: "2026-03-14 11:15", 
    product: "Gadget B", 
    sku: "GDG-002",
    type: "Delivery", 
    quantity: -25, 
    warehouse: "Main Warehouse", 
    reference: "DEL-045", 
    user: "Jane Smith",
    balanceBefore: 70,
    balanceAfter: 45
  },
  { 
    id: 3, 
    date: "2026-03-14 12:00", 
    product: "Component C", 
    sku: "CMP-003",
    type: "Transfer", 
    quantity: -50, 
    warehouse: "Main Warehouse", 
    reference: "TRF-022", 
    user: "Bob Wilson",
    balanceBefore: 940,
    balanceAfter: 890
  },
  { 
    id: 4, 
    date: "2026-03-14 13:45", 
    product: "Material E", 
    sku: "MAT-005",
    type: "Adjustment", 
    quantity: -10, 
    warehouse: "Production Warehouse", 
    reference: "ADJ-008", 
    user: "Alice Brown",
    balanceBefore: 570,
    balanceAfter: 560
  },
  { 
    id: 5, 
    date: "2026-03-13 09:20", 
    product: "Tool D", 
    sku: "TOL-004",
    type: "Receipt", 
    quantity: 15, 
    warehouse: "Main Warehouse", 
    reference: "RCP-099", 
    user: "John Doe",
    balanceBefore: 0,
    balanceAfter: 15
  },
  { 
    id: 6, 
    date: "2026-03-13 14:30", 
    product: "Device F", 
    sku: "DEV-006",
    type: "Delivery", 
    quantity: -30, 
    warehouse: "Main Warehouse", 
    reference: "DEL-044", 
    user: "Jane Smith",
    balanceBefore: 150,
    balanceAfter: 120
  },
  { 
    id: 7, 
    date: "2026-03-12 10:00", 
    product: "Supply H", 
    sku: "SUP-008",
    type: "Adjustment", 
    quantity: -12, 
    warehouse: "Cold Storage", 
    reference: "ADJ-007", 
    user: "Alice Brown",
    balanceBefore: 20,
    balanceAfter: 8
  },
];

export const chartData = {
  inventoryValue: [
    { month: "Sep", value: 45000 },
    { month: "Oct", value: 52000 },
    { month: "Nov", value: 48000 },
    { month: "Dec", value: 61000 },
    { month: "Jan", value: 55000 },
    { month: "Feb", value: 67000 },
    { month: "Mar", value: 71000 },
  ],
  stockMovements: [
    { name: "Receipts", value: 234 },
    { name: "Deliveries", value: 189 },
    { name: "Transfers", value: 67 },
    { name: "Adjustments", value: 23 },
  ],
  categoryDistribution: [
    { name: "Electronics", value: 415, fill: "#4F46E5" },
    { name: "Parts", value: 1230, fill: "#10B981" },
    { name: "Tools", value: 15, fill: "#F59E0B" },
    { name: "Raw Materials", value: 560, fill: "#EF4444" },
    { name: "Supplies", value: 8, fill: "#8B5CF6" },
  ],
};
