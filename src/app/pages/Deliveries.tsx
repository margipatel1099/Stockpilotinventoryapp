import { useState } from "react";
import { Plus, Truck, Trash2, PackageCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { products, pendingDeliveries } from "../data/mockData";
import { toast } from "sonner";

export function Deliveries() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deliveryItems, setDeliveryItems] = useState<Array<{ product: string; quantity: number }>>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
      toast.error("Please select a product and enter a valid quantity");
      return;
    }

    const product = products.find((p) => p.id.toString() === selectedProduct);
    const requestedQty = parseInt(quantity);

    if (product && product.stock < requestedQty) {
      toast.error(`Insufficient stock! Available: ${product.stock} units`);
      return;
    }

    setDeliveryItems([
      ...deliveryItems,
      { product: selectedProduct, quantity: requestedQty },
    ]);
    setSelectedProduct("");
    setQuantity("");
    toast.success("Item added to delivery order");
  };

  const handleRemoveItem = (index: number) => {
    setDeliveryItems(deliveryItems.filter((_, i) => i !== index));
    toast.info("Item removed from delivery");
  };

  const handleShipOrder = () => {
    if (!customerName || !customerEmail) {
      toast.error("Please enter customer details");
      return;
    }

    if (deliveryItems.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    // Mock shipment
    toast.success("Delivery order created! Stock has been reduced.");
    setCustomerName("");
    setCustomerEmail("");
    setDeliveryItems([]);
  };

  const getProductDetails = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    return product;
  };

  const getTotalItems = () => {
    return deliveryItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Delivery Orders</h1>
        <p className="text-gray-600 mt-1">Pick, pack, and ship products to customers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delivery Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>New Delivery Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <Label>Customer Information</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Customer Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Customer Email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Add Products */}
              <div className="space-y-4">
                <Label>Pick Products</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products
                          .filter((p) => p.stock > 0)
                          .map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name} ({product.sku}) - Available: {product.stock}
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

              {/* Delivery Items */}
              {deliveryItems.length > 0 && (
                <div className="space-y-3">
                  <Label>Delivery Items</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Available</TableHead>
                          <TableHead className="w-20"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deliveryItems.map((item, index) => {
                          const product = getProductDetails(item.product);
                          return (
                            <TableRow key={index}>
                              <TableCell>{product?.name}</TableCell>
                              <TableCell className="font-mono text-sm">{product?.sku}</TableCell>
                              <TableCell className="text-right font-semibold">
                                {item.quantity}
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-600">
                                {product?.stock}
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
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Total Items:</span>
                    <span className="text-lg font-bold text-[#4F46E5]">{getTotalItems()}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleShipOrder}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={deliveryItems.length === 0 || !customerName || !customerEmail}
                >
                  <PackageCheck className="h-4 w-4 mr-2" />
                  Ship Order
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCustomerName("");
                    setCustomerEmail("");
                    setDeliveryItems([]);
                  }}
                >
                  Clear Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Deliveries */}
        <div>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-purple-600" />
                Pending Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{delivery.id}</p>
                        <p className="text-sm text-gray-600">{delivery.customer}</p>
                      </div>
                      <Badge
                        className={
                          delivery.status === "Ready to Ship"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }
                      >
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Items: {delivery.items}</p>
                      <p>Delivery: {delivery.deliveryDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Guide */}
          <Card className="border-0 shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-base">Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pick Items</p>
                    <p className="text-xs text-gray-600">Select products from inventory</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Verify Stock</p>
                    <p className="text-xs text-gray-600">System checks availability</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Ship Order</p>
                    <p className="text-xs text-gray-600">Stock auto-deducted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
