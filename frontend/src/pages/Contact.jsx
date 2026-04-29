import { Award, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-stone-50 px-4 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-2 font-bold uppercase tracking-[0.2em] text-[#315c35]">Talk to us</p>
          <h1 className="text-4xl font-black text-[#3b2a1f]">Contact AMUCHI ORGANIC</h1>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-5">
            {[
              { icon: Phone, title: 'Phone', text: '9655493675 / 9047484721', hint: 'Available 9am - 8pm' },
              { icon: Award, title: 'FSSAI No.', text: '22425296000143', hint: 'Food safety registration' },
              { icon: MapPin, title: 'Location', text: 'Tamil Nadu, India', hint: 'Local and online orders' }
            ].map(({ icon: Icon, title, text, hint }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-lg bg-[#f6edda] p-3 text-[#315c35]"><Icon className="h-6 w-6" /></span>
                  <div>
                    <h3 className="font-black text-[#3b2a1f]">{title}</h3>
                    <p className="text-sm text-stone-500">{hint}</p>
                  </div>
                </div>
                <p className="font-bold text-[#315c35]">{text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-lg border border-stone-200 bg-white p-6 shadow-lg lg:col-span-2">
            <h2 className="mb-6 text-2xl font-black text-[#3b2a1f]">Send a message</h2>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
              <input required placeholder="Name" className="rounded-lg border border-stone-200 p-4 outline-none focus:border-[#315c35]" />
              <input required placeholder="Phone" className="rounded-lg border border-stone-200 p-4 outline-none focus:border-[#315c35]" />
              <textarea required placeholder="Message" className="h-36 rounded-lg border border-stone-200 p-4 outline-none focus:border-[#315c35] md:col-span-2" />
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#315c35] py-4 font-black text-white md:col-span-2">
                <Send className="h-5 w-5" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
