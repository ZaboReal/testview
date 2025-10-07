import { Card } from "@/components/ui/card";
import { Upload, FileJson } from "lucide-react";
import { useCallback } from "react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <Card 
      className="border-2 border-dashed hover-elevate active-elevate-2 cursor-pointer transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById('file-input')?.click()}
      data-testid="div-upload-zone"
    >
      <div className="p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Upload Test Results</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop your JSON file here, or click to browse
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FileJson className="w-4 h-4" />
          <span>Supports JSON format only</span>
        </div>
        <input
          id="file-input"
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileInput}
          data-testid="input-file"
        />
      </div>
    </Card>
  );
}
