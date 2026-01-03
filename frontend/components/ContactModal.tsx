'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '@/lib/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Name is required');
      return false;
    }
    if (!formData.phone) {
      setError('Phone is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitInquiry({
        email: formData.email,
        message: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const modalVariants = {
    closed: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12"
          >
            <div className="bg-black w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8L24 24M8 24L24 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="relative">
                {!isSuccess ? (
                  <>
                    {/* Header */}
                    <div className="mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2">
                        Let's talk
                      </h2>
                      <p className="text-gray-400 text-lg">
                        We'd love to hear from you
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name *"
                          required
                          className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email (optional)"
                          className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                      </div>

                      {/* Phone Field */}
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone *"
                          required
                          className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                      </div>

                      {/* Message Field */}
                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message (optional)"
                          rows={6}
                          className="w-full bg-white text-black px-6 py-4 rounded-2xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
                        />
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-lg"
                        >
                          {error}
                        </motion.p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send message'
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* Success Message */
                  <motion.div
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-12"
                  >
                    <div className="mb-6">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto"
                      >
                        <circle cx="40" cy="40" r="40" fill="white" />
                        <path
                          d="M25 40L35 50L55 30"
                          stroke="black"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                      Thank you!
                    </h3>
                    <p className="text-gray-400 text-xl">
                      We'll get back to you soon
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
