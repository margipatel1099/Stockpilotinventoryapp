import { useState } from "react";
import { History as HistoryIcon, Download, Filter, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { stockMovementHistory, products, warehouses } from "../data/mockData";

export function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [warehouseFilter, setWarehouseFilter] = useState("all");

  const filteredHistory = stockMovementHistory.filter((entry) => {
    const matchesSearch =
      entry.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || entry.type.toLowerCase() === typeFilter;

    const matchesWarehouse =
      warehouseFilter === "all" || entry.warehouse === warehouseFilter;

    return matchesSearch && matchesType && matchesWarehouse;
  });

  const getTypeBadge = (type: string) => {
    const styles = {
      Receipt: "bg-green-500 hover:bg-green-600",
      Delivery: "bg-purple-500 hover:bg-purple-600",
      Transfer: "bg-orange-500 hover:bg-orange-600",
      Adjustment: "bg-blue-500 hover:bg-blue-600",
    };
    return <Badge className={styles[type as keyof typeof styles] || ""}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Movement History</h1>
          <p className="text-gray-600 mt-1">Complete audit trail of all inventory transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by product, SKU, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="receipt">Receipts</SelectItem>
                <SelectItem value="delivery">Deliveries</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="adjustment">Adjustments</SelectItem>
              </SelectContent>
            </Select>

            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                {warehouses.map((w) => (
                  <SelectItem key={w.id} value={w.name}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movement Ledger */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HistoryIcon className="h-5 w-5 mr-2 text-[#4F46E5]" />
            Movement Ledger ({filteredHistory.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Balance Before</TableHead>
                  <TableHead className="text-right">Balance After</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {entry.date}
                    </TableCell>
                    <TableCell>{getTypeBadge(entry.type)}</TableCell>
                    <TableCell>{entry.product}</TableCell>
                    <TableCell className="font-mono text-sm">{entry.sku}</TableCell>
                    <TableCell>{entry.warehouse}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {entry.quantity > 0 ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <span
                          className={`font-semibold ${
                            entry.quantity > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {entry.quantity > 0 ? "+" : ""}
                          {entry.quantity}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-gray-600">
                      {entry.balanceBefore}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {entry.balanceAfter}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{entry.reference}</TableCell>
                    <TableCell>{entry.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <HistoryIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No movement history found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ArrowUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Receipts</p>
                <p className="text-xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ArrowDown className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deliveries</p>
                <p className="text-xl font-bold text-gray-900">189</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <HistoryIcon className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transfers</p>
                <p className="text-xl font-bold text-gray-900">67</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HistoryIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Adjustments</p>
                <p className="text-xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
