import { Cohere } from "@langchain/cohere";
import { getRelevantDocs } from "./retrieveAndChat";

const cohere = new Cohere({ apiKey: Deno.env.get('COHERE_API_KEY')});

export async function portfolioChatbot(userQuery: string): Promise<string> {
  const docs = await getRelevantDocs(userQuery); // returns array of docs; empty if nothing found

  let prompt: string;
  if (docs.length > 0) {
    // Portfolio match found: use RAG
    const context = docs.map(doc => doc.pageContent).join("\n");
    prompt = `You are a helpful AI assistant for a portfolio website. Use the following info to answer:\n${context}\nUser: ${userQuery}`;
  } else {
    // No portfolio match: fallback to general-purpose LLM
    prompt = `You are a helpful AI assistant. The user asked: ${userQuery}`;
  }

  const response = await cohere.generate({
    model: "command",
    prompt,
    maxTokens: 150,
    temperature: 0.7
  });

  return response.generations[0].text;
}