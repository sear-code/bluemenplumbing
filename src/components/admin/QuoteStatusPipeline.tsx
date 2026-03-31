'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUpdateQuoteStatus } from '@/hooks/useAdminQueries';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const PIPELINE_STEPS = ['submitted', 'contacted', 'approved', 'completed'] as const;
const STEP_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  contacted: 'Contacted',
  approved: 'Approved',
  completed: 'Completed',
};

interface QuoteStatusPipelineProps {
  quoteId: string;
  currentStatus: string;
}

export function QuoteStatusPipeline({ quoteId, currentStatus }: QuoteStatusPipelineProps) {
  const updateStatus = useUpdateQuoteStatus();
  const currentIndex = PIPELINE_STEPS.indexOf(currentStatus as typeof PIPELINE_STEPS[number]);
  const isCancelled = currentStatus === 'cancelled';

  const handleAdvance = () => {
    if (currentIndex < PIPELINE_STEPS.length - 1) {
      const nextStatus = PIPELINE_STEPS[currentIndex + 1];
      updateStatus.mutate(
        { id: quoteId, status: nextStatus },
        {
          onSuccess: () => toast.success(`Status updated to ${STEP_LABELS[nextStatus]}`),
          onError: (err) => toast.error(err.message),
        }
      );
    }
  };

  const handleCancel = () => {
    updateStatus.mutate(
      { id: quoteId, status: 'cancelled', notes: 'Cancelled by admin' },
      {
        onSuccess: () => toast.success('Quote cancelled'),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleReopen = () => {
    updateStatus.mutate(
      { id: quoteId, status: 'submitted', notes: 'Reopened by admin' },
      {
        onSuccess: () => toast.success('Quote reopened'),
        onError: (err) => toast.error(err.message),
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Pipeline visualization */}
      <div className="flex items-center gap-1">
        {PIPELINE_STEPS.map((step, i) => {
          const isCompleted = !isCancelled && currentIndex >= i;
          const isCurrent = !isCancelled && currentIndex === i;

          return (
            <div key={step} className="flex items-center flex-1">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium shrink-0',
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCancelled
                    ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <div className="flex-1 ml-2">
                <p
                  className={cn(
                    'text-xs font-medium',
                    isCurrent ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {STEP_LABELS[step]}
                </p>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2',
                    !isCancelled && currentIndex > i ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isCancelled ? (
          <Button size="sm" onClick={handleReopen} disabled={updateStatus.isPending}>
            {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reopen Quote
          </Button>
        ) : currentStatus !== 'completed' ? (
          <>
            <Button size="sm" onClick={handleAdvance} disabled={updateStatus.isPending}>
              {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentIndex < PIPELINE_STEPS.length - 1
                ? `Move to ${STEP_LABELS[PIPELINE_STEPS[currentIndex + 1]]}`
                : 'Complete'}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleCancel}
              disabled={updateStatus.isPending}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
