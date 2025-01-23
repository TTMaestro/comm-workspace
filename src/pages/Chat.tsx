import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  author: string;
  text: string;
  isExpert?: boolean;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [expertMessages, setExpertMessages] = useState<Message[]>([
    {
      id: 1,
      author: "Expert",
      text: "Hello! How can I help you today?",
      isExpert: true
    }
  ]);
  const [supportMessages, setSupportMessages] = useState<Message[]>([
    {
      id: 1,
      author: "Support Team",
      text: "Welcome to support! How can we assist you?",
      isExpert: true
    }
  ]);
  const { toast } = useToast();

  const handleSendMessage = (isSupport: boolean) => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      author: "You",
      text: message,
      isExpert: false
    };

    if (isSupport) {
      setSupportMessages(prev => [...prev, newMessage]);
    } else {
      setExpertMessages(prev => [...prev, newMessage]);
    }
    
    setMessage("");
  };

  const handleAttachment = () => {
    toast({
      title: "Coming Soon",
      description: "File attachment will be available soon!",
    });
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex items-start gap-3 ${message.isExpert ? 'justify-start' : 'justify-end'} w-full`}>
      {message.isExpert && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <div className={`flex flex-col ${message.isExpert ? '' : 'items-end'} max-w-[70%]`}>
        <p className="font-semibold text-sm mb-1">{message.author}</p>
        <div className={`
          rounded-lg p-3 inline-block
          ${message.isExpert 
            ? 'bg-muted' 
            : 'bg-primary text-primary-foreground'}
        `}>
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
      </div>
      {!message.isExpert && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Chat</h1>
            
            <Tabs defaultValue="expert" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expert">Expert</TabsTrigger>
                <TabsTrigger value="support">Support Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="expert">
                <Card className="p-4">
                  <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {expertMessages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} />
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAttachment}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage(false);
                      }}
                    />
                    <Button onClick={() => handleSendMessage(false)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="support">
                <Card className="p-4">
                  <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      {supportMessages.map(msg => (
                        <MessageBubble key={msg.id} message={msg} />
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleAttachment}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage(true);
                      }}
                    />
                    <Button onClick={() => handleSendMessage(true)}>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
} 