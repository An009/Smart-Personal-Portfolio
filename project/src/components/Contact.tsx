import React, { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { supabase } from "./supabaseClient.ts";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Insert data into Supabase table
      const { error: supabaseError } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // Send email using Edge Function via fetch
      const response = await fetch(
        "https://idcheltewqbwdyqhiuyg.supabase.co/functions/v1/send-contact-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If your function is protected, you may need to add Supabase keys here
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Edge Function Error:", data);
        throw new Error(
          data?.error ||
            "An error occurred while sending your message. Please try again."
        );
      }

      setSuccessMessage(
        "Thank you for reaching out! We've sent a confirmation to your email."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Full submission error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Get In Touch
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-white">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-800 dark:text-gray-300">
                    tizguianouar@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-800 dark:text-gray-300">
                    Let's discuss your project
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-400 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-400 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-400 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>

              {successMessage && (
                <p className="text-green-500 text-sm text-center">
                  {successMessage}
                </p>
              )}

              {errorMessage && (
                <p className="text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
