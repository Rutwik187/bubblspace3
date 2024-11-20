"use client";

import Heading from "@/components/ui/heading";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const Page = () => {
  const { toast } = useToast();

  const submitForm = async (formData: FormData) => {
    try {
      const response = await axios({
        url: "https://scf9py73ya.execute-api.ap-south-1.amazonaws.com/dev/contactUs",
        method: "POST",
        data: { ...formData },
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_CONTACT_US ?? "",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit form");
    }
  };

  const { mutate } = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully",
        description: "We will contact you soon",
      });
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: FormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };
    mutate(data);
  };

  return (
    <section className="py-10 bg-secondary dark:bg-background sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Heading>Contact Us</Heading>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
            Your Inquiries, Our Expertise
          </p>
          <p className="max-w-xl mx-auto text-base leading-relaxed text-primary font-bold">
            AIEDX Private Limited
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
            {[
              { icon: "phone", text: "+91 75061 55016" },
              { icon: "email", text: "contact@bubblspace.com" },
              {
                icon: "location",
                text: "A-6, Samundar Darshan , Andheri West, Mumbai-400053, India.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <svg
                    className="flex-shrink-0 w-10 h-10 mx-auto text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {item.icon === "phone" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    )}
                    {item.icon === "email" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    )}
                    {item.icon === "location" && (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    )}
                  </svg>
                  <p className="mt-6 text-lg font-medium text-foreground">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 overflow-hidden bg-card rounded-xl shadow-lg"
          >
            <div className="px-6 py-12 sm:p-12">
              <h3 className="text-3xl font-semibold text-center text-foreground">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit} method="POST" className="mt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                  {[
                    {
                      name: "name",
                      label: "Your name",
                      type: "text",
                      placeholder: "Enter your full name",
                    },
                    {
                      name: "email",
                      label: "Email address",
                      type: "email",
                      placeholder: "Enter your email address",
                    },
                    {
                      name: "phone",
                      label: "Phone number",
                      type: "tel",
                      placeholder: "Enter your phone number",
                    },
                    {
                      name: "company",
                      label: "Company name",
                      type: "text",
                      placeholder: "Enter your company name",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="text-base font-medium text-foreground"
                      >
                        {field.label}
                      </label>
                      <div className="mt-2.5 relative">
                        <input
                          required
                          type={field.type}
                          name={field.name}
                          id={field.name}
                          placeholder={field.placeholder}
                          className="block w-full px-4 py-4 text-foreground placeholder-muted-foreground transition-all duration-200 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-base font-medium text-foreground"
                    >
                      Message
                    </label>
                    <div className="mt-2.5 relative">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your message"
                        className="block w-full px-4 py-4 text-foreground placeholder-muted-foreground transition-all duration-200 bg-background border border-input rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={4}
                      ></textarea>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-md focus:outline-none hover:bg-primary/90 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Page;
