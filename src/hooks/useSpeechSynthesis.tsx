
import { useCallback } from "react";

export const useSpeechSynthesis = () => {
  const speak = useCallback((text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: string;
  }) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech Synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options?.rate || 0.8;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = options?.volume || 0.8;

    // Try to find a preferred voice
    const voices = speechSynthesis.getVoices();
    let preferredVoice = null;

    if (options?.voice) {
      preferredVoice = voices.find(voice => voice.name.includes(options.voice!));
    } else {
      // Default preference order
      preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') ||
        voice.lang.includes('en')
      );
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  }, []);

  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }, []);

  const getVoices = useCallback(() => {
    if ('speechSynthesis' in window) {
      return speechSynthesis.getVoices();
    }
    return [];
  }, []);

  return {
    speak,
    cancel,
    getVoices,
    isSupported: 'speechSynthesis' in window
  };
};
