'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, UploadCloud, FileText, Loader2, CheckCircle2 } from 'lucide-react';
import { useCopilotStore } from '../../lib/store';
import Scene from '../../components/Scene';
import RecordCard from '../../components/RecordCard';
import { HealthRecord } from '../../lib/types';

export default function NivaAIPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<HealthRecord | null>(null);
  const addRecord = useCopilotStore(state => state.addRecord);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setIsProcessing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Analysis failed');

      const data = await res.json();
      
      addRecord(data.record);
      setResult(data.record);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze document.");
    } finally {
      setIsProcessing(false);
    }
  }, [addRecord]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main className="min-h-screen relative pt-24 pb-12 px-6">
      <Scene />
      <div className="absolute inset-0 bg-slate-50/90 dark:bg-slate-950/60 z-[-1]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6"
          >
            <BrainCircuit size={40} className="text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Niva AI Analysis
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Upload your prescriptions, discharge summaries, or lab reports. Our AI will automatically read, structure, and explain them in simple language.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            {...getRootProps()} 
            className={`bg-white/60 dark:bg-white/5 backdrop-blur-xl border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center transition-all cursor-pointer shadow-xl ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-white/20 hover:border-blue-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="flex flex-col items-center text-blue-600 dark:text-blue-400">
                <Loader2 size={64} className="animate-spin mb-6" />
                <h3 className="font-bold text-xl mb-2">Analyzing Document...</h3>
                <p className="text-slate-500 dark:text-blue-200">Running Optical Character Recognition (OCR) and interpreting medical terms.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-600 dark:text-slate-400">
                <UploadCloud size={64} className="mb-6 text-slate-400 dark:text-white/50" />
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Drag & Drop Files Here</h3>
                <p className="mb-6">or click to browse from your device</p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-sm bg-slate-200 dark:bg-black/30 px-3 py-1 rounded-full"><FileText size={16}/> PDF</span>
                  <span className="flex items-center gap-2 text-sm bg-slate-200 dark:bg-black/30 px-3 py-1 rounded-full"><FileText size={16}/> JPG / PNG</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <div className="flex items-center gap-3 mb-6 text-green-600 dark:text-green-400">
                <CheckCircle2 size={28} />
                <h2 className="text-2xl font-bold">Analysis Complete</h2>
              </div>
              <RecordCard record={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
