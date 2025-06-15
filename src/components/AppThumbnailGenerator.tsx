
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, RefreshCw, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const AppThumbnailGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateThumbnail = async () => {
    setIsGenerating(true);
    try {
      console.log('Calling thumbnail generation function...');
      const { data, error } = await supabase.functions.invoke('generate-app-thumbnail');
      
      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Function response:', data);
      
      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success('App thumbnail generated successfully!');
      } else if (data.imageData) {
        // Handle base64 data
        const imageDataUrl = data.imageUrl || `data:image/svg+xml;base64,${data.imageData}`;
        setGeneratedImage(imageDataUrl);
        toast.success('App thumbnail generated successfully!');
      } else {
        throw new Error('No image data received from the function');
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      toast.error(`Failed to generate thumbnail: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    try {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'dailytasker-app-icon.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in hover:scale-105 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
          <span>Generate App Thumbnail</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {generatedImage && (
          <div className="space-y-3 animate-fade-in">
            <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
              <img 
                src={generatedImage} 
                alt="Generated app thumbnail" 
                className="w-full h-48 object-contain"
              />
            </div>
            <Button 
              onClick={downloadImage}
              className="w-full hover:scale-105 transition-transform duration-200"
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
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 hover:scale-105 transition-all duration-200"
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
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          This will create a professional app icon for DailyTasker
        </p>
      </CardContent>
    </Card>
  );
};
