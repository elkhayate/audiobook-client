"use client";

import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { BookOpen, Headphones, Clock, Upload, FileText } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/query/QueryProvider";

export default function DashboardPage() {
  const { data: dashboardData, error, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchWithAuth("/dashboard"),
  });

  if (error) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Unable to load dashboard data. Please try again.
          </p>
          <Button color="primary" onPress={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </AppLayout>
    );
  }

  const stats = dashboardData || {
    totalPDFs: 0,
    totalAudioFiles: 0,
    totalFileSize: 0,
    totalListeningTime: 0,
    lastUploadDate: null,
    lastListenedDate: null,
    weeklyUploadTrend: [],
    weeklyListenTrend: [],
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's an overview of your audiobook activity.
            </p>
          </div>
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total PDFs"
            value={stats.totalPDFs}
            icon={FileText}
            color="blue"
            isLoading={isLoading}
          />
          <StatsCard
            title="Audio Files"
            value={stats.totalAudioFiles}
            icon={Headphones}
            color="purple"
            isLoading={isLoading}
          />
          <StatsCard
            title="Listening Time"
            value={`${Math.round(stats.totalListeningTime / 60)}h`}
            icon={Clock}
            color="green"
            isLoading={isLoading}
          />
          <StatsCard
            title="Storage Used"
            value={`${(stats.totalFileSize / (1024 * 1024)).toFixed(1)}MB`}
            icon={Upload}
            color="orange"
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Upload Activity</h3>
            </CardHeader>
            <CardBody>
              <ActivityChart
                data={stats.weeklyUploadTrend}
                type="upload"
                isLoading={isLoading}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Listening Activity</h3>
            </CardHeader>
            <CardBody>
              <ActivityChart
                data={stats.weeklyListenTrend}
                type="listen"
                isLoading={isLoading}
              />
            </CardBody>
          </Card>
        </div>

        {stats.totalPDFs === 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to AudioBook AI!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get started by uploading your first PDF to convert it into an audio summary. 
                    Our AI will process your document and create a high-quality audio version.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      as={Link}
                      href="/upload"
                      color="primary"
                      className="font-medium"
                      startContent={<Upload className="w-4 h-4" />}
                    >
                      Upload Your First PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </AppLayout>
  );
} 