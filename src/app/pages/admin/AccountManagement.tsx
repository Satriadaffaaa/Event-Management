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
import { Checkbox } from '../../components/ui/checkbox';
import { Users, Plus, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { mockAccounts, mockRoles, mockEvents, mockSubEvents, Account } from '../../lib/mockData';
import { toast } from 'sonner';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
    eventIds: [] as string[],
    subEventIds: [] as string[],
    status: 'active' as 'active' | 'inactive'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      roleId: '',
      eventIds: [],
      subEventIds: [],
      status: 'active'
    });
    setEditingAccount(null);
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name,
      email: account.email,
      password: account.password,
      roleId: account.roleId,
      eventIds: account.eventIds,
      subEventIds: account.subEventIds,
      status: account.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (accountId: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      setAccounts(prev => prev.filter(a => a.id !== accountId));
      toast.success('Account deleted successfully');
    }
  };

  const toggleStatus = (accountId: string) => {
    setAccounts(prev => prev.map(acc =>
      acc.id === accountId
        ? { ...acc, status: acc.status === 'active' ? 'inactive' : 'active' }
        : acc
    ));
    toast.success('Account status updated');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.roleId) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!editingAccount && !formData.password) {
      toast.error('Password is required for new accounts');
      return;
    }

    if (editingAccount) {
      setAccounts(prev => prev.map(a =>
        a.id === editingAccount.id
          ? { ...a, ...formData }
          : a
      ));
      toast.success('Account updated successfully');
    } else {
      const newAccount: Account = {
        id: String(accounts.length + 1),
        ...formData,
        createdAt: new Date().toISOString()
      };
      setAccounts(prev => [...prev, newAccount]);
      toast.success('Account created successfully');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEventToggle = (eventId: string) => {
    setFormData(prev => ({
      ...prev,
      eventIds: prev.eventIds.includes(eventId)
        ? prev.eventIds.filter(id => id !== eventId)
        : [...prev.eventIds, eventId]
    }));
  };

  const handleSubEventToggle = (subEventId: string) => {
    setFormData(prev => ({
      ...prev,
      subEventIds: prev.subEventIds.includes(subEventId)
        ? prev.subEventIds.filter(id => id !== subEventId)
        : [...prev.subEventIds, subEventId]
    }));
  };

  const getAvailableSubEvents = () => {
    if (formData.eventIds.length === 0) return [];
    return mockSubEvents.filter(se => formData.eventIds.includes(se.eventId));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Account Management</h1>
            <p className="text-gray-600">Manage admin accounts and event organizers</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Accounts"
            value={accounts.length}
            icon={Users}
          />
          <StatsCard
            title="Active"
            value={accounts.filter(a => a.status === 'active').length}
            icon={UserCheck}
          />
          <StatsCard
            title="Inactive"
            value={accounts.filter(a => a.status === 'inactive').length}
            icon={UserX}
          />
          <StatsCard
            title="Roles"
            value={mockRoles.length}
            icon={Users}
          />
        </div>

        {/* Accounts Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Accounts ({accounts.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" aria-describedby="account-form-description">
                <DialogHeader>
                  <DialogTitle>{editingAccount ? 'Edit Account' : 'Create New Account'}</DialogTitle>
                </DialogHeader>
                <p id="account-form-description" className="sr-only">
                  {editingAccount ? 'Edit the account details below' : 'Fill in the form to create a new account'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password {!editingAccount && '*'}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder={editingAccount ? "Leave blank to keep current" : "Enter password"}
                        required={!editingAccount}
                      />
                    </div>

                    <div>
                      <Label htmlFor="roleId">Role *</Label>
                      <Select value={formData.roleId} onValueChange={(value) => setFormData({ ...formData, roleId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockRoles.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-3 block">Assign Events</Label>
                    <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-3">
                      {mockEvents.map(event => (
                        <div key={event.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`event-${event.id}`}
                            checked={formData.eventIds.includes(event.id)}
                            onCheckedChange={() => handleEventToggle(event.id)}
                          />
                          <label
                            htmlFor={`event-${event.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {event.title}
                          </label>
                        </div>
                      ))}
                      {mockEvents.length === 0 && (
                        <p className="text-sm text-gray-400">No events available</p>
                      )}
                    </div>
                  </div>

                  {formData.eventIds.length > 0 && (
                    <div>
                      <Label className="mb-3 block">Assign Booths/Sub-Events</Label>
                      <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-3">
                        {getAvailableSubEvents().map(subEvent => (
                          <div key={subEvent.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subevent-${subEvent.id}`}
                              checked={formData.subEventIds.includes(subEvent.id)}
                              onCheckedChange={() => handleSubEventToggle(subEvent.id)}
                            />
                            <label
                              htmlFor={`subevent-${subEvent.id}`}
                              className="text-sm cursor-pointer flex-1"
                            >
                              {subEvent.title} ({mockEvents.find(e => e.id === subEvent.eventId)?.title})
                            </label>
                          </div>
                        ))}
                        {getAvailableSubEvents().length === 0 && (
                          <p className="text-sm text-gray-400">No booths available for selected events</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingAccount ? 'Update Account' : 'Create Account'}
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Booths</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map(account => {
                  const role = mockRoles.find(r => r.id === account.roleId);
                  return (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{account.name}</div>
                          <div className="text-sm text-gray-500">ID: {account.id}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{account.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{role?.name || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{account.eventIds.length} event(s)</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{account.subEventIds.length} booth(s)</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={account.status === 'active' ? 'default' : 'secondary'}
                          className={account.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}
                        >
                          {account.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleStatus(account.id)}
                            className="h-8 w-8"
                            title={account.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {account.status === 'active' ? (
                              <UserX className="h-4 w-4 text-orange-600" />
                            ) : (
                              <UserCheck className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(account)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(account.id)}
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
