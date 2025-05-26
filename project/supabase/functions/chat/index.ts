import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { portfolioChatbot } from "./chatbot.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    // Must return 200 with CORS headers!
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const response = await portfolioChatbot(message);

    return new Response(JSON.stringify({ response }), { headers: corsHeaders });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
