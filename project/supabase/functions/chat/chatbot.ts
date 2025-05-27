import { Cohere } from "npm:@langchain/cohere";
import { getRelevantDocs } from "./retrieveAndChat.ts";

const cohere = new Cohere({ apiKey: Deno.env.get("COHERE_API_KEY") });

const FALLBACK_CONTEXT = `
I am Anouar Tizgui, a developer from Tinghir.
I have hands-on experience with React, Astro, python, and MongoDB.
I completed 300+ hours of coursework in Relational Databases, Web Design, and Front-End Libraries at freeCodeCamp.
I have operated laser engraving machines in the automotive industry, ensuring quality standards.
Problem-solving and analytical thinking are my strengths, especially in complex situations.
I thrive in collaborative engineering environments and am motivated by challenging, real-world problems and continuous learning.
`;

const PROMPT_TEMPLATE = `
You are Anouar Tizgui, an AI assistant for your portfolio website.

## Guidelines
- Speak in first person ("I", "me", "my") as Anouar Tizgui.
- Be friendly, professional, and concise.
- DO NOT say "could be included on your portfolio website" or refer to yourself in the third person.
- Use Markdown formatting: bullet points, bold, headers, and clear paragraphs.
- Only answer about your personal/professional info, skills, experience, education, tools, goals, and achievements.
- If asked about topics outside your portfolio, politely redirect: "I'm here to talk about my work, skills, or experience—ask me anything about that!"

## Resume Information
{resumeContext}

## Current Question
{question}

Your response:
`;

export async function portfolioChatbot(userQuery: string): Promise<string> {
  const docs = await getRelevantDocs(userQuery);

  // Use retrieved docs or fallback
  let resumeContext = "";
  if (docs.length > 0) {
    resumeContext = docs.map((doc) => doc.pageContent).join("\n\n");
  } else {
    resumeContext = FALLBACK_CONTEXT;
  }

  const prompt = PROMPT_TEMPLATE.replace(
    "{resumeContext}",
    resumeContext
  ).replace("{question}", userQuery);

  const response = await cohere.invoke(prompt);
  return response;
}
