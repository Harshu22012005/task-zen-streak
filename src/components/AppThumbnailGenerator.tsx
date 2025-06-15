
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AppThumbnailGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const generateThumbnail = async () => {
    try {
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('generate-app-thumbnail', {
        body: { 
          appName: 'DailyTasker AI',
          description: 'AI-Powered Task Management'
        }
      });

      if (error) {
        console.error('Error invoking function:', error);
        throw new Error(error.message || 'Failed to generate thumbnail');
      }

      if (data?.imageUrl) {
        setThumbnailUrl(data.imageUrl);
        toast({
          title: "Success!",
          description: "App thumbnail generated successfully.",
        });
      } else {
        throw new Error('No image URL received from the function');
      }

    } catch (error) {
      console.error('Error generating thumbnail:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate thumbnail. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadThumbnail = () => {
    if (!thumbnailUrl) return;
    
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = 'dailytasker-app-thumbnail.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          App Thumbnail Generator
        </CardTitle>
        <CardDescription>
          Generate a professional app thumbnail for your DailyTasker AI app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={generateThumbnail} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Thumbnail'
          )}
        </Button>
        
        {thumbnailUrl && (
          <div className="space-y-3">
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <img 
                src={thumbnailUrl} 
                alt="Generated app thumbnail" 
                className="w-full h-auto rounded"
              />
            </div>
            <Button 
              onClick={downloadThumbnail}
              variant="outline"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Thumbnail
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppThumbnailGenerator;
