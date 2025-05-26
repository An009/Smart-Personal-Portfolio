import { createClient } from "npm:@supabase/supabase-js";
import { CohereEmbeddings } from "npm:@langchain/cohere";
import { SupabaseVectorStore } from "npm:@langchain/community/vectorstores/supabase";
import { Document } from "npm:langchain/document";

// Read your environment variables (ensure these are set in your environment)
const supabaseUrl =
  Deno.env.get("VITE_SUPABASE_URL") ||
  "https://idcheltewqbwdyqhiuyg.supabase.co";
const supabaseKey =
  Deno.env.get("VITE_SUPABASE_ANON_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkY2hlbHRld3Fid2R5cWhpdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjgwOTIsImV4cCI6MjA2MjUwNDA5Mn0.kA_QwfwQ6wKPlpXPPgBb-ZIsc39sKuFFWqx1m3KB18M";
const cohereApiKey =
  Deno.env.get("COHERE_API_KEY") || "K1FhudIVdkXkXt1tuCcKoORkApdqs9genUeOhBay";

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL environment variable is not set");
}
if (!supabaseKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY environment variable is not set");
}
if (!cohereApiKey) {
  throw new Error("COHERE_API_KEY environment variable is not set");
}

// Set up Supabase and LangChain
const supabase = createClient(supabaseUrl, supabaseKey);

const embeddings = new CohereEmbeddings({
  apiKey: cohereApiKey,
  model: "embed-english-v3.0",
  // inputType: "search_document", // Optional, useful for ingestion
});

// Helper: Load the Supabase vector store
const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: "embeddings", // matches your table
  queryName: "match_embeddings", // matches your function
});

/**
 * Retrieve relevant documents from the Supabase vector store.
 * Optionally pass a metadata filter, e.g. { type: "bio" } or { tags: ["ai"] }
 * @param query The user's query string
 * @param filter Optional metadata filter (object)
 * @param k Number of docs to retrieve (default: 4)
 * @returns Promise<Document[]>
 */
export async function getRelevantDocs(
  query: string,
  filter: Record<string, unknown> = {},
  k: number = 4
): Promise<Document[]> {
  // LangChain will convert filter to JSONB for metadata @> filter in SQL
  return await vectorStore.similaritySearch(query, k, filter);
}
