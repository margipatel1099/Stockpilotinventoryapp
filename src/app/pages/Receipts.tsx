import { useState } from "react";
import { Plus, PackageCheck, Trash2, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { suppliers, products, pendingReceipts } from "../data/mockData";
import { toast } from "sonner";

export function Receipts() {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [receiptItems, setReceiptItems] = useState<Array<{ product: string; quantity: number }>>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    setReceiptItems([
      ...receiptItems,
      { product: selectedProduct, quantity: parseInt(quantity) },
    ]);
    setSelectedProduct("");
    setQuantity("");
    toast.success("Item added to receipt");
  };

  const handleRemoveItem = (index: number) => {
    setReceiptItems(receiptItems.filter((_, i) => i !== index));
    toast.info("Item removed from receipt");
  };

  const handleValidateReceipt = () => {
    if (!selectedSupplier) {
      toast.error("Please select a supplier");
      return;
    }

    if (receiptItems.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    // Mock validation
    toast.success("Receipt validated! Stock has been updated.");
    setSelectedSupplier("");
    setReceiptItems([]);
  };

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    return product ? `${product.name} (${product.sku})` : "";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Goods Receipt</h1>
        <p className="text-gray-600 mt-1">Receive products from suppliers and update inventory</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Receipt Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>New Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Supplier Selection */}
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSupplier && (
                  <p className="text-sm text-gray-600">
                    Contact: {suppliers.find((s) => s.id.toString() === selectedSupplier)?.email}
                  </p>
                )}
              </div>

              {/* Add Products */}
              <div className="space-y-4">
                <Label>Add Products</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
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
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full sm:w-32"
                  />
                  <Button onClick={handleAddItem} type="button" className="bg-[#4F46E5] hover:bg-[#4338CA]">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Receipt Items */}
              {receiptItems.length > 0 && (
                <div className="space-y-3">
                  <Label>Receipt Items</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="w-20"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {receiptItems.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{getProductName(item.product)}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {item.quantity}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleValidateReceipt}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={receiptItems.length === 0 || !selectedSupplier}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Validate Receipt
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSupplier("");
                    setReceiptItems([]);
                  }}
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Receipts */}
        <div>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PackageCheck className="h-5 w-5 mr-2 text-green-600" />
                Pending Receipts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReceipts.map((receipt) => (
                  <div
                    key={receipt.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{receipt.id}</p>
                        <p className="text-sm text-gray-600">{receipt.supplier}</p>
                      </div>
                      <Badge
                        className={
                          receipt.status === "In Transit"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }
                      >
                        {receipt.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Items: {receipt.items}</p>
                      <p>Expected: {receipt.expectedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Guide */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-base">Quick Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Select the supplier</li>
                <li>Add products and quantities</li>
                <li>Review the receipt items</li>
                <li>Click "Validate Receipt" to update stock</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
