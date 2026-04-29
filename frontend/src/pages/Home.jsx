import { CheckCircle2, Leaf, ShieldCheck, Sparkles, Wheat } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sampleProducts } from '../data/products';

const Home = () => {
  const heroProduct = sampleProducts[0];
  const benefits = ['அதிக சுவை', 'அதிக சத்து', 'சுலபமான செய்முறை', 'பக்க விளைவுகள் இல்லாது', 'குழந்தை முதல் பெரியவர் வரை பயன்படும்'];

  return (
    <div className="bg-stone-50">
      <section className="relative overflow-hidden bg-[#f6edda]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(49,92,53,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(151,91,45,0.12),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#315c35] shadow-sm">
              <Leaf className="h-4 w-4" /> Traditional healthy mix for Tamil homes
            </span>
            <h1 className="mb-4 font-tamil text-4xl font-black leading-tight text-[#3b2a1f] md:text-6xl">
              அமுச்சி கருப்பு உளுந்து கஞ்சி மிக்ஸ்
            </h1>
            <p className="mb-8 font-tamil text-xl text-[#765239] md:text-2xl">
              20 வகையான தானியங்கள் | பாரம்பரிய அரிசிகள்
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="rounded-full bg-[#315c35] px-8 py-3 text-center font-bold text-white shadow-lg transition hover:bg-[#254729]">
                Buy Now
              </Link>
              <Link to="/products" className="rounded-full border border-[#315c35] bg-white px-8 py-3 text-center font-bold text-[#315c35] shadow-sm transition hover:bg-[#fffaf0]">
                View Products
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              {['No chemicals', 'Homemade quality', 'Tamil Nadu delivery'].map((item) => (
                <div key={item} className="rounded-lg bg-white/70 p-3 font-semibold text-[#3b2a1f] shadow-sm">{item}</div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -left-4 top-8 z-10 rounded-lg bg-white p-4 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Health Mix</p>
              <p className="font-tamil text-lg font-black text-[#315c35]">அதிக சத்து</p>
            </div>
            <img src={heroProduct.image} alt="Karuppu Ulundhu Health Mix ingredients" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-bold uppercase tracking-[0.2em] text-[#315c35]">Product highlights</p>
              <h2 className="text-3xl font-black text-[#3b2a1f]">Harlicks, Boost alternatives from traditional grains</h2>
            </div>
            <Link to="/product/karuppu-ulundhu-health-mix" className="font-bold text-[#315c35] underline-offset-4 hover:underline">View details</Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Wheat, title: '20 grains blend', text: 'Traditional rice, millets, pulses, barley, dry ginger, and cardamom.' },
              { icon: ShieldCheck, title: 'No chemicals', text: 'Made with a homemade quality promise and no artificial preservatives.' },
              { icon: Sparkles, title: 'Easy preparation', text: 'Mix, cook, sweeten if needed, and serve as a warm daily health drink.' }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-stone-200 bg-[#fffaf0] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Icon className="mb-4 h-8 w-8 text-[#315c35]" />
                <h3 className="mb-2 text-xl font-black text-[#3b2a1f]">{title}</h3>
                <p className="text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#315c35] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-tamil text-3xl font-black">ஏன் AMUCHI ORGANIC?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit) => (
              <motion.div key={benefit} whileHover={{ y: -6 }} className="rounded-lg bg-white/10 p-5 backdrop-blur">
                <CheckCircle2 className="mb-4 h-7 w-7 text-[#f4dfad]" />
                <h3 className="font-tamil text-lg font-bold">{benefit}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
