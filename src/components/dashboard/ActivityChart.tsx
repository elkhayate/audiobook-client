"use client";

import { Skeleton } from "@nextui-org/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ActivityChartProps {
  data: Array<{ date: string; count: number }>;
  type: "upload" | "listen";
  isLoading?: boolean;
}

export function ActivityChart({ data, type, isLoading }: ActivityChartProps) {
  const { theme } = useTheme();
  
  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-full space-y-3">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No {type} activity data available
          </p>
        </div>
      </div>
    );
  }

  const labels = data.map(item => new Date(item.date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }));
  
  const values = data.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: type === "upload" ? "Uploads" : "Listening Sessions",
        data: values,
        borderColor: type === "upload" ? "#3B82F6" : "#8B5CF6",
        backgroundColor: type === "upload" 
          ? "rgba(59, 130, 246, 0.1)" 
          : "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: type === "upload" ? "#3B82F6" : "#8B5CF6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#ffffff" : "#1f2937",
        bodyColor: theme === "dark" ? "#ffffff" : "#1f2937",
        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: theme === "dark" ? "#374151" : "#f3f4f6",
        },
        ticks: {
          color: theme === "dark" ? "#9ca3af" : "#6b7280",
          font: {
            size: 12,
          },
          stepSize: 1,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
} 