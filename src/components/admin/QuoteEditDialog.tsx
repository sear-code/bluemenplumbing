'use client';

import { useState, useEffect } from 'react';
import { useUpdateQuote } from '@/hooks/useAdminQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { QuoteRow } from '@/lib/supabase';

interface QuoteEditDialogProps {
  quote: QuoteRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteEditDialog({ quote, open, onOpenChange }: QuoteEditDialogProps) {
  const updateQuote = useUpdateQuote();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    estimated_price: 0,
    distance_fee: 0,
  });

  useEffect(() => {
    if (quote) {
      setForm({
        first_name: quote.first_name,
        last_name: quote.last_name,
        email: quote.email,
        phone: quote.phone,
        estimated_price: quote.estimated_price,
        distance_fee: quote.distance_fee ?? 0,
      });
    }
  }, [quote]);

  const handleSave = () => {
    updateQuote.mutate(
      { id: quote.id, data: form },
      {
        onSuccess: () => {
          toast.success('Quote updated');
          onOpenChange(false);
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Quote {quote.quote_id}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Estimated Price ($)</Label>
              <Input
                type="number"
                value={form.estimated_price}
                onChange={(e) =>
                  setForm({ ...form, estimated_price: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Distance Fee ($)</Label>
              <Input
                type="number"
                value={form.distance_fee}
                onChange={(e) =>
                  setForm({ ...form, distance_fee: parseFloat(e.target.value) || 0 })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={updateQuote.isPending}>
            {updateQuote.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
