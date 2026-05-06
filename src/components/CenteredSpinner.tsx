import { Spinner } from "@heroui/react";

interface CenteredSpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

export default function CenteredSpinner({ fullScreen, className }: CenteredSpinnerProps) {
  return (
    <div 
      className={`flex items-center justify-center w-full ${fullScreen ? "h-[80vh]" : "h-40"} ${className || ""}`}
    >
      <Spinner size="lg" color="primary" label="Loading..." />
    </div>
  );
}
