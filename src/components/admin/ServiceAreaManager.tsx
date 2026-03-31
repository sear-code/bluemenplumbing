'use client';

import { useState } from 'react';
import {
  useServiceAreas,
  useCreateServiceArea,
  useDeleteServiceArea,
} from '@/hooks/useAdminQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Plus, Trash2, Loader2 } from 'lucide-react';

export function ServiceAreaManager() {
  const { data: areas, isLoading } = useServiceAreas();
  const createArea = useCreateServiceArea();
  const deleteArea = useDeleteServiceArea();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    city_name: '',
    zone: 'core' as 'core' | 'extended',
    distance_km: 0,
    nearest_core_city: '',
  });

  const coreAreas = areas?.filter((a) => a.zone === 'core') || [];
  const extendedAreas = areas?.filter((a) => a.zone === 'extended') || [];

  const handleAdd = () => {
    createArea.mutate(
      {
        ...form,
        nearest_core_city: form.zone === 'extended' ? form.nearest_core_city : null,
      },
      {
        onSuccess: () => {
          toast.success(`${form.city_name} added`);
          setDialogOpen(false);
          setForm({ city_name: '', zone: 'core', distance_km: 0, nearest_core_city: '' });
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Remove ${name} from service areas?`)) return;
    deleteArea.mutate(id, {
      onSuccess: () => toast.success(`${name} removed`),
      onError: (err) => toast.error(err.message),
    });
  };

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add City
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Core Cities</CardTitle>
          <CardDescription>No travel fee charged.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coreAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="font-medium">{area.city_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(area.id, area.city_name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {coreAreas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    No core cities configured.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Extended Cities</CardTitle>
          <CardDescription>Travel fee based on distance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Nearest Core</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {extendedAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="font-medium">{area.city_name}</TableCell>
                  <TableCell>{area.distance_km} km</TableCell>
                  <TableCell>{area.nearest_core_city || '—'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">${area.distance_km}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(area.id, area.city_name)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {extendedAreas.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No extended cities configured.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add City Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Service Area</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>City Name</Label>
              <Input
                value={form.city_name}
                onChange={(e) => setForm({ ...form, city_name: e.target.value })}
                placeholder="e.g., Hamilton"
              />
            </div>
            <div className="space-y-2">
              <Label>Zone</Label>
              <Select
                value={form.zone}
                onValueChange={(v: 'core' | 'extended') => setForm({ ...form, zone: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core (no travel fee)</SelectItem>
                  <SelectItem value="extended">Extended (travel fee)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.zone === 'extended' && (
              <>
                <div className="space-y-2">
                  <Label>Distance (KM)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.distance_km}
                    onChange={(e) =>
                      setForm({ ...form, distance_km: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nearest Core City</Label>
                  <Select
                    value={form.nearest_core_city}
                    onValueChange={(v) => setForm({ ...form, nearest_core_city: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {coreAreas.map((area) => (
                        <SelectItem key={area.id} value={area.city_name}>
                          {area.city_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={createArea.isPending || !form.city_name}>
              {createArea.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add City
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
