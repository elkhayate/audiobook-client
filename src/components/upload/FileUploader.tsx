"use client";

import { useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "react-hot-toast";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export function FileUploader({ onFileSelect, selectedFile }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): boolean => {
    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return false;
    }

    const maxSize = 50 * 1024 * 1024; 
    if (file.size > maxSize) {
      toast.error("File size must be less than 50MB");
      return false;
    }

    return true;
  };

  const handleFileChange = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, [handleFileChange]);

  const clearFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
          ${isDragOver 
            ? "border-primary bg-primary-50 dark:bg-primary-900/10" 
            : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isDragOver ? "Drop your PDF here" : "Upload your PDF"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            
            <Button
              color="primary"
              variant="bordered"
              as="label"
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              Choose File
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>Supported format: PDF</p>
            <p>Maximum size: 50MB</p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onPress={clearFile}
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 