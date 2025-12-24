// lib/site.ts

export const BRAND = {
  primary: "#1868A0", // from logo
  navy: "#082840",
} as const;

export const SITE = {
  name: "ESEC Dental Clinics",
  tagline: "Gentle, modern dental care in Ortigas & Makati.",
  phoneDisplay: "0917 546 9657",
  phoneTel: "tel:+639175469657",
  email: "esecdentalclinicsph@gmail.com",

  // Main branch (for quick display in some sections)
  addressLine1: "Unit 1105, Medical Plaza Ortigas Condominium",
  addressLine2: "San Miguel Avenue, San Antonio, Pasig, Philippines",

  // Locations (Option B: multi-branch)
  locations: [
    {
      key: "ortigas",
      label: "Ortigas",
      addressLine1: "Unit 1105, Medical Plaza Ortigas Condominium",
      addressLine2: "San Miguel Avenue, San Antonio, Pasig, Philippines",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27954.39245413851!2d121.0211689743164!3d14.580482000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c814e2c00001%3A0x76ad03c0fda96b4a!2sESEC%20Dental%20Clinics%20-%20Ortigas!5e1!3m2!1sen!2sph!4v1766574804613!5m2!1sen!2sph",
    },
    {
      key: "makati",
      label: "Makati",
      addressLine1: "ESEC Dental Clinics - Makati City",
      addressLine2: "Makati, Philippines",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27956.849939316908!2d120.97575277431636!3d14.561105399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90b709ae4d7%3A0x9fdd886197dd880e!2sESEC%20Dental%20Clinics%20-%20Makati%20City!5e1!3m2!1sen!2sph!4v1766574750367!5m2!1sen!2sph",
    },
  ] as const,

  hours: [
    { label: "Mon–Sat", value: "By appointment" },
    { label: "Sunday", value: "Closed" },
  ],

  social: {
    facebook: "https://facebook.com/",
  },
} as const;

export const SERVICES: Array<{ title: string; description: string }> = [
  {
    title: "Consultation & Dental Check-up",
    description: "A thorough exam and clear treatment guidance.",
  },
  {
    title: "Oral Prophylaxis (Cleaning)",
    description: "Gentle cleaning to maintain healthy gums and teeth.",
  },
  {
    title: "Tooth Filling",
    description: "Natural-looking restoration for cavities and minor damage.",
  },
  {
    title: "Tooth Extraction",
    description: "Careful removal with clear aftercare instructions.",
  },
  {
    title: "Root Canal Treatment",
    description: "Pain relief and tooth-saving treatment when needed.",
  },
  {
    title: "Crowns / Bridges / Dentures",
    description: "Restore function and confidence with proper fit.",
  },
  {
    title: "Braces / Orthodontics",
    description: "Bite correction and smile alignment with a plan.",
  },
  {
    title: "Teeth Whitening",
    description: "Safer, professionally guided whitening options.",
  },
];
