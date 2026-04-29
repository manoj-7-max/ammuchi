import { motion } from 'framer-motion';
import { Heart, Shield, Leaf, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-amuchi-beige py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-amuchi-darkbrown mb-6"
          >
            The Story of <span className="text-amuchi-green font-tamil">அமுச்சி</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-amuchi-brown leading-relaxed"
          >
            Reviving the lost traditions of healthy Tamil food culture, one home at a time.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-amuchi-darkbrown mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              In a world dominated by instant noodles and chemical-laden health drinks, "AMUCHI ORGANIC" was born from a simple desire: to bring back the nutritious, homemade mixes our grandmothers (Amuchi) used to make.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We specialize in traditional healthy mixes, millets, and forgotten rice varieties that are naturally rich in essential nutrients. Every product is prepared with care, ensuring that no chemicals or preservatives touch the food your family eats.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-amuchi-beige p-4 rounded-2xl border border-amber-100 text-center">
                <span className="text-3xl font-bold text-amuchi-darkgreen block">100%</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Natural</span>
              </div>
              <div className="bg-amuchi-beige p-4 rounded-2xl border border-amber-100 text-center">
                <span className="text-3xl font-bold text-amuchi-darkgreen block">0%</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Chemicals</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl rotate-3"
          >
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Traditional Preparation" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-amuchi-darkbrown mb-4">Our Core Values</h2>
          <div className="w-20 h-1 bg-amuchi-green mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Heart className="h-8 w-8 text-red-500" />, title: "Made with Love", desc: "Crafted like we're making it for our own children." },
            { icon: <Shield className="h-8 w-8 text-blue-500" />, title: "Uncompromising Quality", desc: "Only the best grains and pulses make the cut." },
            { icon: <Leaf className="h-8 w-8 text-amuchi-green" />, title: "Eco-Friendly", desc: "Supporting local farmers and organic practices." },
            { icon: <Users className="h-8 w-8 text-amber-500" />, title: "Community Driven", desc: "Preserving traditional knowledge for the future." }
          ].map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="flex justify-center mb-4">{v.icon}</div>
              <h3 className="font-bold text-xl text-amuchi-darkbrown mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
