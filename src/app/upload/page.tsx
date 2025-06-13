"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { FileUploader } from "@/components/upload/FileUploader";
import { UploadProgress } from "@/components/upload/UploadProgress";
import { UploadResult } from "@/components/upload/UploadResult";
import { toast } from "react-hot-toast";
import { getAuthHeader } from "@/lib/supabase/client";

interface UploadResponse {
  summary: string;
  audio_url: string;
  duration: number;
  file_size: number;
}

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "error">("idle");
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setUploadStatus("idle");
    setUploadResult(null);
    setError(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("uploading");
    setUploadProgress(0);
    setError(null);

    try {
      const authHeader = await getAuthHeader();

      const formData = new FormData();
      formData.append("file", selectedFile);

      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 50);
          setUploadProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 201) {
          setUploadStatus("processing");
          setUploadProgress(75);

          try {
            const response = JSON.parse(xhr.responseText);
            setUploadResult(response);
            setUploadStatus("completed");
            setUploadProgress(100);
            toast.success("PDF converted to audio successfully!");
          } catch (parseError) {
            throw new Error("Invalid response from server");
          }
        } else {
          setUploadStatus("error");
          setUploadProgress(100);
          toast.error("Upload failed. Please try again.");
          throw new Error(`Upload failed with status ${xhr.status}`);
        }
      });

      xhr.addEventListener("error", () => {
        throw new Error("Network error during upload");
      });

      xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/upload`);
      
      Object.entries(authHeader).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value as string);
      });

      xhr.send(formData);

    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setError(error instanceof Error ? error.message : "Upload failed");
      toast.error("Upload failed. Please try again.");
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadResult(null);
    setError(null);
    setUploadProgress(0);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your PDF
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your PDF documents into engaging audio summaries with our AI-powered technology. 
            Perfect for learning on the go.
          </p>
        </div>

        {uploadStatus === "idle" && (
          <Card className="max-w-2xl mx-auto">
            <CardBody className="p-8">
              <FileUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />
              
              {selectedFile && (
                <div className="mt-6 pt-6 border-t border-divider">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      color="primary"
                      size="lg"
                      onPress={handleUpload}
                      startContent={<Upload className="w-4 h-4" />}
                    >
                      Convert to Audio
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {(uploadStatus === "uploading" || uploadStatus === "processing") && (
          <UploadProgress
            progress={uploadProgress}
            status={uploadStatus}
            filename={selectedFile?.name || ""}
          />
        )}

        {uploadStatus === "completed" && uploadResult && (
          <UploadResult
            result={uploadResult}
            filename={selectedFile?.name || ""}
            onUploadAnother={resetUpload}
          />
        )}

        {uploadStatus === "error" && (
          <Card className="max-w-2xl mx-auto border-danger-200 bg-danger-50 dark:bg-danger-900/10">
            <CardBody className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-danger mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-danger mb-2">
                Upload Failed
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error || "Something went wrong during the upload process."}
              </p>
              <Button color="primary" onPress={resetUpload}>
                Try Again
              </Button>
            </CardBody>
          </Card>
        )}

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h3 className="text-lg font-semibold">Upload Guidelines</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Supported format: PDF files only</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Maximum file size: 50 MB</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Processing time: 2-5 minutes depending on document length</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Secure processing: Files are deleted after conversion</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
} 