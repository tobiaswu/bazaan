import { Sizes } from '@/lib/enums';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: Sizes;
}

export const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  const className =
    size === Sizes.SM
      ? 'h-5 w-5'
      : size === Sizes.MD
      ? 'h-12 w-12 stroke-2'
      : 'h-16 w-16 stroke-[4]';

  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`animate-spin ${className}`} />
    </div>
  );
};
