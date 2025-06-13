"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import { ArrowRight, Sparkles, Users, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-12"
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white/90">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Transform Your{" "}
              <span className="text-yellow-300">
                Reading Experience?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who are already saving hours and learning more 
              efficiently with AudioBook AI. Start your journey today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">PDFs Converted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5K+</div>
              <div className="text-white/80">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-3xl md:text-4xl font-bold text-white">4.9</span>
                <Star className="w-6 h-6 text-yellow-300 fill-current" />
              </div>
              <div className="text-white/80">User Rating</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                as={Link}
                href="/signup"
                size="lg"
                className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-8 py-3 text-lg hover:bg-gray-100 transition-colors"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Start Free Trial
              </Button>
              
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                size="lg"
                className="w-full sm:w-auto border-white text-white font-semibold px-8 py-3 text-lg hover:bg-white/10 transition-colors"
              >
                Sign In
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-white" />
                    <span className="text-white font-medium">
                      Trusted by students, professionals, and researchers worldwide
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                    ))}
                    <span className="text-white/90 ml-2 font-medium">
                      Rated 4.9/5 by users
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 