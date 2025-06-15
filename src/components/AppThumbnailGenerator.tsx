
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const AppThumbnailGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateThumbnail = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-app-thumbnail');
      
      if (error) throw error;
      
      if (data.imageData) {
        const imageDataUrl = `data:image/png;base64,${data.imageData}`;
        setGeneratedImage(imageDataUrl);
        toast.success('App thumbnail generated successfully!');
      } else {
        throw new Error('No image data received');
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      toast.error('Failed to generate thumbnail. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'dailytasker-app-icon.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully!');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>Generate App Thumbnail</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {generatedImage && (
          <div className="space-y-3">
            <img 
              src={generatedImage} 
              alt="Generated app thumbnail" 
              className="w-full h-48 object-cover rounded-lg border"
            />
            <Button 
              onClick={downloadImage}
              className="w-full"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Image
            </Button>
          </div>
        )}
        
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
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              {generatedImage ? 'Generate New' : 'Generate Thumbnail'}
            </>
          )}
        </Button>
        
        <p className="text-sm text-gray-600 text-center">
          This will create a professional app icon for DailyTasker using AI
        </p>
      </CardContent>
    </Card>
  );
};
