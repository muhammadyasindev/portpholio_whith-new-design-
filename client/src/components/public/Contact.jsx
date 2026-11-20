import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, ArrowUpRight, CheckCircle2, Phone, X } from 'lucide-react';
import { submitContactMessage } from '../../api';
import { useToast } from '../ui/Toast';

const Contact = ({ profile, settings }) => {
  const toast = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: 'Full Stack Web Development',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in your name, email, and message.');
      return;
    }

    try {
      setLoading(true);
      const res = await submitContactMessage(formData);
      if (res.data.success) {
        toast.success('Your inquiry has been received! I will reply shortly.');
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          service: 'Full Stack Web Development',
          message: ''
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-white select-none border-t border-stone-200/80">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-medium text-black shadow-xs mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{profile?.availabilityStatus || 'Available for New Project'}</span>
        </motion.div>

        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-[1.05] uppercase font-sans mb-6"
        >
          HAVE A PROJECT <br className="hidden sm:inline" />
          IN MIND?
        </motion.h2>

        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-stone-500 font-normal leading-relaxed max-w-xl mx-auto mb-10"
        >
          Together, we can create something clear and impactful. Let's collaborate to bring our ideas to life in a way that resonates with everyone.
        </motion.p>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFormOpen(!formOpen)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-all shadow-md group cursor-pointer"
          >
            <span>{formOpen ? 'Close Inquiry Form' : 'Contact Me'}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>

          {profile?.whatsapp && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-black text-xs font-semibold shadow-xs transition-all"
            >
              <span>WhatsApp Direct</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          )}
        </motion.div>

        
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl text-left bg-stone-50 p-8 sm:p-10 rounded-[32px] border border-stone-200 shadow-xl overflow-hidden mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-black tracking-tight">Direct Message Dispatch</h3>
                  <p className="text-xs text-stone-500">Stored directly in database & notifies immediately.</p>
                </div>
                <button
                  onClick={() => setFormOpen(false)}
                  className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold text-black">Thank You!</h4>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Your message has been safely received. I will review your requirements and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-semibold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                      Project Domain / Service
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/20 font-medium"
                    >
                      <option value="Full Stack Web Development">Full Stack Web Development</option>
                      <option value="Mobile App Development (React Native)">Mobile App Development (React Native)</option>
                      <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                      <option value="Backend Architecture & API Systems">Backend Architecture & API Systems</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-stone-600 font-semibold mb-1">
                      Project Details / Brief *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Share a brief overview of your timeline, scope, and technical vision..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/20 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:bg-stone-800 text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting Inbound...' : 'Send Message Now'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-mono pt-8 border-t border-stone-100 w-full">
          <span className="flex items-center gap-1.5 text-stone-600">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            {profile?.location || 'Balochistan, Pakistan'}
          </span>
          <span>·</span>
          <a
            href={`mailto:${profile?.email || 'contact@yasinportfolio.dev'}`}
            className="hover:text-black transition-colors"
          >
            {profile?.email || 'contact@yasinportfolio.dev'}
          </a>
          <span>·</span>
          <span>Response time: &lt; 24h</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;
