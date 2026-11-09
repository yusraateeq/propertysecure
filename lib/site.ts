import { Building2, HardHat, Home, ShieldAlert, ShieldCheck, ShoppingBag } from 'lucide-react';

export const business = {
  name: 'Property Security Services, Inc',
  license: 'PPO Lic # 119841',
  email: 'info@PropertySecurityInc.com',
  phoneDisplay: '(844) 488-1032',
  phoneHref: 'tel:+18444881032',
  hours: 'Mon – Fri 9:00 – 16:00',
  address: '10722 White Oak Ave Ste 4, Granada Hills, CA 91344, United States',
  url: 'https://propertysecurity.org',
  videoId: 'IjoH_MDG50o',
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Areas We Serve', href: '/areas-we-serve' },
  { label: 'Employment', href: '/employment' },
  { label: 'Contact Us', href: '/contact-us' },
] as const;

export const footerNavigation = [
  ...navigation,
  { label: 'Construction Security', href: '/construction-security' },
  { label: 'Policies & Procedure', href: '/policies-procedure' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
] as const;

export const socials = [
  { label: 'Twitter', href: 'https://twitter.com/security91344', icon: 'twitter' },
  { label: 'Facebook', href: 'https://www.facebook.com/propertyguardservices', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/property-security-services-inc', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/watch?v=IjoH_MDG50o', icon: 'youtube' },
  { label: 'Yelp', href: 'https://www.yelp.com/biz/property-security-services-granada-hills-2', icon: 'yelp' },
] as const;

export const services = [
  {
    title: 'Commercial Security',
    slug: 'commercial-security',
    detailHref: '/services/commercial-security',
    icon: Building2,
    image: '/images/original-site/building-security.jpg',
    imageAlt: 'Uniformed security officer at a commercial property',
    text: 'Professional security for office buildings, hotels, warehouses, government facilities, and banks. Service details are planned around the property and its requirements.',
    features: ['Office buildings and high-rise properties', 'Hotels, warehouses, and banks', 'Government facilities'],
  },
  {
    title: 'Residential Security',
    slug: 'residential-security',
    detailHref: '/services/residential-security',
    icon: Home,
    image: '/images/original-site/b6415dc8de352e71fefb314698b7b372.jpg',
    imageAlt: 'Security officer patrolling a property corridor',
    text: 'Security support for apartment complexes and residential communities, including front-desk needs. Contact us to discuss requirements for your property.',
    features: ['Apartment complexes', 'Front-desk security', 'Residential communities'],
  },
  {
    title: 'Retail Security',
    slug: 'retail-security',
    detailHref: '/services/retail-security',
    icon: ShoppingBag,
    image: '/images/original-site/party-security-guards.jpg',
    imageAlt: 'Security officer positioned near an indoor entrance',
    text: 'A professional security presence intended to reduce theft or loss while helping maintain a comfortable shopping environment for customers.',
    features: ['Loss-prevention-focused security presence', 'Professional customer-facing service'],
  },
] as const;

export const splitServices = [
  {
    title: 'Emergency Security Solutions',
    slug: 'emergency-security',
    detailHref: '/services/emergency-security',
    icon: ShieldAlert,
    theme: 'navy',
    image: '/images/original-site/sl4-revslider.jpg',
    imageAlt: 'Security officers beside a patrol vehicle',
    text: 'For special events and other security needs, personnel may support access control, crowd and traffic management, and patrol. Assignment details are confirmed with our team.',
    features: ['Access control and crowd management', 'Traffic control and event patrol'],
  },
  {
    title: 'Construction Site Security',
    slug: 'construction-management',
    detailHref: '/construction-security',
    icon: HardHat,
    theme: 'light',
    image: '/images/original-site/ConstructionSecurity-1.jpg',
    imageAlt: 'Security officer at a construction site',
    text: 'Construction-site security can include standing guard, patrol, access control, visitor and vendor logs, daily activity reporting, and trailer guard support. Scope and schedule are discussed with each client.',
    features: ['Site-specific security planning', 'Standing guard and patrol options'],
  },
] as const;

export const whyChooseUs = [
  {
    title: 'More than 33 years in security',
    description: 'Experience serving commercial, residential, retail, and construction clients.',
    icon: ShieldCheck,
  },
  {
    title: 'Licensed private patrol operator',
    description: 'Property Security Services, Inc holds California PPO License #119841.',
    icon: ShieldCheck,
  },
  {
    title: 'Coverage throughout California',
    description: 'Security services are offered across California; assignment details are discussed directly.',
    icon: Home,
  },
  {
    title: 'Service shaped around the site',
    description: 'Security plans can be discussed around the property, requested duties, and schedule.',
    icon: Building2,
  },
  {
    title: 'Practical site coordination',
    description: 'Construction services may include access control, patrol, and daily activity reporting.',
    icon: HardHat,
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Start a conversation',
    description: 'Call or send a quote request with your property type and security needs.',
  },
  {
    number: '02',
    title: 'Discuss the requirements',
    description: 'Share the location, requested duties, schedule, and any site-specific considerations.',
  },
  {
    number: '03',
    title: 'Review a proposed plan',
    description: 'The team can discuss suitable coverage and the details of a potential assignment.',
  },
  {
    number: '04',
    title: 'Confirm next steps',
    description: 'Service scope, availability, and pricing are confirmed directly before an assignment begins.',
  },
] as const;

export const faqItems = [
  {
    question: 'What types of security services do you provide?',
    answer: 'The company lists commercial, residential, retail, emergency and event, and construction-site security. Visit the services page for details or contact the team to discuss your property.',
  },
  {
    question: 'Where does Property Security Services operate?',
    answer: 'The company describes its service coverage as throughout California and is based in Granada Hills. Contact the team to discuss a specific location.',
  },
  {
    question: 'Can I request security for a specific schedule?',
    answer: 'Schedule and staffing requirements are discussed for each assignment. Contact the team to confirm availability for your requested dates and hours.',
  },
  {
    question: 'How do I request a quote?',
    answer: 'Call (844) 488-1032 during the listed office hours or use the quote form. The form prepares an email in your own email application; it does not submit to a website server.',
  },
  {
    question: 'What should I include in a quote request?',
    answer: 'Include the property or event type, location, requested duties, schedule, and any important site details. The team can then follow up to discuss the requirements.',
  },
] as const;

export const testimonials = [
  {
    quote: 'Love this company. Hired them on my 4th construction project in Rialto. They are the absolutely best folks ever!!! Pleased with them on all our projects.',
    name: 'Joey Cohan',
    location: 'Rialto, CA',
    rating: 5,
  },
  {
    quote: 'We hired their services for construction site in Long Beach area. The guard was timely, professional and courteous. And, the appearance of a security guard gave the guests a very professional appearance. We had a parking incident that could have escalated, but was resolved because the guard was present and intervened. Thank you for your wonderful services.',
    name: 'George Lopez',
    location: 'Los Angeles, CA',
    rating: 4.5,
  },
  {
    quote: 'Property Security Services, Inc is equipped with professionals who know what they’re doing. I enjoyed having them around and they were able to keep me and my family safe in a time when robberies and social vices were a very present concert. Their services are pleasant and efficient to do business with. I will surely call them again.',
    name: 'Shaun L',
    location: 'San Diego, CA',
    rating: 4,
  },
] as const;
