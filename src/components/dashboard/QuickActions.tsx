"use client";

import { Button } from "@nextui-org/react";
import { Upload, Library } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        as={Link}
        href="/upload"
        color="primary"
        className="font-medium"
        startContent={<Upload className="w-4 h-4" />}
      >
        Upload PDF
      </Button>
      
      <Button
        as={Link}
        href="/library"
        variant="bordered"
        className="font-medium"
        startContent={<Library className="w-4 h-4" />}
      >
        View Library
      </Button>
    </div>
  );
} 