"use client";

import { useState, useEffect } from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle, 
  NavbarMenu, 
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { 
  BookOpen, 
  Upload, 
  Library, 
  BarChart3, 
  Settings, 
  Sun, 
  Moon, 
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth/AuthProvider";
import { motion } from "framer-motion";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Library", href: "/library", icon: Library },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="bg-transparent"
            maxWidth="full"
            height="72px"
          >
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />
              <NavbarBrand>
                <Link href="/dashboard" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br hidden sm:flex from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <span className="font-bold text-xl text-gray-900 dark:text-white">
                      AudioBook AI
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                      PDF to Audio
                    </div>
                  </div>
                </Link>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-2" justify="center">
              {navigationItems.map((item) => (
                <NavbarItem key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2">
              <NavbarItem>
                <Button
                  isIconOnly
                  variant="light"
                  onPress={toggleTheme}
                  aria-label="Toggle theme"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </NavbarItem>

              <NavbarItem>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform hover:scale-105"
                      color="primary"
                      src={user?.user_metadata?.avatar_url}
                      name={user?.email?.charAt(0).toUpperCase() || "U"}
                      size="sm"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      startContent={<LogOut className="w-4 h-4" />}
                      onPress={handleSignOut}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
      </div>

      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-6 max-w-7xl"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
} 