import { LoadingSpinner } from './LoadingSpinner';

export const LoadingScreen = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-500 bg-opacity-30 backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <LoadingSpinner />
      </div>
    </div>
  );
};
