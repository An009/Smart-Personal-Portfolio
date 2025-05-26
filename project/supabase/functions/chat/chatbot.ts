import { Cohere } from "npm:@langchain/cohere";
import { getRelevantDocs } from "./retrieveAndChat.ts";

const cohere = new Cohere({ apiKey: Deno.env.get("COHERE_API_KEY") });

export async function portfolioChatbot(userQuery: string): Promise<string> {
  const docs = await getRelevantDocs(userQuery);

  let prompt: string;
  if (docs.length > 0) {
    const context = docs.map((doc) => doc.pageContent).join("\n");
    prompt = `You are a helpful AI assistant for a portfolio website. Use the following info to answer:\n${context}\nUser: ${userQuery}`;
  } else {
    prompt = `You are a helpful AI assistant. The user asked: ${userQuery}`;
  }

  const response = await cohere.invoke(prompt);
  return response;
}
