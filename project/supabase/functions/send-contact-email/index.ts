import { serve } from "httpserver";
import { Resend } from "resend";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "tizguianouar@gmail.com";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "contact@aissamtaouili.com";
const SITE_NAME = Deno.env.get("SITE_NAME") || "anouarCodes";
serve(async (req) => {
  try {
    // Use the official CORS headers
    const headers = {
      ...corsHeaders,
      "Content-Type": "application/json",
    };
    5;
    // Handle OPTIONS request for CORS preflight`
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers,
        status: 204,
      });
    }
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed",
        }),
        {
          status: 405,
          headers,
        },
      );
    }
    // Get the form data from the request body
    const { name, email, message } = await req.json();
    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields",
        }),
        {
          status: 400,
          headers,
        },
      );
    }
    console.log("Received data:", {
      name,
      email,
      message,
    });
    // Generate current date for email footer
    const currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // User confirmation email template
    const userEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f7fafc;
          margin: 0;
          padding: 0;
          color: #4a5568;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px 0;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .message-box {
          background-color: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 20px 0;
          font-style: italic;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #718096;
          text-align: center;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-weight: 500;
          margin: 20px 0;
        }
        .social-links {
          margin: 20px 0;
          text-align: center;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #667eea;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Us</h1>
        </div>
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          <p>We've received your message and truly appreciate you reaching out to ${SITE_NAME}. Our team will review your inquiry and get back to you within 24-48 hours.</p>
          
          <p>Here's what you sent us:</p>
          <div class="message-box">
            ${message}
          </div>
          
          <p>If you need immediate assistance, please don't hesitate to contact us directly at <a href="mailto:${FROM_EMAIL}">${FROM_EMAIL}</a>.</p>
          
          <div style="text-align: center;">
            <a href="https://www.anouarcodes.tech" class="button">Visit Our Website</a>
          </div>
          
          <div class="social-links">
            <p>Connect with us:</p>
            <a href="https://x.com/an_war66777631">Twitter</a>
            <a href="https://www.linkedin.com/in/tizgui-anouar-081439183">LinkedIn</a>
            <a href="https://github.com/An009">Github</a>
          </div>
          
          <div class="footer">
            <p>© ${
      new Date().getFullYear()
    } ${SITE_NAME}. All rights reserved.</p>
            <p>${currentDate}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
    // Admin notification email template
    const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f7fafc;
          margin: 0;
          padding: 0;
          color: #4a5568;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          padding: 30px 0;
          text-align: center;
          border-radius: 8px 8px 0 0;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .details {
          margin: 20px 0;
        }
        .details p {
          margin: 10px 0;
        }
        .details strong {
          color: #2d3748;
        }
        .message-box {
          background-color: #fff5f5;
          border-left: 4px solid #f56565;
          padding: 15px;
          margin: 20px 0;
          font-style: italic;
        }
        .actions {
          margin-top: 30px;
          text-align: center;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 5px;
          font-weight: 500;
          margin: 0 10px;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #718096;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p>You've received a new message through the ${SITE_NAME} contact form:</p>
          
          <div class="details">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Date:</strong> ${currentDate}</p>
          </div>
          
          <div class="message-box">
            ${message}
          </div>
          
          <div class="actions">
            <a href="mailto:${email}" class="button">Reply to ${name}</a>
            <a href="https://www.anouarcodes.tech/admin/contacts" class="button" style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);">View in Dashboard</a>
          </div>
          
          <div class="footer">
            <p>This message was sent from your website contact form at ${SITE_NAME}.</p>
            <p>© ${
      new Date().getFullYear()
    } ${SITE_NAME}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: [email],
      subject: `Thank you for contacting ${SITE_NAME}!`,
      html: userEmailHtml,
    });
    // Send notification email to admin
    const adminEmailPromise = resend.emails.send({
      from: `${SITE_NAME} Contact Form <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `New Contact: ${name} - ${SITE_NAME}`,
      html: adminEmailHtml,
    });
    // Wait for both emails to be sent
    const [userEmailResult, adminEmailResult] = await Promise.all([
      userEmailPromise,
      adminEmailPromise,
    ]);
    // Check for errors
    if (userEmailResult.error) {
      console.error("User email error:", userEmailResult.error);
      throw userEmailResult.error;
    }
    if (adminEmailResult.error) {
      console.error("Admin email error:", adminEmailResult.error);
      throw adminEmailResult.error;
    }
    return new Response(
      JSON.stringify({
        success: true,
        userEmail: userEmailResult.data,
        adminEmail: adminEmailResult.data,
      }),
      {
        status: 200,
        headers,
      },
    );
  } catch (error) {
    console.error("Error in edge function:", error);
    return new Response(
      JSON.stringify({
        error: typeof error === "object" && error !== null && "message" in error
          ? error.message || "An unexpected error occurred"
          : "An unexpected error occurred",
        details: error,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
