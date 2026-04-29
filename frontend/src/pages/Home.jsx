import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-amuchi-beige overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amuchi-darkbrown font-tamil leading-tight mb-4">
              அமுச்சி கருப்பு உளுந்து கஞ்சி மிக்ஸ்
            </h1>
            <p className="text-xl md:text-2xl text-amuchi-brown font-tamil mb-8">
              20 வகையான தானியங்கள் | பாரம்பரிய அரிசிகள்
            </p>
            <div className="flex space-x-4">
              <Link to="/products" className="bg-amuchi-green hover:bg-amuchi-darkgreen text-white px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-lg">
                Buy Now
              </Link>
              <Link to="/products" className="bg-white hover:bg-gray-50 text-amuchi-darkgreen border border-amuchi-green px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-md">
                View Products
              </Link>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mt-12 md:mt-0"
          >
            <img 
              src="https://images.unsplash.com/photo-1627914371987-a2f00a5a6b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Healthy Grains" 
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-amuchi-darkbrown mb-12">Why Choose Amuchi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "அதிக சுவை", desc: "Traditional taste that brings back memories." },
              { title: "அதிக சத்து", desc: "Packed with natural nutrients and minerals." },
              { title: "சுலபமான செய்முறை", desc: "Easy to prepare in minutes." },
              { title: "பக்க விளைவுகள் இல்லாது", desc: "No chemicals, zero side effects." },
              { title: "குழந்தை முதல் பெரியவர் வரை", desc: "Suitable for all age groups." }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-amuchi-beige p-8 rounded-2xl shadow-md border border-amber-100"
              >
                <div className="text-amuchi-green mb-4 flex justify-center">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-bold font-tamil mb-2 text-amuchi-darkbrown">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
