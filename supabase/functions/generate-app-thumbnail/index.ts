
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating app thumbnail...');
    
    // Generate a simple SVG-based thumbnail since OpenAI API requires key
    const svgThumbnail = `
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E0E7FF;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1024" height="1024" rx="180" fill="url(#bgGradient)"/>
        
        <!-- Main Icon Circle -->
        <circle cx="512" cy="400" r="120" fill="url(#iconGradient)" opacity="0.9"/>
        
        <!-- Target/Checkmark Icon -->
        <path d="M450 400 L490 440 L570 360" stroke="#3B82F6" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        
        <!-- App Name -->
        <text x="512" y="600" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="white">
          DailyTasker
        </text>
        
        <!-- Subtitle -->
        <text x="512" y="670" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="white" opacity="0.8">
          AI Powered
        </text>
        
        <!-- Decorative Elements -->
        <circle cx="200" cy="200" r="20" fill="white" opacity="0.3"/>
        <circle cx="824" cy="150" r="15" fill="white" opacity="0.4"/>
        <circle cx="150" cy="800" r="25" fill="white" opacity="0.2"/>
        <circle cx="850" cy="850" r="18" fill="white" opacity="0.3"/>
      </svg>
    `;

    // Convert SVG to base64
    const base64Svg = btoa(svgThumbnail);
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;
    
    console.log('Generated SVG thumbnail successfully');
    
    return new Response(JSON.stringify({ 
      imageUrl: dataUrl,
      imageData: base64Svg,
      message: 'Generated using built-in SVG generator'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate thumbnail',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
