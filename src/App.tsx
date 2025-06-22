import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar, SidebarBody, SidebarLink, SidebarProvider, sidebarLinks } from '@/components/ui/sidebar';
import { OverviewDashboard } from '@/components/overview-dashboard';
import { FunnelAttribution } from '@/components/funnel-attribution';
import { VideoPerformance } from '@/components/video-performance';
import { AIInsights } from '@/components/ai-insights';
import { cn } from '@/lib/utils';
import { useState } from 'react';

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 dark:bg-neutral-900">
      <SidebarProvider>
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link}
                    className={cn(
                      "hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors",
                      "flex items-center justify-center px-4 py-3",
                      location.pathname === link.href ? "bg-neutral-200 dark:bg-neutral-700" : ""
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center px-4 py-3">
              <SidebarLink
                link={{
                  label: "Coach Analytics",
                  href: "#",
                  icon: (
                    <div className="h-7 w-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                      CA
                    </div>
                  ),
                }}
                className="flex items-center justify-center"
              />
            </div>
          </SidebarBody>
        </Sidebar>
        
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-full">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Routes>
                  <Route path="/" element={<OverviewDashboard />} />
                  <Route path="/funnel-attribution" element={<FunnelAttribution />} />
                  <Route path="/video-performance" element={<VideoPerformance />} />
                  <Route path="/ai-insights" element={<AIInsights />} />
                </Routes>
              </motion.div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <DashboardLayout />
    </Router>
  );
}

export default App;