import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin h-16 w-16 stroke-[4]" />
    </div>
  );
};
