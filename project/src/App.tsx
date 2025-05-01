import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Background } from "./components/Background.tsx";
import { Header } from "./components/Header.tsx";
import { Home } from "./pages/Home.tsx";
import { Resume } from "./pages/Resume.tsx";
import { ChatBot } from "./components/Chat/ChatBot.tsx";
import { Blog } from "./pages/Blog.tsx";
import { BlogPost } from "./pages/BlogPost.tsx";
import "./styles/animations.css";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-white">
        <Background />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />{" "}
          </Routes>
        </main>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}

export default App;
