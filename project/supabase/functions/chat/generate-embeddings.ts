import { CohereClient } from "npm:cohere-ai";
import { createClient } from "npm:@supabase/supabase-js";

// Load environment variables using Deno.env
const cohereApiKey = Deno.env.get("COHERE_API_KEY")?.trim();
const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim();
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")?.trim();

if (!cohereApiKey || !supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing environment variables. Ensure COHERE_API_KEY, SUPABASE_URL, and SUPABASE_ANON_KEY are set."
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
  await Deno.readTextFile("portfolio-content.json")
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
