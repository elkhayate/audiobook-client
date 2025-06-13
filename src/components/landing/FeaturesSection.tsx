"use client";

import { Card, CardBody } from "@nextui-org/react";
import { 
  Zap, 
  Brain, 
  Headphones, 
  Lock, 
  Download, 
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    description: "Convert your PDFs to audio summaries in minutes, not hours. Our AI processes documents at incredible speed.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Brain,
    title: "Intelligent Summarization",
    description: "Advanced AI creates concise, meaningful summaries that capture the essence of your documents.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Headphones,
    title: "High-Quality Audio",
    description: "Crystal clear voice synthesis with natural intonation and multiple voice options to choose from.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your documents are processed securely and never stored permanently. Complete privacy guaranteed.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Download,
    title: "Download & Share",
    description: "Download your audio files for offline listening or share them with friends and colleagues.",
    color: "from-indigo-400 to-purple-500",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Listen to document summaries during commutes, workouts, or whenever you're on the move.",
    color: "from-pink-400 to-red-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              AudioBook AI?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of cutting-edge AI technology and user-friendly design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <CardBody className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardBody className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  ⚡ Limited Time Offer
                </h3>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                  Get unlimited PDF processing for free during our beta period. 
                  No credit card required, no setup fees, cancel anytime.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">∞</div>
                    <div className="opacity-90">Free forever plan</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">0</div>
                    <div className="opacity-90">No setup fees</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="opacity-90">Cancel anytime</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
} 