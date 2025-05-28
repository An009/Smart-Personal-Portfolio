import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);
const openai = new OpenAI(Deno.env.get('OPENAI_API_KEY')!);

serve(async (req) => {
  const { restaurant_id, session_id, user_message } = await req.json();

  // 1. Ensure session exists
  await supabase
    .from('chat_sessions')
    .insert({ id: session_id, restaurant_id })
    .maybeSingle();

  // 2. Fetch system prompt and menu
  const { data: rest } = await supabase
    .from('restaurants')
    .select('system_prompt')
    .eq('id', restaurant_id)
    .single();
  const { data: menu } = await supabase
    .from('menu_items')
    .select('name,description,price')
    .eq('restaurant_id', restaurant_id);

  // 3. Save user message
  await supabase.from('messages').insert({
    session_id,
    role: 'user',
    content: user_message,
  });

  // 4. Build prompt sequence
  const systemPrompt = rest?.system_prompt
    || `You are an assistant for restaurant ${restaurant_id}. Menu: ${JSON.stringify(menu)}.`;
  const chatHistory = (await supabase
    .from('messages')
    .select('role,content')
    .eq('session_id', session_id)
    .order('created_at', { ascending: true })
  ).data!;
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: user_message },
  ];

  // 5. Call OpenAI
  const resp = await openai.chat.completions.create({
    model: 'gpt-4',
    messages,
  });
  const assistant = resp.choices[0].message.content;

  // 6. Save assistant reply
  await supabase.from('messages').insert({
    session_id,
    role: 'assistant',
    content: assistant,
  });

  // 7. Return reply
  return new Response(JSON.stringify({ assistant }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
