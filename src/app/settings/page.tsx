"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardBody, CardHeader, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { User, Mail, Palette, Volume2, Trash2, Save, MicVocal } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useVoices, useUserSettings } from "@/lib/query/settings/queries";
import { useUpdateSettings, useDeleteAccount } from "@/lib/query/settings/mutations";
import { Voice } from "@/lib/query/settings/types";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const settingsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  audioQuality: z.enum(["standard", "high", "premium"]),
  voiceId: z.string(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { data: voices = [], isLoading: isLoadingVoices } = useVoices();
  const { data: userSettings } = useUserSettings();
  const updateSettings = useUpdateSettings();
  const deleteAccount = useDeleteAccount();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useRouter();

  const settings = useMemo(() => {
    return {
      fullName: user?.user_metadata?.name || userSettings?.fullName || "",
      email: user?.email || userSettings?.email || "",
      audioQuality: user?.app_metadata?.audioQuality || userSettings?.audioQuality || "high",
      voiceId: user?.app_metadata?.voiceId || userSettings?.voiceId || "",
    };  
  }, [user, userSettings]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    if (userSettings) {
      setValue("fullName", settings.fullName);
      setValue("email", settings.email);
      setValue("audioQuality", settings.audioQuality);
      setValue("voiceId", settings.voiceId);
    }
  }, [userSettings]);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await updateSettings.mutateAsync(data);
      toast.success("Settings updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to update settings", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount.mutateAsync();
      toast.success("Account deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate.push("/login");
    } catch (error) {
      toast.error("Failed to delete account", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const selectedVoice = voices.find(v => v.voice_id === watch("voiceId"));

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and application preferences
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    errorMessage={errors.fullName?.message}
                    variant="bordered"
                  />
                  
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    {...register("email")}
                    errorMessage={errors.email?.message}
                    variant="bordered"
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold">Appearance</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <Select
                    selectedKeys={[theme || "system"]}
                    onSelectionChange={(keys) => setTheme(Array.from(keys)[0] as string)}
                    className="w-32"
                    variant="bordered"
                  >
                    <SelectItem key="light">Light</SelectItem>
                    <SelectItem key="dark">Dark</SelectItem>
                    <SelectItem key="system">System</SelectItem>
                  </Select>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold">Audio Settings</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Audio Quality</label>
                  <Select
                    {...register("audioQuality")}
                    selectedKeys={[watch("audioQuality")]}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      register("audioQuality").onChange({ target: { value } });
                    }}
                    variant="bordered"
                    className="max-w-xs"
                  >
                    <SelectItem key="standard">Standard (128kbps)</SelectItem>
                    <SelectItem key="high">High (320kbps)</SelectItem>
                    <SelectItem key="premium">Premium (FLAC)</SelectItem>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Voice Selection</label>
                  <div className="space-y-4">
                    <Select
                      {...register("voiceId")}
                      selectedKeys={[watch("voiceId")]}
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        register("voiceId").onChange({ target: { value } });
                      }}
                      variant="bordered"
                      className="max-w-xs"
                      isLoading={isLoadingVoices}
                      startContent={<MicVocal className="w-4 h-4 text-gray-400" />}
                    >
                      {voices.map((voice: Voice) => (
                        <SelectItem 
                          key={voice.voice_id} 
                          textValue={voice.name}
                          value={voice.voice_id}
                          description={`${voice.labels?.accent || voice.category} • ${voice.labels?.gender || ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{voice.name}</span>
                            {voice.labels?.descriptive && (
                              <span className="text-xs text-gray-500">
                                ({voice.labels.descriptive})
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </Select>

                    {selectedVoice && selectedVoice?.preview_url && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <MicVocal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {selectedVoice.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {selectedVoice.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <audio
                              ref={audioRef}
                              src={selectedVoice.preview_url}
                              className="w-full"
                              controls
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {selectedVoice.labels && (
                            <>
                              {selectedVoice.labels.accent && (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Accent</p>
                                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                                    {selectedVoice.labels.accent}
                                  </p>
                                </div>
                              )}
                              {selectedVoice.labels.gender && (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                                    {selectedVoice.labels.gender}
                                  </p>
                                </div>
                              )}
                              {selectedVoice.labels.age && (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                                    {selectedVoice.labels.age.replace('_', ' ')}
                                  </p>
                                </div>
                              )}
                              {selectedVoice.labels.use_case && (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Use Case</p>
                                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                                    {selectedVoice.labels.use_case.replace('_', ' ')}
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {voices.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {voices.length} voices available
                    </p>
                  )}
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-danger-200 dark:border-danger-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Once you delete your account, there is no going back. All your files and data will be permanently deleted.
                  </p>
                  <Button
                    color="danger"
                    variant="bordered"
                    onPress={() => setIsDeleteModalOpen(true)}
                    startContent={<Trash2 className="w-4 h-4" />}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              isLoading={updateSettings.isPending}
              startContent={<Save className="w-4 h-4" />}
            >
              {updateSettings.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone. All your files and data will be permanently deleted."
          confirmText="Delete Account"
          variant="danger"
        />
      </div>
    </AppLayout>
  );
} 