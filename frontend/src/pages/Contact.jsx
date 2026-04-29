import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Award, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amuchi-darkbrown mb-4">Contact Us</h1>
          <p className="text-gray-500">We'd love to hear from you. Reach out for bulk orders or questions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amuchi-beige p-3 rounded-2xl">
                  <Phone className="h-6 w-6 text-amuchi-green" />
                </div>
                <div>
                  <h3 className="font-bold text-amuchi-darkbrown">Phone</h3>
                  <p className="text-sm text-gray-500">Available 9am - 8pm</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-amuchi-darkgreen">9655493675</p>
              <p className="text-lg font-semibold text-amuchi-darkgreen">9047484721</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amuchi-beige p-3 rounded-2xl">
                  <Award className="h-6 w-6 text-amuchi-green" />
                </div>
                <div>
                  <h3 className="font-bold text-amuchi-darkbrown">FSSAI No.</h3>
                  <p className="text-sm text-gray-500">Food Safety Certified</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-amuchi-darkgreen">22425296000143</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amuchi-beige p-3 rounded-2xl">
                  <MapPin className="h-6 w-6 text-amuchi-green" />
                </div>
                <div>
                  <h3 className="font-bold text-amuchi-darkbrown">Location</h3>
                  <p className="text-sm text-gray-500">Based in Tamil Nadu</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Traditional Kitchen, <br />
                Village Inspired Organic Hub, <br />
                Tamil Nadu, India.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl border border-gray-50"
          >
            <h2 className="text-2xl font-bold text-amuchi-darkbrown mb-8">Send us a Message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-2">Name</label>
                <input type="text" className="bg-gray-50 p-4 rounded-xl border border-transparent focus:bg-white focus:border-amuchi-green outline-none transition-all" placeholder="Enter your name" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-2">Phone</label>
                <input type="tel" className="bg-gray-50 p-4 rounded-xl border border-transparent focus:bg-white focus:border-amuchi-green outline-none transition-all" placeholder="Enter phone number" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600 ml-2">Message</label>
                <textarea className="bg-gray-50 p-4 rounded-xl border border-transparent focus:bg-white focus:border-amuchi-green outline-none transition-all h-40" placeholder="How can we help you?"></textarea>
              </div>
              <button 
                type="button"
                className="md:col-span-2 bg-amuchi-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-amuchi-darkgreen transition-all"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
