
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  isFullscreen?: boolean;
  onFileUpload: (files: FileList) => void;
}

const FileUploader = ({ isFullscreen = false, onFileUpload }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileUpload(files);
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant={isFullscreen ? "outline" : "default"}
        className={`w-full ${isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' : ''}`}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Audio Files
      </Button>
    </>
  );
};

export default FileUploader;
