import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus, UserPlus, FilePlus, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const { toast } = useToast();

  const handleAction = (action: string) => {
    console.log(`Calendar action triggered: ${action}`);
    toast({
      title: "Feature Coming Soon",
      description: `The ${action} feature will be available soon.`,
    });
  };

  const handleDone = () => {
    if (!meetingName.trim()) {
      toast({
        title: "Meeting Name Required",
        description: "Please set a name for the meeting before proceeding.",
      });
      return;
    }
    
    console.log("Meeting settings completed:", { date, meetingName });
    toast({
      title: "Meeting Scheduled",
      description: `Meeting "${meetingName}" has been scheduled.`,
    });
    setShowAdditionalButtons(false);
    setMeetingName("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Calendar</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Schedule and manage your meetings
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </Card>

              <div className="flex flex-col gap-4">
                {!showAdditionalButtons ? (
                  <Button 
                    onClick={() => setShowAdditionalButtons(true)}
                    className="flex items-center gap-2"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Book Meeting
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="Set a meeting name"
                      value={meetingName}
                      onChange={(e) => setMeetingName(e.target.value)}
                      className="w-full"
                    />
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleAction("Add Users")}
                      className="flex items-center gap-2 w-full"
                    >
                      <UserPlus className="h-4 w-4" />
                      Add Users
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleAction("Attach Documents")}
                      className="flex items-center gap-2 w-full"
                    >
                      <FilePlus className="h-4 w-4" />
                      Attach Documents
                    </Button>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAdditionalButtons(false);
                          setMeetingName("");
                        }}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleDone}
                        className="flex items-center gap-2 ml-auto"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CalendarPage;