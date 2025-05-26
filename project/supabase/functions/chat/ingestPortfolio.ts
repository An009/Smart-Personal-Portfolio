import { createClient } from "npm:@supabase/supabase-js";
import { CohereEmbeddings } from "npm:@langchain/cohere";
import { Document } from "npm:langchain/document";
import { SupabaseVectorStore } from "npm:@langchain/community/vectorstores/supabase";

// Load env vars
const supabaseUrl =
  Deno.env.get("VITE_SUPABASE_URL") ||
  "https://idcheltewqbwdyqhiuyg.supabase.co";
const supabaseAnonKey =
  Deno.env.get("VITE_SUPABASE_ANON_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkY2hlbHRld3Fid2R5cWhpdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjgwOTIsImV4cCI6MjA2MjUwNDA5Mn0.kA_QwfwQ6wKPlpXPPgBb-ZIsc39sKuFFWqx1m3KB18M";
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const embeddings = new CohereEmbeddings({
  apiKey:
    Deno.env.get("COHERE_API_KEY") ||
    "K1FhudIVdkXkXt1tuCcKoORkApdqs9genUeOhBay",
  model: "embed-english-v3.0",
  inputType: "search_document",
});

// Load and parse portfolio content (Deno-style file reading)
const portfolio = JSON.parse(await Deno.readTextFile("portfolio-content.json"));

type PortfolioItem = {
  content: string;
  metadata: {
    type: string;
    tags: string[];
  };
};

// FIXED: Use item.metadata as metadata!
const docs = portfolio.map(
  (item: PortfolioItem) =>
    new Document({
      pageContent: item.content,
      metadata: item.metadata,
    })
);

// Store embeddings in Supabase
await SupabaseVectorStore.fromDocuments(docs, embeddings, {
  client: supabase,
  tableName: "embeddings",
});
console.log("Embeddings ingested!");
