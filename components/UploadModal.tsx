'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, X, Loader2, CheckCircle2 } from 'lucide-react';
import { useCopilotStore } from '../lib/store';
import { HealthRecord } from '../lib/types';

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const addRecord = useCopilotStore(state => state.addRecord);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate AI OCR and Processing Delay
    setTimeout(() => {
      const newRecord: HealthRecord = {
        id: `rec-${Math.random().toString(36).substring(7)}`,
        type: 'diagnostic',
        date: new Date().toISOString(),
        title: 'New Diagnostic Report',
        provider: 'Dr. Uploaded',
        summary: {
          en: 'AI has analyzed this newly uploaded document. Everything appears to be within expected parameters based on initial scanning.',
          hi: 'AI ने इस नए अपलोड किए गए दस्तावेज़ का विश्लेषण किया है। प्रारंभिक स्कैनिंग के आधार पर सब कुछ अपेक्षित मापदंडों के भीतर प्रतीत होता है।'
        }
      };
      
      addRecord(newRecord);
      setIsProcessing(false);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
      
    }, 3000);
  }, [addRecord, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-white/20 p-8 rounded-3xl shadow-2xl z-10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-2">Upload Medical Record</h2>
          <p className="text-gray-400 mb-6">Drop your prescription, lab report, or scan here. Our AI will extract the details automatically.</p>
          
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragActive ? 'border-blue-400 bg-blue-500/10' : 'border-white/20 hover:border-white/40 hover:bg-white/5'}`}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="flex flex-col items-center text-blue-400">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-semibold text-lg">AI is extracting details...</p>
                <p className="text-sm text-blue-200/60 mt-2">Running medical OCR and structuring data</p>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center text-green-400">
                <CheckCircle2 size={48} className="mb-4" />
                <p className="font-semibold text-lg">Processing Complete!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud size={48} className="mb-4 text-white/70" />
                <p className="font-semibold text-lg text-white">Drag & drop files here</p>
                <p className="text-sm mt-2">or click to browse from device</p>
                <p className="text-xs mt-4 text-gray-500">Supports PDF, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
