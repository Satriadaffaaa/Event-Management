import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import StatsCard from '../../components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Lock, Shield, Menu as MenuIcon, Save, RefreshCw } from 'lucide-react';
import { mockRoles, mockMenus, mockPermissions, Permission } from '../../lib/mockData';
import { toast } from 'sonner';

export default function PermissionManagement() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(mockRoles[0]?.id || '');
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [hasChanges, setHasChanges] = useState(false);

  const getRolePermissions = () => {
    return permissions.filter(p => p.roleId === selectedRoleId);
  };

  const getPermissionForMenu = (menuId: string) => {
    return permissions.find(p => p.roleId === selectedRoleId && p.menuId === menuId);
  };

  const handlePermissionChange = (
    menuId: string,
    permissionType: 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete',
    value: boolean
  ) => {
    setHasChanges(true);
    const existingPermission = getPermissionForMenu(menuId);

    if (existingPermission) {
      setPermissions(prev => prev.map(p =>
        p.id === existingPermission.id
          ? { ...p, [permissionType]: value }
          : p
      ));
    } else {
      const newPermission: Permission = {
        id: String(permissions.length + 1),
        roleId: selectedRoleId,
        menuId,
        canCreate: permissionType === 'canCreate' ? value : false,
        canRead: permissionType === 'canRead' ? value : false,
        canUpdate: permissionType === 'canUpdate' ? value : false,
        canDelete: permissionType === 'canDelete' ? value : false
      };
      setPermissions(prev => [...prev, newPermission]);
    }
  };

  const handleSelectAll = (
    menuId: string,
    permissionType: 'canCreate' | 'canRead' | 'canUpdate' | 'canDelete'
  ) => {
    const menusToUpdate = menuId === 'all' 
      ? mockMenus.map(m => m.id) 
      : [menuId];

    const allChecked = menusToUpdate.every(id => {
      const perm = getPermissionForMenu(id);
      return perm?.[permissionType] === true;
    });

    menusToUpdate.forEach(id => {
      handlePermissionChange(id, permissionType, !allChecked);
    });
  };

  const handleSave = () => {
    toast.success('Permissions saved successfully');
    setHasChanges(false);
  };

  const handleReset = () => {
    setPermissions(mockPermissions);
    setHasChanges(false);
    toast.info('Permissions reset to default');
  };

  const selectedRole = mockRoles.find(r => r.id === selectedRoleId);
  const rolePermissions = getRolePermissions();
  const parentMenus = mockMenus.filter(m => m.parentId === null);

  const getPermissionStats = () => {
    const stats = {
      total: mockMenus.length,
      withAccess: 0,
      fullAccess: 0,
      readOnly: 0
    };

    mockMenus.forEach(menu => {
      const perm = getPermissionForMenu(menu.id);
      if (perm) {
        if (perm.canRead) stats.withAccess++;
        if (perm.canCreate && perm.canRead && perm.canUpdate && perm.canDelete) {
          stats.fullAccess++;
        } else if (perm.canRead && !perm.canCreate && !perm.canUpdate && !perm.canDelete) {
          stats.readOnly++;
        }
      }
    });

    return stats;
  };

  const stats = getPermissionStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Permission Management</h1>
            <p className="text-gray-600">Manage role-based access control</p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Role Selection */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="flex-1">
                <Label className="text-sm text-gray-600 mb-2 block">Select Role to Manage</Label>
                <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                  <SelectTrigger className="max-w-md">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{role.name}</span>
                          <span className="text-xs text-gray-500">- {role.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {selectedRole && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Menus"
              value={stats.total}
              icon={MenuIcon}
            />
            <StatsCard
              title="With Access"
              value={stats.withAccess}
              icon={Lock}
            />
            <StatsCard
              title="Full Access"
              value={stats.fullAccess}
              icon={Shield}
            />
            <StatsCard
              title="Read Only"
              value={stats.readOnly}
              icon={Lock}
            />
          </div>
        )}

        {/* Permissions Table */}
        {selectedRole && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Permissions for {selectedRole.name}
                </CardTitle>
                <Badge variant="secondary">
                  {rolePermissions.length} permission(s) configured
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-64">Menu / Feature</TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span>Create</span>
                          <Checkbox
                            checked={mockMenus.every(m => getPermissionForMenu(m.id)?.canCreate)}
                            onCheckedChange={() => handleSelectAll('all', 'canCreate')}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span>Read</span>
                          <Checkbox
                            checked={mockMenus.every(m => getPermissionForMenu(m.id)?.canRead)}
                            onCheckedChange={() => handleSelectAll('all', 'canRead')}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span>Update</span>
                          <Checkbox
                            checked={mockMenus.every(m => getPermissionForMenu(m.id)?.canUpdate)}
                            onCheckedChange={() => handleSelectAll('all', 'canUpdate')}
                          />
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span>Delete</span>
                          <Checkbox
                            checked={mockMenus.every(m => getPermissionForMenu(m.id)?.canDelete)}
                            onCheckedChange={() => handleSelectAll('all', 'canDelete')}
                          />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parentMenus.map(parentMenu => {
                      const childMenus = mockMenus.filter(m => m.parentId === parentMenu.id);
                      const permission = getPermissionForMenu(parentMenu.id);

                      return (
                        <>
                          <TableRow key={parentMenu.id} className="bg-gray-50">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MenuIcon className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold">{parentMenu.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {parentMenu.path}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={permission?.canCreate || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(parentMenu.id, 'canCreate', checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={permission?.canRead || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(parentMenu.id, 'canRead', checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={permission?.canUpdate || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(parentMenu.id, 'canUpdate', checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={permission?.canDelete || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(parentMenu.id, 'canDelete', checked as boolean)
                                }
                              />
                            </TableCell>
                          </TableRow>

                          {childMenus.map(childMenu => {
                            const childPermission = getPermissionForMenu(childMenu.id);
                            return (
                              <TableRow key={childMenu.id}>
                                <TableCell className="pl-12">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-xs">└─</span>
                                    <MenuIcon className="h-3 w-3 text-gray-500" />
                                    <span>{childMenu.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {childMenu.path}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={childPermission?.canCreate || false}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(childMenu.id, 'canCreate', checked as boolean)
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={childPermission?.canRead || false}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(childMenu.id, 'canRead', checked as boolean)
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={childPermission?.canUpdate || false}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(childMenu.id, 'canUpdate', checked as boolean)
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={childPermission?.canDelete || false}
                                    onCheckedChange={(checked) => 
                                      handlePermissionChange(childMenu.id, 'canDelete', checked as boolean)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {hasChanges && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    You have unsaved changes. Click "Save Changes" to apply the new permissions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
