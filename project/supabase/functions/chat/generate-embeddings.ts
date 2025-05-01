import { CohereClient } from "npm:cohere-ai";
import { createClient } from "npm:@supabase/supabase-js";

// Load environment variables using Deno.env
const cohereApiKey = Deno.env.get("COHERE_API_KEY")?.trim() ||
  "K1FhudIVdkXkXt1tuCcKoORkApdqs9genUeOhBay";
const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ||
  "https://euwiwxdgzadloihaxbvt.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim() ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d2l3eGRnemFkbG9paGF4YnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTk5NTMsImV4cCI6MjA1MTQ5NTk1M30.L3EwPdxPna1_j0mUb2ohYoczQSQcjeXW2ZpnWkx2mmE";

if (!cohereApiKey || !supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing environment variables. Ensure COHERE_API_KEY, SUPABASE_URL, and SUPABASE_ANON_KEY are set.",
  );
}

// Initialize Cohere
const cohere = new CohereClient({
  token: cohereApiKey,
});

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Load portfolio content from JSON file using Deno's file system API
const portfolioContent = JSON.parse(
  await Deno.readTextFile("portfolio-content.json"),
);

// Function to generate embeddings and store them in Supabase
async function generateAndStoreEmbeddings() {
  for (const item of portfolioContent) {
    try {
      // Generate embedding using Cohere
      const embeddingResponse = await cohere.embed({
        texts: [item.content],
        model: "embed-english-v3.0",
        inputType: "search_query", // Add this line
      });

      const embedding = (embeddingResponse.embeddings as number[][])[0];

      // Store embedding in Supabase
      const { data, error } = await supabase
        .from("embeddings")
        .insert([{ content: item.content, embedding }]);

      if (error) {
        console.error("Error storing embedding:", error);
      } else {
        console.log("Embedding stored successfully:", data);
      }
    } catch (error) {
      console.error("Error generating or storing embedding:", error);
    }
  }
}

// Run the function
generateAndStoreEmbeddings();
