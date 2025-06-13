"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Input, Chip } from "@nextui-org/react";
import { Search, Play, Pause, Trash2, Calendar, Clock, Volume2 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/query/QueryProvider";
import { getAuthHeader } from "@/lib/supabase/client";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { toast } from "react-toastify";

interface AudioFile {
  id: string;
  filename: string;
  file_size: number;
  audio_duration: number;
  created_at: string;
  listen_count: number;
  last_listened_at?: string;
  audio_url?: string;
  summary?: string;
}

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);
  const [fileToDelete, setFileToDelete] = useState<AudioFile | null>(null);
  const queryClient = useQueryClient();
  
  const { data: files, error, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: () => fetchWithAuth("/files"),
  });

  const audioFiles = files || [];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredFiles = audioFiles.filter((file: AudioFile) => {
    const title = file.filename?.replace('.pdf', '');
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const togglePlayback = async (fileId: string, audioUrl: string) => {
    if (currentlyPlaying === fileId) {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setCurrentlyPlaying(null);
    } else {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      
      const audio = new Audio(audioUrl);
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
      });
      
      setAudioElement(audio);
      setCurrentlyPlaying(fileId);
      
      try {
        await audio.play();
        
        const authHeader = await getAuthHeader();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/listen/${fileId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...authHeader,
          },
        });
      } catch (error) {
        console.error('Failed to play audio:', error);
        setCurrentlyPlaying(null);
      }
    }
  };

  const handleDeleteFile = async () => {
    if (!fileToDelete) return;

    try {
      const authHeader = await getAuthHeader();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${fileToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      await queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success('File deleted successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setFileToDelete(null);
    }
  };

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Library
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Unable to load your audio files. Please try again.
          </p>
          <Button color="primary" onPress={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Audio Library
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and listen to your converted audio files
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Chip color="primary" variant="flat" size="sm">
              {filteredFiles.length} files
            </Chip>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              classNames={{
                input: "text-gray-900 dark:text-white",
                inputWrapper: "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500",
              }}
            />
          </div>
          

        </div>

        <ConfirmationModal
          isOpen={!!fileToDelete}
          onClose={() => setFileToDelete(null)}
          onConfirm={handleDeleteFile}
          title="Delete File"
          message={`Are you sure you want to delete "${fileToDelete?.filename.replace('.pdf', '')}"? This action cannot be undone.`}
          confirmText="Delete"
          variant="danger"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardBody className="p-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : filteredFiles.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <Volume2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchQuery ? "No files found" : "No audio files yet"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery 
                  ? "Try adjusting your search or filter criteria"
                  : "Upload your first PDF to get started"
                }
              </p>
              {!searchQuery && (
                <Button 
                  color="primary" 
                  as="a" 
                  href="/upload"
                  className="font-medium"
                >
                  Upload PDF
                </Button>
              )}
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file: AudioFile, index: number) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {file.filename.replace('.pdf', '')}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {file.filename}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Chip 
                          color="success" 
                          size="sm" 
                          variant="flat"
                        >
                          Ready
                        </Chip>
                        
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light"
                          color="danger"
                          onPress={() => setFileToDelete(file)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardBody className="pt-0">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(file.created_at)}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {file.audio_duration ? formatDuration(file.audio_duration) : "---"}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Size: {formatFileSize(file.file_size)}
                      </div>

                      {file.summary && (
                        <div className="pt-2">
                          <Button
                            size="sm"
                            variant="light"
                            className="w-full justify-start text-gray-600 dark:text-gray-400"
                            onPress={() => setExpandedSummaryId(expandedSummaryId === file.id ? null : file.id)}
                          >
                            {expandedSummaryId === file.id ? "Hide Summary" : "Show Summary"}
                          </Button>
                          {expandedSummaryId === file.id && (
                            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {file.summary}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {file.audio_url && (
                        <div className="pt-2">
                          <Button
                            className="w-full"
                            color="primary"
                            variant={currentlyPlaying === file.id ? "solid" : "bordered"}
                            startContent={
                              currentlyPlaying === file.id ? 
                                <Pause className="w-4 h-4" /> : 
                                <Play className="w-4 h-4" />
                            }
                            onPress={() => togglePlayback(file.id, file.audio_url!)}
                          >
                            {currentlyPlaying === file.id ? "Pause" : "Play"}
                          </Button>
                        </div>
                      )}
                      
                      {!file.audio_url && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            🤖 AI is processing your file...
                          </p>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
} 