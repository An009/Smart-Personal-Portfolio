---
title: "Building a Chatbot with OpenAI, Supabase, and Edge Functions"
date: "Mar 15, 2024"
author: "Anouar Tizgui"
tags: ["React", "AI", "archeticture", "Web Development"]
category: "Artificial Intelligence"
description: "powerful chatbot using OpenAI, Supabase, and Edge Functions—three technologies that ensure efficiency, scalability, and lightning-fast responses."
---

## Introduction

Chatbots are revolutionizing the way users interact with websites and applications. Whether for customer support, lead generation, or enhancing user engagement, AI-powered chatbots provide real-time assistance while reducing operational costs. In this blog, we’ll walk through how to build a powerful chatbot using OpenAI, Supabase, and Edge Functions—three technologies that ensure efficiency, scalability, and lightning-fast responses.

## Why These Technologies?

Before diving into the technical steps, let’s explore why we’re using these specific technologies:

- **OpenAI**: Provides powerful AI-driven responses, enabling your chatbot to understand and respond to user queries intelligently.
- **Supabase**: Acts as a scalable backend for authentication, data storage, and serverless functions.
- **Edge Functions**: Improve response times by executing functions closer to the user, making interactions feel seamless and near-instant.

Now, let’s get started!

yOrrwSUIMixOApNI4SIfvJGuIDbcUp

## Step 1: Setting Up Supabase

### 1.1 Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up.
2. Click "New Project" and provide a name for your chatbot project.
3. Note down the **API keys** as we’ll need them later.

### 1.2 Create a Database Table for Chat History (Optional)

1. Navigate to the **SQL Editor** and run the following query to create a table:
   ```sql
   CREATE TABLE messages (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       user_message TEXT,
       bot_response TEXT,
       created_at TIMESTAMP DEFAULT now()
   );
   ```
2. This table stores user inputs and bot responses, helping you analyze and improve the chatbot’s performance over time.

## Step 2: Integrating OpenAI API

### 2.1 Get Your OpenAI API Key

1. Sign up at [OpenAI](https://openai.com/).
2. Navigate to API settings and generate a **secret key**.

### 2.2 Make API Calls to OpenAI

In your React app, install Axios to handle API requests:

```bash
npm install axios
```

Then, create a function to send user messages to OpenAI:

```javascript
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

## Step 3: Deploying Edge Functions in Supabase

### 3.1 Creating an Edge Function

1. Open the **Supabase Dashboard**.
2. Navigate to **Edge Functions** and create a new function.
3. Write the function to handle chatbot requests:
   ```javascript
   export default async (req, res) => {
     const { message } = await req.json();
     const botResponse = await getChatbotResponse(message);
     return new Response(JSON.stringify({ botResponse }), { status: 200 });
   };
   ```
4. Deploy the function and note the **public endpoint URL**.

## Step 4: Building the Chatbot UI in React

### 4.1 Creating the Chat Interface

Use **React and Tailwind CSS** to create a simple chatbot UI:

```javascript
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
          <p
            key={index}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
            {msg.content}
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

## Step 5: Deploying Your Chatbot

1. Push your code to GitHub.
2. Deploy to **Vercel, Netlify, or your preferred hosting platform**.
3. Configure environment variables for your **API keys** and **Supabase Edge Function URL**.

## Lessons Learned & Challenges

- **Optimizing OpenAI API Calls**: Caching responses and limiting unnecessary API requests improved performance.
- **Handling Errors**: Implementing error-handling mechanisms prevented crashes.
- **UI/UX Considerations**: Making the chatbot visually appealing and responsive enhanced user experience.

## Conclusion

You’ve now built a fully functional AI-powered chatbot using **OpenAI, Supabase, and Edge Functions**. This chatbot can be expanded with features like **user authentication, message persistence, and multimodal AI responses**. Start experimenting and take your chatbot to the next level!
🚀 **Ready to enhance your chatbot further? Share your improvements and insights in the comments!**
