import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Shield, Plus, Edit, Trash2, Users } from 'lucide-react';
import { mockRoles, mockAccounts, Role } from '../../lib/mockData';
import { toast } from 'sonner';

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: ''
    });
    setEditingRole(null);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (roleId: string) => {
    const accountsWithRole = mockAccounts.filter(acc => acc.roleId === roleId);
    if (accountsWithRole.length > 0) {
      toast.error(`Cannot delete role. ${accountsWithRole.length} account(s) are using this role.`);
      return;
    }

    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
      toast.success('Role deleted successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Role name is required');
      return;
    }

    if (editingRole) {
      setRoles(prev => prev.map(r => 
        r.id === editingRole.id
          ? { ...r, name: formData.name, description: formData.description }
          : r
      ));
      toast.success('Role updated successfully');
    } else {
      const newRole: Role = {
        id: String(roles.length + 1),
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString()
      };
      setRoles(prev => [...prev, newRole]);
      toast.success('Role created successfully');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const getRoleUsageCount = (roleId: string) => {
    return mockAccounts.filter(acc => acc.roleId === roleId).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Role Management</h1>
            <p className="text-gray-600">Create and manage user roles</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Roles"
            value={roles.length}
            icon={Shield}
          />
          <StatsCard
            title="Total Accounts"
            value={mockAccounts.length}
            icon={Users}
          />
          <StatsCard
            title="Active Accounts"
            value={mockAccounts.filter(acc => acc.status === 'active').length}
            icon={Users}
          />
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Roles ({roles.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" aria-describedby="role-form-description">
                <DialogHeader>
                  <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
                </DialogHeader>
                <p id="role-form-description" className="sr-only">
                  {editingRole ? 'Edit the role details below' : 'Fill in the form to create a new role'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Role Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Event Manager"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the role's purpose and responsibilities"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingRole ? 'Update Role' : 'Create Role'}
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
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Accounts Using</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map(role => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 max-w-md">
                      {role.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{getRoleUsageCount(role.id)} account(s)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(role.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(role)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(role.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-900 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
