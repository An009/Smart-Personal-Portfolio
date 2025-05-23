import { createClient } from "@supabase/supabase-js";
import { CohereEmbeddings } from "@langchain/cohere";
import { Document } from "langchain/document";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import fs from "fs";

// Load env vars
const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
const embeddings = new CohereEmbeddings({ apiKey: Deno.env.get('COHERE_API_KEY')});

// Load and parse portfolio content
const portfolio = JSON.parse(fs.readFileSync("portfolio-content.json", "utf-8"));
const docs = portfolio.map((item: any) =>
  new Document({
    pageContent: item.content,
    metadata: { type: item.type, tags: item.tags } // All metadata as one object!
  })
);
// Store embeddings in Supabase
(async () => {
  await SupabaseVectorStore.fromDocuments(docs, embeddings, {
    client: supabase,
    tableName: "embeddings"
  });
  console.log("Embeddings ingested!");
})();