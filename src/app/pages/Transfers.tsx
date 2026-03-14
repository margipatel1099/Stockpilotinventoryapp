import { useState } from "react";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { warehouses, products, internalTransfers } from "../data/mockData";
import { toast } from "sonner";

export function Transfers() {
  const [sourceWarehouse, setSourceWarehouse] = useState("");
  const [targetWarehouse, setTargetWarehouse] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const handleTransfer = () => {
    if (!sourceWarehouse || !targetWarehouse) {
      toast.error("Please select source and target warehouses");
      return;
    }

    if (sourceWarehouse === targetWarehouse) {
      toast.error("Source and target warehouses cannot be the same");
      return;
    }

    if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    const product = products.find((p) => p.id.toString() === selectedProduct);
    const requestedQty = parseInt(quantity);

    if (product && product.stock < requestedQty) {
      toast.error(`Insufficient stock in source warehouse! Available: ${product.stock} units`);
      return;
    }

    // Mock transfer
    toast.success("Transfer initiated! Stock will be moved between warehouses.");
    setSourceWarehouse("");
    setTargetWarehouse("");
    setSelectedProduct("");
    setQuantity("");
    setNotes("");
  };

  const availableProducts = products.filter((p) => {
    if (!sourceWarehouse) return false;
    const warehouseName = warehouses.find((w) => w.id.toString() === sourceWarehouse)?.name;
    return p.warehouse === warehouseName && p.stock > 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Internal Transfers</h1>
        <p className="text-gray-600 mt-1">Move stock between warehouse locations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>New Transfer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Warehouse Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source">From Warehouse</Label>
                  <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {sourceWarehouse && (
                    <p className="text-sm text-gray-600">
                      Location: {warehouses.find((w) => w.id.toString() === sourceWarehouse)?.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">To Warehouse</Label>
                  <Select value={targetWarehouse} onValueChange={setTargetWarehouse}>
                    <SelectTrigger id="target">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses
                        .filter((w) => w.id.toString() !== sourceWarehouse)
                        .map((warehouse) => (
                          <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                            {warehouse.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {targetWarehouse && (
                    <p className="text-sm text-gray-600">
                      Location: {warehouses.find((w) => w.id.toString() === targetWarehouse)?.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Transfer Direction Visual */}
              {sourceWarehouse && targetWarehouse && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        {warehouses.find((w) => w.id.toString() === sourceWarehouse)?.name}
                      </p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-[#4F46E5]" />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900">
                        {warehouses.find((w) => w.id.toString() === targetWarehouse)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                  disabled={!sourceWarehouse}
                >
                  <SelectTrigger id="product">
                    <SelectValue placeholder={sourceWarehouse ? "Select product" : "Select source warehouse first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} ({product.sku}) - Available: {product.stock}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity to Transfer</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={!selectedProduct}
                />
                {selectedProduct && (
                  <p className="text-sm text-gray-600">
                    Available: {products.find((p) => p.id.toString() === selectedProduct)?.stock} units
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="e.g., For production line A"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleTransfer}
                  className="bg-[#4F46E5] hover:bg-[#4338CA]"
                  disabled={!sourceWarehouse || !targetWarehouse || !selectedProduct || !quantity}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Initiate Transfer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSourceWarehouse("");
                    setTargetWarehouse("");
                    setSelectedProduct("");
                    setQuantity("");
                    setNotes("");
                  }}
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transfers */}
        <div>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-2 text-orange-600" />
                Recent Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internalTransfers.map((transfer) => (
                  <div
                    key={transfer.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold text-gray-900">{transfer.id}</p>
                      <Badge
                        className={
                          transfer.status === "Completed"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-orange-500 hover:bg-orange-600"
                        }
                      >
                        {transfer.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">{transfer.from}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{transfer.to}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Items: {transfer.items}</p>
                        <p>Date: {transfer.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-base">Transfer Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Step 1:</span> Select source and target warehouses
                </p>
                <p>
                  <span className="font-medium text-gray-900">Step 2:</span> Choose product and quantity
                </p>
                <p>
                  <span className="font-medium text-gray-900">Step 3:</span> System validates stock availability
                </p>
                <p>
                  <span className="font-medium text-gray-900">Step 4:</span> Stock is transferred automatically
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
