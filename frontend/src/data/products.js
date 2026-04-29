export const categories = ['All', 'Health Mixes', 'Millets', 'Traditional Rice', 'Pulses'];

export const ingredients20 = [
  'Karuppu Ulundhu',
  'Mappillai Samba',
  'Karuppu Kavuni',
  'Barley',
  'Seeraga Samba',
  'Kambu',
  'Thinai',
  'Samai',
  'Varagu',
  'Kuthiraivali',
  'Ragi',
  'Green Gram',
  'Roasted Gram',
  'Red Rice',
  'Samba Wheat',
  'Corn',
  'Sago',
  'Cardamom',
  'Dry Ginger',
  'Palm Sugar'
];

export const sampleProducts = [
  {
    _id: 'karuppu-ulundhu-health-mix',
    name: 'Karuppu Ulundhu Health Mix',
    tamilName: 'கருப்பு உளுந்து கஞ்சி மிக்ஸ்',
    price: 250,
    weight: '500g',
    category: 'Health Mixes',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1604908812866-d975b93d7709?auto=format&fit=crop&w=900&q=80'
    ],
    description:
      'A traditional alternative to commercial health drinks, made with sprouted grains, pulses, traditional rice varieties, and warming spices.',
    tamilDescription:
      'மாப்பிள்ளை சம்பா, கருப்பு கவுனி, பார்லி, சீரக சம்பா போன்ற 20 வகையான தானியங்களால் பாரம்பரிய முறையில் தயாரிக்கப்பட்ட ஆரோக்கிய கஞ்சி மிக்ஸ்.',
    ingredients: ingredients20,
    benefits: [
      'அதிக சுவை',
      'அதிக சத்து',
      'சுலபமான செய்முறை',
      'பக்க விளைவுகள் இல்லாது',
      'குழந்தை முதல் பெரியவர் வரை பயன்படும்'
    ],
    featured: true,
    inStock: true
  },
  {
    _id: 'mappillai-samba-rice',
    name: 'Mappillai Samba Rice',
    tamilName: 'மாப்பிள்ளை சம்பா அரிசி',
    price: 180,
    weight: '1kg',
    category: 'Traditional Rice',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80'],
    description: 'A heritage rice variety known for strength, slow energy, and rustic flavour.',
    tamilDescription: 'உடல் வலிமைக்காக பாரம்பரியமாக பயன்படுத்தப்படும் சத்தான அரிசி வகை.',
    ingredients: ['Mappillai Samba Rice'],
    benefits: ['Slow energy release', 'Naturally filling', 'Traditional Tamil rice'],
    inStock: true
  },
  {
    _id: 'kambu-pearl-millet',
    name: 'Pearl Millet',
    tamilName: 'கம்பு',
    price: 90,
    weight: '500g',
    category: 'Millets',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=80'],
    description: 'Mineral-rich millet for porridge, dosa batter, and everyday traditional cooking.',
    tamilDescription: 'கஞ்சி, தோசை, கூழ் போன்ற உணவுகளுக்கு ஏற்ற ஊட்டச்சத்து மிக்க கம்பு.',
    ingredients: ['Pearl Millet'],
    benefits: ['High fibre', 'Good for summer foods', 'Village-style staple'],
    inStock: true
  },
  {
    _id: 'native-pulses-combo',
    name: 'Native Pulses Combo',
    tamilName: 'நாட்டு பருப்பு தொகுப்பு',
    price: 320,
    weight: '1kg',
    category: 'Pulses',
    stock: 22,
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=900&q=80',
    images: ['https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=900&q=80'],
    description: 'Cleaned native pulses for everyday protein-rich meals.',
    tamilDescription: 'தினசரி சமையலுக்கு ஏற்ற சுத்தமான நாட்டு பருப்பு வகைகள்.',
    ingredients: ['Black Gram', 'Green Gram', 'Bengal Gram', 'Toor Dal'],
    benefits: ['Protein rich', 'No polish', 'Everyday cooking'],
    inStock: true
  }
];

export const getProductImage = (product) => product?.image || product?.images?.[0] || sampleProducts[0].image;
