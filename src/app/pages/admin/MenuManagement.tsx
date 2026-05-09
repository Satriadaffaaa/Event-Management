import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Menu as MenuIcon, Plus, Edit, Trash2, FolderTree } from 'lucide-react';
import { mockMenus, Menu } from '../../lib/mockData';
import { toast } from 'sonner';

const iconOptions = [
  'LayoutDashboard', 'Calendar', 'Store', 'Users', 'Award', 'Clock', 
  'UserCheck', 'BarChart', 'QrCode', 'Settings', 'Shield', 'Menu', 
  'Lock', 'Home', 'FileText', 'Inbox', 'Bell', 'Search'
];

export default function MenuManagement() {
  const [menus, setMenus] = useState<Menu[]>(mockMenus);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    path: '',
    icon: 'Menu',
    parentId: null as string | null,
    order: 1
  });

  const resetForm = () => {
    setFormData({
      name: '',
      path: '',
      icon: 'Menu',
      parentId: null,
      order: 1
    });
    setEditingMenu(null);
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      parentId: menu.parentId,
      order: menu.order
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (menuId: string) => {
    const childMenus = menus.filter(m => m.parentId === menuId);
    if (childMenus.length > 0) {
      toast.error(`Cannot delete menu. It has ${childMenus.length} submenu(s).`);
      return;
    }

    if (confirm('Are you sure you want to delete this menu?')) {
      setMenus(prev => prev.filter(m => m.id !== menuId));
      toast.success('Menu deleted successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.path.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingMenu) {
      setMenus(prev => prev.map(m =>
        m.id === editingMenu.id
          ? { ...m, ...formData }
          : m
      ));
      toast.success('Menu updated successfully');
    } else {
      const newMenu: Menu = {
        id: String(menus.length + 1),
        ...formData
      };
      setMenus(prev => [...prev, newMenu]);
      toast.success('Menu created successfully');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const getParentMenus = () => {
    return menus.filter(m => m.parentId === null);
  };

  const getChildMenus = (parentId: string) => {
    return menus.filter(m => m.parentId === parentId);
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return 'Root';
    const parent = menus.find(m => m.id === parentId);
    return parent?.name || 'Unknown';
  };

  const parentMenuCount = menus.filter(m => m.parentId === null).length;
  const childMenuCount = menus.filter(m => m.parentId !== null).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Menu Management</h1>
            <p className="text-gray-600">Manage navigation menu items</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Menus"
            value={menus.length}
            icon={MenuIcon}
          />
          <StatsCard
            title="Parent Menus"
            value={parentMenuCount}
            icon={FolderTree}
          />
          <StatsCard
            title="Sub Menus"
            value={childMenuCount}
            icon={MenuIcon}
          />
        </div>

        {/* Menus Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Menus ({menus.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Menu
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" aria-describedby="menu-form-description">
                <DialogHeader>
                  <DialogTitle>{editingMenu ? 'Edit Menu' : 'Create New Menu'}</DialogTitle>
                </DialogHeader>
                <p id="menu-form-description" className="sr-only">
                  {editingMenu ? 'Edit the menu details below' : 'Fill in the form to create a new menu'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Menu Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Dashboard"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="path">Path *</Label>
                    <Input
                      id="path"
                      value={formData.path}
                      onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                      placeholder="e.g., /admin/dashboard"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="icon">Icon</Label>
                      <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map(icon => (
                            <SelectItem key={icon} value={icon}>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="order">Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="parentId">Parent Menu</Label>
                    <Select 
                      value={formData.parentId || 'none'} 
                      onValueChange={(value) => setFormData({ ...formData, parentId: value === 'none' ? null : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent menu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Root Menu)</SelectItem>
                        {getParentMenus().map(menu => (
                          <SelectItem key={menu.id} value={menu.id}>
                            {menu.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingMenu ? 'Update Menu' : 'Create Menu'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Menu Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Sub Menus</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus
                  .sort((a, b) => {
                    if (a.parentId === b.parentId) {
                      return a.order - b.order;
                    }
                    return (a.parentId || '0').localeCompare(b.parentId || '0');
                  })
                  .map(menu => {
                    const childCount = getChildMenus(menu.id).length;
                    return (
                      <TableRow key={menu.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {menu.parentId && (
                              <span className="text-gray-400 text-xs">└─</span>
                            )}
                            <MenuIcon className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{menu.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 font-mono text-sm">
                          {menu.path}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{menu.icon}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getParentName(menu.parentId)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{menu.order}</TableCell>
                        <TableCell>
                          {childCount > 0 ? (
                            <Badge className="bg-blue-100 text-blue-800">
                              {childCount} sub-menu(s)
                            </Badge>
                          ) : (
                            <span className="text-gray-400 text-sm">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(menu)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(menu.id)}
                              className="h-8 w-8 text-red-600 hover:text-red-900 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
