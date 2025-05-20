---
title: "Building a Chatbot with OpenAI, Supabase, and Edge Functions"
date: "Mar 15, 2025"
author: "Anouar Tizgui"
tags: ["React", "AI", "architecture", "Web Development"]
category: "Artificial Intelligence"
description: "Build a powerful chatbot using OpenAI, Supabase, and Edge Functions—three technologies that ensure efficiency, scalability, and lightning-fast responses."
---

## Introduction

Chatbots are revolutionizing the way users interact with websites and applications. Whether for customer support, lead generation, or enhancing user engagement, AI-powered chatbots provide real-time assistance while reducing operational costs. In this blog, we’ll walk through how to build a powerful chatbot using OpenAI, Supabase, and Edge Functions—three technologies that ensure efficiency, scalability, and lightning-fast responses.

## Why These Technologies?

Before diving into the technical steps, let’s explore why we’re using these specific technologies:

- **OpenAI**: Provides powerful AI-driven responses, enabling your chatbot to understand and respond to user queries intelligently.
- **Supabase**: Acts as a scalable backend for authentication, data storage, and serverless functions.
- **Edge Functions**: Improve response times by executing functions closer to the user, making interactions feel seamless and near-instant.

---

## Step 1: Setting Up Supabase

### 1.1 Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up.
2. Click "New Project" and provide a name for your chatbot project.
3. Note down the **API keys** as we’ll need them later.

### 1.2 Create a Database Table for Chat History (Optional)

Navigate to the **SQL Editor** and run the following:

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_message TEXT,
    bot_response TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```

This table stores user inputs and bot responses, helping you analyze and improve the chatbot’s performance over time.

---

## Step 2: Integrating OpenAI API

### 2.1 Get Your OpenAI API Key

1. Sign up at [OpenAI](https://openai.com/).
2. Navigate to API settings and generate a **secret key**.

### 2.2 Make API Calls to OpenAI

In your React app, install Axios:

```bash
npm install axios
```

Then use the following helper:

```js
import axios from "axios";

const getChatbotResponse = async (message) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    },
    {
      headers: { Authorization: `Bearer YOUR_OPENAI_API_KEY` },
    }
  );
  return response.data.choices[0].message.content;
};
```

---

## Step 3: Deploying Edge Functions in Supabase

### 3.1 Creating an Edge Function

1. Open the **Supabase Dashboard**.
2. Go to **Edge Functions** and click "New Function".
3. Use the following code:

```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("Chatbot Edge Function running...");

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method Not Allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid input: 'message' is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      return new Response(
        JSON.stringify({ error: "OpenAI API Error", details: error }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const openaiData = await openaiRes.json();
    const botResponse = openaiData.choices[0]?.message?.content ?? "Sorry, I couldn't understand that.";

    return new Response(
      JSON.stringify({ botResponse }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

Deploy using:

```bash
supabase functions deploy chatbot-function
```

---

## Step 4: Building the Chatbot UI in React

Use Tailwind and React for the frontend:

```js
import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = input;
    setMessages([...messages, { role: "user", content: userMessage }]);
    setInput("");

    const response = await fetch("YOUR_SUPABASE_EDGE_FUNCTION_URL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    setMessages([...messages, { role: "bot", content: data.botResponse }]);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="h-64 overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "user" ? "text-right" : "text-left"}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Chatbot;
```

---

## Step 5: Deployment

- Push to GitHub.
- Deploy using Vercel, Netlify, or another platform.
- Add API keys and edge function URL to environment variables.

---

## Lessons Learned

- Caching and reducing API calls improved latency.
- Handling edge cases prevented user crashes.
- A better UI helped improve retention and usability.

---

## References

- <a href="https://platform.openai.com/docs" target="_blank">OpenAI Documentation</a>  
- <a href="https://supabase.com/docs" target="_blank">Supabase Documentation</a>  
- <a href="https://supabase.com/docs/guides/functions" target="_blank">Supabase Edge Functions</a>  
- <a href="https://github.com/pgvector/pgvector" target="_blank">pgvector</a>  
- <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>  
- <a href="https://axios-http.com/" target="_blank">Axios</a>  
- <a href="https://reactjs.org/" target="_blank">React</a>
