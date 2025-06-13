"use client";

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Check, Upload, Library } from "lucide-react";
import Link from "next/link";

interface UploadResultProps {
  result: {
    summary: string;
    audio_url: string;
    duration: number;
    file_size: number;
  };
  filename: string;
  onUploadAnother: () => void;
}

export function UploadResult({ result, filename, onUploadAnother }: UploadResultProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardBody className="p-6 text-center">
          <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Conversion Complete!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your PDF has been successfully converted to an audio summary
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Audio Summary Details</h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatDuration(result.duration)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">File Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatFileSize(result.file_size)} MB
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Original</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {filename}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Audio Summary</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <audio
              controls
              className="w-full"
              preload="metadata"
            >
              <source src={result.audio_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Text Summary</h3>
        </CardHeader>
        <CardBody>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed">
              {result.summary}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              color="primary"
              size="lg"
              startContent={<Upload className="w-5 h-5" />}
              onPress={onUploadAnother}
              className="w-full sm:w-auto"
            >
              Upload Another PDF
            </Button>
            
            <Button
              variant="bordered"
              size="lg"
              startContent={<Library className="w-5 h-5" />}
              as={Link}
              href="/library"
              className="w-full sm:w-auto"
            >
              View Library
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 