"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function sendMessage(prevState: any, formData: FormData) {
  try {
    const parsed = schema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New contact form message from ${parsed.name}`,
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <h2>📩 New Message From Your Portfolio</h2>
          <p><b>Name:</b> ${parsed.name}</p>
          <p><b>Email:</b> ${parsed.email}</p>
          <p><b>Message:</b></p>
          <p>${parsed.message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return { ok: true, message: "Message sent successfully!" };
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      message: "Could not send message. Try again later.",
    };
  }
}
