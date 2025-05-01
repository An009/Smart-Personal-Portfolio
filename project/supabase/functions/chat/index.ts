import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { CohereClient } from "npm:cohere-ai";
import { createClient } from "npm:@supabase/supabase-js";

// Initialize Supabase
const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!;
const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Cohere
const cohereApiKey = Deno.env.get('COHERE_API_KEY');
if (!cohereApiKey) {
  throw new Error('COHERE_API_KEY environment variable is required.');
}
const cohere = new CohereClient({
  token: cohereApiKey,
});

// Function to find relevant content using embeddings
async function findRelevantContent(query: string) {
  try {
    // Generate embedding for the query
    const queryEmbedding = await cohere.embed({
      texts: [query],
      model: 'embed-english-v3.0',
    });

    // Perform vector similarity search
    const { data, error } = await supabase
      .rpc('match_embeddings', {
        query_embedding: (queryEmbedding.embeddings as number[][])[0],
        match_threshold: 0.7, // Adjust the threshold as needed
        match_count: 3, // Number of results to return
      });

    if (error) {
      console.error('Error finding relevant content:', error);
      return null;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error in findRelevantContent:', error);
    return null;
  }
}

// Function to generate a response using Cohere API
async function generateResponse(query: string) {
  try {
    // Find relevant content
    const relevantContent = await findRelevantContent(query);

    if (!relevantContent || relevantContent.length === 0) {
      return 'I apologize, but I couldn\'t find any relevant information.';
    }

    // Combine the relevant content into a single string
    const context = relevantContent.map((item: { content: string }) => item.content).join('\n');

    // Generate a response using the Cohere API
    const response = await cohere.generate({
      model: 'command',
      prompt: `You are a helpful AI assistant for a portfolio website. 
               Here is some relevant information about the portfolio owner:
               ${context}
               User: ${query}`,
      maxTokens: 150,
      temperature: 0.7,
    });

    return response.generations[0].text;
  } catch (error) {
    console.error('Error in generateResponse:', error);
    return 'An error occurred while generating a response.';
  }
}

// Main function to handle requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    // Generate a response using the Cohere API and embeddings
    const response = await generateResponse(message);

    return new Response(
      JSON.stringify({ 
        response 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error);
    }
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request.' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  }
});