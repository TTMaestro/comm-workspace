import { MessageSquare, Video, Calendar, FolderGit2 } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom'

const features = [
  {
    title: "Chat",
    description: "Real-time messaging with team members",
    icon: MessageSquare,
  },
  {
    title: "File Exchange",
    description: "Secure file sharing and collaboration",
    icon: FolderGit2,
  },
  {
    title: "Video Meetings",
    description: "HD video conferencing with screen sharing",
    icon: Video,
  },
  {
    title: "Calendar",
    description: "Schedule and manage your meetings",
    icon: Calendar,
  },
];

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFeatureClick = (feature: string) => {
    if (feature === "Chat") {
      navigate('/chat');
    } else {
      toast({
        title: "Coming Soon",
        description: `The ${feature} feature will be available soon!`,
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome to Your Workspace</h1>
              <p className="text-lg text-muted-foreground">
                All your collaboration tools in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  onClick={() => handleFeatureClick(feature.title)}
                />
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleFeatureClick("Quick Meeting")}
              >
                <Video className="mr-2 h-4 w-4" />
                Start Quick Meeting
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;