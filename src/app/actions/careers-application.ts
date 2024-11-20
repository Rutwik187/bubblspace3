"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitApplication(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const github = formData.get("github") as string;
  const experience = formData.get("experience") as string;
  const coverLetter = formData.get("cover-letter") as string;
  const resume = formData.get("resume") as File;

  try {
    const { error } = await resend.emails.send({
      from: "AIEDX Careers <careers@resend.dev>",
      to: "rutwikshinde34@gmail.com",
      subject: `New Application: ${name} for AI Engineer Position`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        GitHub: ${github}
        Experience: ${experience} years
        
        Cover Letter:
        ${coverLetter}
      `,
      attachments: [
        {
          filename: resume.name,
          content: Buffer.from(await resume.arrayBuffer()),
        },
      ],
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to submit application. Please try again.",
      };
    }

    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to submit application. Please try again.",
    };
  }
}
