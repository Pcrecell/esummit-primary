"use client";

import React, { useState } from "react";

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-green-600/30 rounded-2xl bg-black/60 backdrop-blur-sm mb-4 overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-600 transition-all duration-300"
        onClick={onToggle}
      >
        <h3 className="text-white font-poppins font-semibold text-lg">
          {question}
        </h3>
        <div className="text-white text-2xl transition-transform duration-200">
          {isOpen ? "−" : "+"}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 border-t border-green-600/20">
          <p className="text-gray-300 font-poppins leading-relaxed pt-4">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What is E-Summit?",
      answer: "E-Summit is the flagship entrepreneurship conclave of KIIT Entrepreneurship Cell. It brings together students, innovators, founders, investors, and thought leaders for three days of competitions, workshops, keynote sessions, and networking opportunities."
    },
    {
      question: "What is the registration fee?",
      answer: "The registration fee for E-Summit is Rs. 249 (Early Bird). This includes access to all events, workshops, speaker sessions, networking opportunities, and refreshments during the summit."
    },
    {
      question: "How do I register for E-Summit?",
      answer: "You can register by logging into your dashboard, selecting the events you want to attend, and completing the payment process. Once payment is successful, you'll receive a confirmation email with your registration details."
    },
    {
      question: "What events are included in the registration?",
      answer: "Your registration includes access to keynote speeches, panel discussions, startup pitches, workshops, networking sessions, exhibition areas, and other entrepreneurship-focused activities scheduled during the summit."
    },
    {
      question: "I made the payment but it's not showing as updated. What should I do?",
      answer: (
        <div>
          <p>Payment processing can take 6-8 hours to reflect in our system. If your payment status is still not updated after 8 hours, please contact our support team at{" "}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=pcr.ecell@kiit.ac.in" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 underline transition-colors duration-300"
            >
              pcr.ecell@kiit.ac.in
            </a>
            {" "}with a screenshot of your payment receipt for immediate assistance.
          </p>
        </div>
      )
    },
    {
      question: "What should I bring to the event?",
      answer: "Bring a valid photo ID, your registration confirmation (digital or printed), business cards if you have them, a notebook for taking notes, and comfortable attire suitable for a professional networking environment."
    },
     {
      "question": "Do you offer certificates or participation proofs?",
      "answer": "Yes, all participants will receive E-Summit participation certificates. Winners and finalists will receive special recognition certificates and prizes."
    },
    {
      question: "When and where will E-Summit 2025 take place?",
      answer: (
        <div>
          <p className="mb-3">E-Summit 2025 will take place at KIIT University, Bhubaneswar. Here are the scheduled events:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Oracle - 23rd August (Campus - 6)</li>
            <li>Pandora Paradox - 22nd-24th August (Campus - 25)</li>
            <li>Case X - 24th August (Campus - 17)</li>
            <li>AIF - 23rd August (Campus - 17)</li>
           
          </ul>
        </div>
      )
    },
    {
      "question": "Is there a prize pool or awards?",
      "answer": "Yes! E-Summit 2025 has a ₹1,50,000 prize pool across various competitions, including Oracle and other startup challenges."
    },
     {
      "question": "Are there sponsorship or partnership opportunities?",
      "answer": "Absolutely. E-Summit partners with startups, corporates, and investors every year. For sponsorship/partnership inquiries, please write to pcr.ecell@kiit.ac.in."
    },
    {
      "question": "How can I stay updated?",
      "answer": (
        <div>
          <p className="mb-3">Follow KIIT E-Cell on our social media platforms:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <a 
                href="https://www.instagram.com/ecell_kiit/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 underline transition-colors duration-300"
              >
                Instagram (@ecell_kiit)
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com/company/kiitecell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 underline transition-colors duration-300"
              >
                LinkedIn (KIIT E-Cell)
              </a>
            </li>
            <li>
              <a 
                href="https://facebook.com/kiitecell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 underline transition-colors duration-300"
              >
                Facebook (KIIT E-Cell)
              </a>
            </li>
          </ul>
          <p className="mt-3">You can also check our website regularly for updates.</p>
        </div>
      )
    },
    {
      question: "What is UID?",
      answer: "UID stands for Unique Identifier. It is a uniquely identified ID that each participant needs for their respective events. This ID helps us track your registration and participation across different competitions and activities during E-Summit."
    },
    {
      question: "Who can I contact for support?",
      answer: "For any queries or technical issues, you can reach out to our support team through the contact form on our website or email us directly. We're here to help make your E-Summit experience smooth and memorable."
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="https://ik.imagekit.io/tm5te9cjl/Animate_only_the_202508071556_3lawj.mp4?updatedAt=1754566979113" type="video/mp4" />
      </video>

      {/* Green Particle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 -z-5"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-tourney">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </h1>
          <p className="text-xl text-gray-300 font-poppins max-w-2xl mx-auto">
            Find answers to frequently asked questions about E-Summit
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems[index]}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <a
            href="/dashboard"
            className="inline-block py-3 px-8 bg-gradient-to-br from-black to-green-600 text-white shadow-lg shadow-[#abd65d] border-b-2 border-white text-lg rounded-2xl hover:shadow-[#abd65d] hover:shadow-2xl transition-all duration-[1000ms] font-poppins"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
