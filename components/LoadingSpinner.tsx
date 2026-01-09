import React from "react";
import { RefreshCcw } from "lucide-react";

export const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 z-10 flex items-center justify-center backdrop-blur-sm">
    <RefreshCcw className="animate-spin text-blue-600 h-8 w-8" />
  </div>
);
