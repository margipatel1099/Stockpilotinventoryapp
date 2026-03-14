import { useState } from "react";
import { FileEdit, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { products, warehouses } from "../data/mockData";
import { toast } from "sonner";

export function Adjustments() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [countedQuantity, setCountedQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdjustment = () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    if (!countedQuantity || parseInt(countedQuantity) < 0) {
      toast.error("Please enter a valid counted quantity");
      return;
    }

    if (!reason) {
      toast.error("Please select a reason for adjustment");
      return;
    }

    const product = products.find((p) => p.id.toString() === selectedProduct);
    const counted = parseInt(countedQuantity);
    const difference = counted - (product?.stock || 0);

    // Mock adjustment
    toast.success(
      `Stock adjustment logged! ${difference > 0 ? "Increased" : "Decreased"} by ${Math.abs(difference)} units`
    );

    setSelectedProduct("");
    setSelectedWarehouse("");
    setCountedQuantity("");
    setReason("");
    setNotes("");
  };

  const getProductDetails = () => {
    if (!selectedProduct) return null;
    return products.find((p) => p.id.toString() === selectedProduct);
  };

  const calculateDifference = () => {
    const product = getProductDetails();
    if (!product || !countedQuantity) return 0;
    return parseInt(countedQuantity) - product.stock;
  };

  const product = getProductDetails();
  const difference = calculateDifference();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Adjustment</h1>
        <p className="text-gray-600 mt-1">Adjust stock levels after physical count or discrepancies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Adjustment Form */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>New Adjustment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Warehouse Selection */}
              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse</Label>
                <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                  <SelectTrigger id="warehouse">
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product">
                    <SelectValue placeholder="Select product to adjust" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} ({product.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Stock Display */}
              {product && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">SKU</p>
                      <p className="font-semibold font-mono">{product.sku}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Stock</p>
                      <p className="font-semibold text-gray-900">{product.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold font-mono">{product.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Counted Quantity */}
              <div className="space-y-2">
                <Label htmlFor="counted">Counted Quantity</Label>
                <Input
                  id="counted"
                  type="number"
                  placeholder="Enter physical count"
                  value={countedQuantity}
                  onChange={(e) => setCountedQuantity(e.target.value)}
                  disabled={!selectedProduct}
                />
              </div>

              {/* Difference Display */}
              {product && countedQuantity && (
                <div
                  className={`rounded-lg p-4 border ${
                    difference === 0
                      ? "bg-green-50 border-green-200"
                      : difference > 0
                      ? "bg-blue-50 border-blue-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Adjustment</p>
                      <p className="text-lg font-bold">
                        {difference > 0 ? "+" : ""}
                        {difference} units
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">New Stock</p>
                      <p className="text-lg font-bold text-[#4F46E5]">{countedQuantity}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical-count">Physical Count</SelectItem>
                    <SelectItem value="damage">Damaged Goods</SelectItem>
                    <SelectItem value="theft">Theft/Loss</SelectItem>
                    <SelectItem value="found">Found Items</SelectItem>
                    <SelectItem value="error">System Error Correction</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details about this adjustment..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAdjustment}
                  className="bg-[#4F46E5] hover:bg-[#4338CA]"
                  disabled={!selectedProduct || !countedQuantity || !reason}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Adjustment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct("");
                    setSelectedWarehouse("");
                    setCountedQuantity("");
                    setReason("");
                    setNotes("");
                  }}
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileEdit className="h-5 w-5 mr-2 text-[#4F46E5]" />
                Adjustment Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-1">When to Adjust</p>
                  <ul className="text-gray-600 space-y-1 list-disc list-inside">
                    <li>After physical inventory count</li>
                    <li>When items are damaged</li>
                    <li>When discrepancies are found</li>
                    <li>To correct system errors</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Best Practices</p>
                  <ul className="text-gray-600 space-y-1 list-disc list-inside">
                    <li>Always provide a clear reason</li>
                    <li>Document discrepancies</li>
                    <li>Review before saving</li>
                    <li>Perform regular counts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                All adjustments are automatically logged in the system with timestamp, user, and reason for compliance and audit purposes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Common Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Physical Count</span>
                  <span className="font-semibold">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Damaged Goods</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">System Error</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other</span>
                  <span className="font-semibold">15%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
