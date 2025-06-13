"use client";

import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "blue" | "purple" | "green" | "orange";
  isLoading?: boolean;
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  orange: "from-orange-500 to-orange-600",
};

export function StatsCard({ title, value, icon: Icon, color, isLoading }: StatsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardBody className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-8 w-16 rounded" />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardBody className="p-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {title}
              </p>
              <motion.p
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {value}
              </motion.p>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
} 