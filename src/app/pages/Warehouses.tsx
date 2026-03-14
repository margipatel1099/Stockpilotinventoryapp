import { useState } from "react";
import { Warehouse, Plus, Edit, MapPin, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { warehouses as initialWarehouses, products } from "../data/mockData";
import { toast } from "sonner";

export function Warehouses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const handleCreateWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Warehouse created successfully!");
    setIsDialogOpen(false);
    setNewWarehouse({ name: "", location: "", capacity: "" });
  };

  const getWarehouseStats = (warehouseName: string) => {
    const warehouseProducts = products.filter((p) => p.warehouse === warehouseName);
    const totalStock = warehouseProducts.reduce((sum, p) => sum + p.stock, 0);
    const uniqueProducts = warehouseProducts.length;
    return { totalStock, uniqueProducts };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Warehouse Management</h1>
          <p className="text-gray-600 mt-1">Manage warehouse locations and stock assignments</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4F46E5] hover:bg-[#4338CA]">
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Warehouse</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateWarehouse} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="warehouse-name">Warehouse Name</Label>
                <Input
                  id="warehouse-name"
                  placeholder="e.g., East Coast Distribution"
                  value={newWarehouse.name}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location/Building</Label>
                <Input
                  id="location"
                  placeholder="e.g., Building D"
                  value={newWarehouse.location}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, location: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (units)</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 10000"
                  value={newWarehouse.capacity}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: e.target.value })}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#4F46E5] hover:bg-[#4338CA]">
                  Create Warehouse
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialWarehouses.map((warehouse) => {
          const stats = getWarehouseStats(warehouse.name);
          const utilizationPercent = ((stats.totalStock / warehouse.capacity) * 100).toFixed(1);

          return (
            <Card key={warehouse.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-[#4F46E5] bg-opacity-10 rounded-lg flex items-center justify-center">
                      <Warehouse className="h-6 w-6 text-[#4F46E5]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3" />
                        {warehouse.location}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Total Stock</p>
                    <p className="text-xl font-bold text-gray-900">{stats.totalStock.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Products</p>
                    <p className="text-xl font-bold text-gray-900">{stats.uniqueProducts}</p>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Capacity Utilization</span>
                    <span className="font-semibold text-gray-900">{utilizationPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#4F46E5] h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(parseFloat(utilizationPercent), 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {stats.totalStock.toLocaleString()} / {warehouse.capacity.toLocaleString()} units
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Package className="h-4 w-4 mr-2" />
                    View Stock
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Warehouses</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{initialWarehouses.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Capacity</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {initialWarehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Stock</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {products.reduce((sum, p) => sum + p.stock, 0).toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Locations Map Placeholder */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Warehouse Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Interactive warehouse map would appear here</p>
              <p className="text-sm text-gray-500 mt-1">Showing locations of all warehouse facilities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
