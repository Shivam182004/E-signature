import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PenLine, Type, Upload, Download, Trash2 } from 'lucide-react';

const SignaturePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [typedSignature, setTypedSignature] = useState('');
  const [selectedFont, setSelectedFont] = useState('Dancing Script');
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Create Your Signature</h2>
      
      <Tabs defaultValue="draw" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="draw" className="flex items-center gap-2">
            <PenLine className="w-4 h-4" />
            Draw
          </TabsTrigger>
          <TabsTrigger value="type" className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Type
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draw" className="space-y-4">
          <div className="border rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              className="border border-gray-200 rounded-lg w-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={clearCanvas}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button onClick={downloadSignature}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Type your signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              className="text-2xl"
              style={{ fontFamily: selectedFont }}
            />
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Dancing Script">Dancing Script</option>
              <option value="Pacifico">Pacifico</option>
              <option value="Great Vibes">Great Vibes</option>
            </select>
          </div>
          <Button onClick={downloadSignature}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="signature-upload"
            />
            <label
              htmlFor="signature-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                Click to upload or drag and drop
              </span>
            </label>
          </div>
          {signatureImage && (
            <div className="mt-4">
              <img
                src={signatureImage}
                alt="Uploaded signature"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default SignaturePad;