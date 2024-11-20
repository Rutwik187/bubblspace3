"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "How can I cancel my subscription to BubblSpace?",
    answer:
      "You may cancel your subscription at any time by contacting our support team at contact@bubblspace.com. Your cancellation will take effect at the end of the current billing period.",
  },
  {
    question: "Can I get a refund for my BubblSpace subscription?",
    answer:
      "No refunds will be issued for the current billing period. Your subscription will remain active until the end of the current billing period. Refunds will only be given for services not yet consumed.",
  },
  {
    question: "Who owns the content generated by BubblSpace AI services?",
    answer:
      "You retain ownership of your input and the output generated by our AI services. However, you grant us a worldwide license to use, host, store, reproduce, modify, create derivative works, communicate, publish, and distribute the content as needed to provide and improve our services.",
  },
  {
    question:
      " What are the limitations and disclaimers associated with using BubblSpace services?",
    answer:
      "BubblSpace AI agents and models may generate erroneous, biased, or misleading results. Users should not rely on AI-generated content as a sole source of truth. AIEDX PRIVATE LIMITED disclaims all warranties and is not liable for any damages arising from the use of our services. Users are responsible for verifying the accuracy and appropriateness of AI outputs.",
  },
];

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
            <div className="">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl">
                Unlocking Artificial Intelligence .
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                At AIEDX, we are a team of passionate innovators and tech
                enthusiasts. We love coding, developing AI solutions, and
                creating cutting-edge tools for Large Language Models (LLMs).
                Our relentless commitment to harnessing the power of LLMs drives
                us to build agent-centric applications that are transforming the
                way users and businesses operate.
              </p>
            </div>

            <div className="relative pl-20 pr-6 sm:pl-6 md:px-0">
              <div className="relative w-full max-w-xs mt-4 mb-10 ml-auto">
                <Image
                  className="ml-auto"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/person.jpg"
                  alt=""
                  width={300}
                  height={300}
                />

                <Image
                  className="absolute -top-4 -left-12"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg"
                  alt=""
                  width={300}
                  height={300}
                />

                <div className="absolute -bottom-10 -left-16">
                  <div className="bg-yellow-300">
                    <div className="px-8 py-10">
                      <span className="block text-4xl font-bold text-black lg:text-5xl">
                        {" "}
                        50%{" "}
                      </span>
                      <span className="block mt-2 text-base leading-tight text-black">
                        {" "}
                        Faster Blog
                        <br />
                        Creation{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl">
          Who We Are
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          We are AIEDX Private Limited, a forward-thinking company dedicated to
          advancing artificial intelligence. Our team is fueled by curiosity and
          a deep-seated love for technology. We specialize in creating
          intelligent solutions that push the boundaries of what’s possible with
          AI.
        </p>

        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl mt-8">
          Our Vision
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Unlocking limitless Artificial Intelligence potential for users
          through AI agents. We envision a world where AI is seamlessly
          integrated into everyday life, making complex tasks simpler and
          driving innovation across industries. By continually pushing the
          envelope in AI research and development, we strive to be at the
          forefront of this exciting field.
        </p>

        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl mt-8">
          Our Mission
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Our mission is to enable users to harness AI’s full potential
          responsibly, fostering innovation and collaboration for a smarter
          future. We aim to empower businesses and individuals with tools that
          enhance productivity, streamline operations, and open up new
          possibilities.
        </p>

        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl mt-8">
          Our Innovations
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          At the heart of our offerings is Beluga: Our Context-Based Progression
          Engine. Beluga is designed to provide context-aware progression,
          ensuring that our AI solutions are always relevant and effective. This
          engine powers BubblSpace, our SaaS application that allows users to
          build and deploy AI agents with just a few clicks. BubblSpace is
          intuitive, robust, and designed to make AI accessible to everyone,
          regardless of their technical background.
        </p>

        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl mt-8">
          Join Us on Our Journey
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          As we continue to grow and evolve, we invite you to join us on our
          journey. Whether you are a potential partner, customer, or team
          member, there is a place for you at AIEDX. Together, we can unlock the
          full potential of artificial intelligence and create a smarter, more
          connected world.
        </p>

        <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl mt-8">
          Contact Us
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Feel free to reach out to us for more information about our products,
          services, or opportunities to collaborate. We are excited to hear from
          you and explore how we can work together to achieve great things.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          To know more about AIEDX visit{" "}
          <a href="https://aiedx.com" className="text-primary">
            https://aiedx.com
          </a>
        </p>
      </div>

      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <summary
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                {openIndex === index && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>{faq.answer} </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 textbase mt-9">
            Didn’t find the answer you are looking for?{" "}
            <Link
              href="/contact-us"
              title=""
              className="font-medium text-primary transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
            >
              Contact our support
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;