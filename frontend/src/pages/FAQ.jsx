import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Umeed Global School?",
      answer: "Umeed Global School is an innovative educational institution dedicated to providing world-class education to underprivileged children. We aim to bridge the educational gap and create future leaders from disadvantaged communities."
    },
    {
      question: "Who can apply for admission?",
      answer: "We primarily focus on children from underprivileged backgrounds who demonstrate academic potential and a desire to learn. Our admission process is designed to identify students who can benefit most from our comprehensive educational program."
    },
    {
      question: "What curriculum do you follow?",
      answer: "We follow the CBSE curriculum with a focus on outcome-based learning, interdisciplinary approaches, discussions, and debates. Our curriculum is enhanced with STEM education, innovation labs, and character development programs."
    },
    {
      question: "Is it a residential school?",
      answer: "Yes, we offer residential facilities with a comprehensive 12-hour daily program that includes academics, extracurricular activities, character development, and life skills training in a safe and nurturing environment."
    },
    {
      question: "How is the school funded?",
      answer: "The school is primarily funded through donations and crowdfunding. We have successfully raised ₹6+ crore in just 6 days, demonstrating the overwhelming support for our mission from people across the nation."
    },
    {
      question: "What makes Umeed Global School different?",
      answer: "Our unique approach combines academic excellence with character development, innovation labs, STEM education, and a focus on creating global leaders. We provide 'education of the privileged for the underprivileged.'"
    },
    {
      question: "How can I contribute to the school?",
      answer: "You can contribute through donations, volunteering, partnering with us for programs, or spreading awareness about our mission. Every contribution, big or small, makes a significant impact on the lives of these children."
    },
    {
      question: "What is the student-teacher ratio?",
      answer: "We maintain a low student-teacher ratio of 15:1 to ensure personalized attention and quality education for every student. This allows our teachers to focus on individual learning needs and development."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-content section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Please contact us and we'll get back to you.</p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;