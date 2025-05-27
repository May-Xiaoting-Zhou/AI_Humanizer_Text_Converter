import React, { useState } from 'react';
import { RotateCw, Zap, Shuffle, Sparkles, FileText, Check, Copy } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Import supabase
import { useAuthStore } from '../store/authStore'; // Import auth store

// Mock function to simulate text humanizing
const humanizeText = (text: string, options: any): string => {
  if (!text) return '';
  
  // This is just a placeholder. In a real app, this would call an API or use a more sophisticated algorithm
  let result = text;
  
  if (options.tone === 'casual') {
    result = result.replace(/consequently/gi, 'so')
      .replace(/however/gi, 'but')
      .replace(/additionally/gi, 'also')
      .replace(/utilize/gi, 'use');
  }
  
  if (options.fluency > 0.5) {
    result = result.replace(/the fact that/gi, 'because')
      .replace(/in order to/gi, 'to')
      .replace(/for the purpose of/gi, 'for');
  }
  
  if (options.creativity > 0.5) {
    result = result.replace(/good/gi, 'excellent')
      .replace(/bad/gi, 'terrible')
      .replace(/said/gi, 'mentioned');
  }
  
  return result;
};

const TextProcessor: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [options, setOptions] = useState({
    tone: 'casual',
    fluency: 0.7,
    creativity: 0.5,
    simplicity: 0.3,
  });
  const { user } = useAuthStore(); // Get user from auth store

  const handleSaveRewrite = async (input: string, output: string) => {
    if (!user) {
      // This case should ideally not be hit if buttons are disabled for non-logged-in users,
      // but it's a good safeguard.
      console.log("User not logged in. Cannot save rewrite.");
      return;
    }
    if (!output) {
      console.log("No output text to save.");
      return;
    }

    try {
      const { error } = await supabase
        .from('rewrites') // Make sure 'rewrites' is your table name
        .insert([{ user_id: user.id, input_text: input, output_text: output }]);
      
      if (error) throw error;
      console.log('Rewrite saved successfully!');
      // Optionally, provide user feedback e.g., a toast notification
      // import toast from 'react-hot-toast';
      // toast.success('Rewrite saved to your dashboard!');
    } catch (error: any) {
      console.error('Error saving rewrite:', error);
      // Optionally, provide user feedback for the error
      // toast.error(`Failed to save rewrite: ${error.message}`);
    }
  };

  const processText = async () => { // Make processText async if it wasn't already
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API delay
    // In a real app, your API call would be here
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    const result = humanizeText(inputText, options);
    setOutputText(result);
    setIsProcessing(false);

    // Save rewrite if user is logged in and output is generated
    if (user && result) {
      await handleSaveRewrite(inputText, result);
    }
  };

  const handleRandomStyleAndProcess = async () => {
    if (!inputText.trim()) return;
    
    const randomOptions = {
      tone: ['casual', 'formal', 'friendly', 'professional'][Math.floor(Math.random() * 4)],
      fluency: Math.random(),
      creativity: Math.random(),
      simplicity: Math.random(),
    };
    setOptions(randomOptions);
    
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = humanizeText(inputText, randomOptions); // Use randomOptions here
    setOutputText(result);
    setIsProcessing(false);

    if (user && result) {
      await handleSaveRewrite(inputText, result);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleOptionChange = (option: string, value: any) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Input Section */}
        <div className="lg:w-1/2 p-6 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Input Text</h3>
            <div className="text-xs text-gray-500">
              {inputText.length} characters
            </div>
          </div>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
            placeholder="Paste your AI-generated text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
        
        {/* Output Section */}
        <div className="lg:w-1/2 p-6 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Humanized Text</h3>
            <button
              className={`p-2 rounded-full ${
                copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition duration-200`}
              onClick={handleCopy}
              disabled={!outputText}
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div 
            className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center h-full">
                <RotateCw className="animate-spin text-blue-500 mr-2\" size={20} />
                <span className="text-gray-600">Humanizing text...</span>
              </div>
            ) : outputText ? (
              <p className="text-gray-800">{outputText}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FileText size={32} className="mb-2" />
                <p>Your humanized text will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Controls Section */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-y-4 -mx-2">
          {/* Tone Selection */}
          <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={options.tone}
              onChange={(e) => handleOptionChange('tone', e.target.value)}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          
          {/* Fluency Slider */}
          <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fluency: {Math.round(options.fluency * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={options.fluency}
              onChange={(e) => handleOptionChange('fluency', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          {/* Creativity Slider */}
          <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Creativity: {Math.round(options.creativity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={options.creativity}
              onChange={(e) => handleOptionChange('creativity', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
          
          {/* Simplicity Slider */}
          <div className="px-2 w-full sm:w-1/2 lg:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Simplicity: {Math.round(options.simplicity * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={options.simplicity}
              onChange={(e) => handleOptionChange('simplicity', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={processText} // Uses the updated processText function
            disabled={!inputText.trim() || isProcessing}
          >
            {isProcessing && options.tone === options.tone /* Basic check to see if it's not random style */ ? (
              <RotateCw className="animate-spin mr-2" size={18} />
            ) : (
              <Sparkles className="mr-2" size={18} />
            )}
            Humanize Text
          </button>
          
          <button
            className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={handleRandomStyleAndProcess} // Use the new handler for random style
            disabled={!inputText.trim() || isProcessing}
          >
            {isProcessing && options.tone !== options.tone /* This logic for spinner might need refinement if both can be active */ ? (
              <RotateCw className="animate-spin mr-2" size={18} />
            ) : (
              <Shuffle className="mr-2" size={18} />
            )}
            Random Style
          </button>
          
          <button
            className="flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full transition-colors duration-200"
            onClick={() => {
              setInputText('');
              setOutputText('');
            }}
            disabled={!inputText && !outputText}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;