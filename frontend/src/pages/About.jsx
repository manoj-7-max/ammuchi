import { Heart, Leaf, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#f6edda] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-4xl font-black text-[#3b2a1f] md:text-5xl">
            Reviving traditional Tamil nutrition
          </motion.h1>
          <p className="font-tamil text-xl leading-relaxed text-[#765239]">
            பாட்டி காலத்து சத்து உணவுகளை, இன்றைய குடும்பங்களுக்கு சுத்தமாகவும் சுலபமாகவும் கொண்டு வருகிறோம்.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-2 font-bold uppercase tracking-[0.2em] text-[#315c35]">Our story</p>
            <h2 className="mb-6 text-3xl font-black text-[#3b2a1f]">No chemicals. Homemade quality. Real ingredients.</h2>
            <p className="mb-5 leading-relaxed text-stone-600">
              AMUCHI ORGANIC was created to bring back the healthy mixes that Tamil homes once trusted every day. Instead of artificial health drinks, we focus on grains, millets, pulses, and traditional rice varieties that families recognize.
            </p>
            <p className="leading-relaxed text-stone-600">
              Every mix is designed around clean preparation, natural taste, and practical daily use for children, adults, and elders.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#fffaf0] p-5 text-center"><span className="block text-3xl font-black text-[#315c35]">100%</span><span className="text-sm font-bold text-stone-500">Natural focus</span></div>
              <div className="rounded-lg bg-[#fffaf0] p-5 text-center"><span className="block text-3xl font-black text-[#315c35]">0%</span><span className="text-sm font-bold text-stone-500">Chemical additives</span></div>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80" alt="Traditional spices and grains" className="aspect-[4/3] rounded-[2rem] object-cover shadow-xl" />
        </div>
      </section>

      <section className="bg-stone-50 px-4 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Heart, title: 'Made for families', text: 'Recipes chosen for daily, comfortable home use.' },
            { icon: Shield, title: 'Quality first', text: 'Clean grains, careful roasting, and transparent ingredients.' },
            { icon: Leaf, title: 'Traditional foods', text: 'Millets, pulses, and rice varieties from Tamil food culture.' },
            { icon: Users, title: 'Local customers', text: 'Serving Tamil Nadu homes while supporting online orders.' }
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
              <Icon className="mb-4 h-8 w-8 text-[#315c35]" />
              <h3 className="mb-2 text-xl font-black text-[#3b2a1f]">{title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
