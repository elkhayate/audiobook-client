"use client";

import { Card, CardBody, Progress  } from "@nextui-org/react";
import { Upload, Cpu, FileText, AlertCircle } from "lucide-react";

interface UploadProgressProps {
  progress: number;
  status: "uploading" | "processing" | "error";
  filename: string;
}

export function UploadProgress({ progress, status, filename }: UploadProgressProps) {
  const getStatusInfo = () => {
    switch (status) {
      case "uploading":
        return {
          icon: Upload,
          title: "Uploading PDF",
          description: "Uploading your file to our servers...",
          color: "primary" as const,
        };
      case "processing":
        return {
          icon: Cpu,
          title: "Processing with AI",
          description: "Converting your PDF to audio summary...",
          color: "secondary" as const,
        };
      case "error":
        return {
          icon: AlertCircle,
          title: "Upload Failed",
          description: "There was an error processing your file. Please try again.",
          color: "danger" as const,
        };
      default:
        return {
          icon: FileText,
          title: "Processing",
          description: "Please wait...",
          color: "primary" as const,
        };
    }
  };

  const statusInfo = getStatusInfo();
  const Icon = statusInfo.icon;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardBody className="p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-white animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {statusInfo.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              {statusInfo.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
              {filename}
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress
              value={progress}
              color={statusInfo.color}
              size="lg"
              className="w-full"
              showValueLabel
              aria-label={`${statusInfo.title} progress: ${progress}% complete`}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {progress}% complete
            </p>
          </div>
          
          {status === "processing" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                🤖 Our AI is analyzing your document and creating a high-quality audio summary. 
                This usually takes 2-5 minutes depending on the document length.
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <p className="text-sm text-red-700 dark:text-red-300">
                ❌ An error occurred while processing your file. Please try uploading again or contact support if the issue persists.
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
} 