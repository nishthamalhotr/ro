import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { ServiceForm } from "@/components/ServiceForm";
import { MapPin, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_CONFIG } from "@/lib/contact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";

const locationData: Record<string, {
  name: string;
  description: string;
  waterIssues: string;
  faqs: { q: string; a: string }[];
}> = {
  "saket": {
    name: "Saket",
    description: "Looking for reliable RO repair in Saket? AquaShield provides professional water purifier services in the heart of South Delhi. Our technicians are specialized in handling high TDS issues common in Saket residential complexes like Saket Court and nearby blocks.",
    waterIssues: "Saket often faces fluctuations in water TDS levels due to mixing of municipal and groundwater. This can lead to frequent filter choking and scaling in your RO system.",
    faqs: [
      { q: "Do you provide RO repair in Saket today?", a: "Yes, we offer same-day RO repair services in Saket if booked before 2 PM." },
      { q: "What is the visit charge for Saket?", a: "Our standard technician visit charge in Saket is only ₹299." },
      { q: "Can I get an RO on rent in Saket?", a: "Yes, we provide RO on rent starting from ₹599 per month in Saket." },
      { q: "Do you service all brands like Kent and Aquaguard?", a: "We service all major brands including Kent, Aquaguard, Pureit, and Livpure." },
      { q: "Is there a warranty on RO parts?", a: "We provide up to 12 months warranty on genuine spare parts replaced by us." }
    ]
  },
  "malviya-nagar": {
    name: "Malviya Nagar",
    description: "Malviya Nagar residents trust AquaShield for prompt RO service. Whether it's a minor leak or a major pump failure, our doorstep repair service ensures your family has access to pure water without delay.",
    waterIssues: "The water supply in Malviya Nagar often contains high sediments, making pre-filter replacements critical every 3-4 months to protect your RO membrane.",
    faqs: [
      { q: "How soon can a technician visit Malviya Nagar?", a: "Our technicians are stationed locally and can usually reach Malviya Nagar within 2-4 hours." },
      { q: "Do you provide AMC plans for Malviya Nagar?", a: "Yes, we have comprehensive AMC plans starting from ₹2550 per year." },
      { q: "Is water testing free in Malviya Nagar?", a: "Yes, we provide a free TDS water test with every service visit." },
      { q: "Which RO is best for Malviya Nagar?", a: "Based on local water quality, we recommend an RO+UV+Alkaline system." },
      { q: "Do you repair commercial RO in Malviya Nagar?", a: "Yes, we handle commercial RO plants for offices and shops in Malviya Nagar." }
    ]
  },
  "hauz-khas": {
    name: "Hauz Khas",
    description: "Premium RO service for the premium neighborhood of Hauz Khas. We specialize in built-in RO repairs and high-end water purification systems for villas and apartments.",
    waterIssues: "Hauz Khas residents often experience hard water issues which lead to scale buildup in the RO booster pump and membrane.",
    faqs: [
      { q: "Are you available in Hauz Khas Enclave?", a: "Yes, we provide door-to-door RO services across Hauz Khas Enclave and Village areas." },
      { q: "What are the RO repair charges in Hauz Khas?", a: "The visit fee is ₹299, and repair costs depend on the parts required." },
      { q: "Can I get a service on Sunday in Hauz Khas?", a: "Yes, we provide emergency RO services on Sundays in Hauz Khas." },
      { q: "Do you provide genuine Aquaguard parts?", a: "Yes, we only use 100% genuine and certified spare parts." },
      { q: "Is RO installation free?", a: "Installation is free with the purchase of a new AquaShield RO system." }
    ]
  },
  "green-park": {
    name: "Green Park",
    description: "Fast and professional RO installation and repair in Green Park. AquaShield is your local partner for ensuring safe drinking water 24/7.",
    waterIssues: "Water in Green Park can have varying levels of chlorine and dissolved solids depending on the supply source.",
    faqs: [
      { q: "How do I book RO service in Green Park?", a: "You can book via our website or call us directly at our South Delhi helpline." },
      { q: "Do you offer AMC for Green Park households?", a: "Yes, we offer multiple AMC plans covering all filters and electrical parts." },
      { q: "Can you fix a leaking RO in Green Park?", a: "Yes, our technicians specialize in fixing all types of leaks and pressure issues." },
      { q: "Do you provide RO on rent in Green Park?", a: "Yes, RO rental services are available for both homes and offices." },
      { q: "What brands do you service?", a: "We service Kent, Aquaguard, Livpure, BlueStar, and more." }
    ]
  },
  "greater-kailash": {
    name: "Greater Kailash",
    description: "Providing world-class RO repair and AMC services in Greater Kailash (GK 1 & GK 2). Our technicians are trained for high-end multi-stage purifiers.",
    waterIssues: "Water quality in GK can be inconsistent; periodic TDS monitoring is essential to maintain the effectiveness of your purifier.",
    faqs: [
      { q: "Do you cover both GK 1 and GK 2?", a: "Yes, we provide full coverage for RO repair in GK 1, GK 2, and nearby colonies." },
      { q: "What is the cost of RO AMC in GK?", a: "Our GK special AMC plans start from ₹2550 per year including all filters." },
      { q: "Do you provide same-day installation?", a: "Yes, we can install your new RO on the same day of purchase in GK." },
      { q: "Is the RO technician verified?", a: "All our technicians in GK are background-checked and certified." },
      { q: "Do you provide Jar water comparison?", a: "Yes, we can show you why RO is 70% cheaper than buying jars." }
    ]
  },
  "lajpat-nagar": {
    name: "Lajpat Nagar",
    description: "Reliable RO service in the bustling neighborhood of Lajpat Nagar. We provide quick solutions for residential and commercial water purifiers.",
    waterIssues: "Lajpat Nagar often faces issues with suspended particles in the water, requiring high-quality pre-sediment filters.",
    faqs: [
      { q: "Are you available near Lajpat Nagar Central Market?", a: "Yes, we cover all blocks of Lajpat Nagar 1, 2, 3, and 4." },
      { q: "What are the RO service charges?", a: "Service charges start at ₹299 plus any parts replaced." },
      { q: "Do you repair RO pumps?", a: "Yes, we repair and replace RO booster pumps with 1-year warranty." },
      { q: "Can I get an RO on rent for my shop?", a: "Yes, we have commercial RO rental plans for Lajpat Nagar businesses." },
      { q: "Do you provide water testing?", a: "Yes, free water TDS testing is included with every visit." }
    ]
  },
  "kalkaji": {
    name: "Kalkaji",
    description: "Expert RO repair and maintenance in Kalkaji. AquaShield ensures your water purifier works at peak efficiency to keep your family safe.",
    waterIssues: "High groundwater usage in some parts of Kalkaji results in very high TDS levels, demanding frequent membrane cleaning.",
    faqs: [
      { q: "Do you provide RO service in Kalkaji Extension?", a: "Yes, we provide full service coverage for Kalkaji and Kalkaji Extension." },
      { q: "How much does a membrane replacement cost?", a: "RO membrane replacement in Kalkaji starts from ₹1250." },
      { q: "Are technicians available today?", a: "Yes, we have a dedicated team for the Kalkaji area for same-day visits." },
      { q: "Do you offer AMC for old ROs?", a: "Yes, we provide AMC for all RO brands regardless of their age." },
      { q: "Is RO water better than jar water?", a: "Yes, RO is safer and more economical than local jar water." }
    ]
  },
  "nehru-place": {
    name: "Nehru Place",
    description: "Professional RO services for Asia's largest IT hub. We specialize in commercial RO plants and office water purifier maintenance in Nehru Place.",
    waterIssues: "Commercial buildings in Nehru Place often have large storage tanks that can lead to bacterial growth if UV filters are not maintained.",
    faqs: [
      { q: "Do you service office RO plants in Nehru Place?", a: "Yes, we specialize in 25 LPH and 50 LPH commercial RO systems." },
      { q: "What is your response time for Nehru Place?", a: "Being a business hub, we prioritize Nehru Place with a 2-hour response time." },
      { q: "Do you provide AMC for corporate offices?", a: "Yes, we have customized corporate AMC plans for Nehru Place." },
      { q: "Can I rent an RO for my office?", a: "Yes, RO on rent is a popular choice for startups in Nehru Place." },
      { q: "Are genuine spare parts used?", a: "We only use original spare parts with company warranty." }
    ]
  },
  "chhatarpur": {
    name: "Chhatarpur",
    description: "Quick RO repair and installation in Chhatarpur and surrounding farmhouses. AquaShield provides heavy-duty RO solutions for high TDS areas.",
    waterIssues: "Chhatarpur is known for extremely high TDS groundwater (often >2000 ppm), which requires specialized high-TDS RO membranes.",
    faqs: [
      { q: "Can your RO handle 3000 TDS in Chhatarpur?", a: "Yes, we install specialized membranes designed for very high TDS levels." },
      { q: "How much is the service charge in Chhatarpur?", a: "The visit and service charge is ₹299." },
      { q: "Do you provide RO on rent in Chhatarpur?", a: "Yes, we have rental plans starting at ₹599/month." },
      { q: "Do you cover Chhatarpur Enclave?", a: "Yes, we cover Chhatarpur Enclave, Phase 1, and Phase 2." },
      { q: "Is installation free?", a: "Installation is free on purchase of our high-TDS RO systems." }
    ]
  },
  "mehrauli": {
    name: "Mehrauli",
    description: "Reliable and affordable RO service in Mehrauli. We bring professional water purifier repair to your doorstep in one of Delhi's oldest areas.",
    waterIssues: "Water supply in Mehrauli can be inconsistent, leading to air-locks and pump issues in domestic RO systems.",
    faqs: [
      { q: "Do you provide RO repair in Mehrauli?", a: "Yes, we have a local team providing doorstep service in Mehrauli." },
      { q: "What are the common RO problems in Mehrauli?", a: "Filter clogging and solenoid valve failures are common due to supply variations." },
      { q: "Can I get a discount on AMC?", a: "We offer seasonal discounts on multi-year AMC plans in Mehrauli." },
      { q: "Do you repair all brands?", a: "Yes, we repair Kent, Aquaguard, Pureit, and local brands too." },
      { q: "Is the water test free?", a: "Yes, we provide a free TDS test to check your water purity." }
    ]
  },
  "vasant-kunj": {
    name: "Vasant Kunj",
    description: "Premium RO repair and maintenance services for Vasant Kunj residents. Trusted by thousands of households in various sectors of Vasant Kunj.",
    waterIssues: "Vasant Kunj often receives a mix of DJB and borewell water, requiring an RO system with an auto-TDS controller.",
    faqs: [
      { q: "Do you cover all sectors of Vasant Kunj?", a: "Yes, we cover Sector A, B, C, D and all pockets of Vasant Kunj." },
      { q: "What is the cost of RO service in Vasant Kunj?", a: "Our professional service visit is priced at ₹299." },
      { q: "Do you provide genuine filters?", a: "Yes, we use only certified high-quality filters for all replacements." },
      { q: "Can I book a technician for evening?", a: "Yes, we offer flexible time slots for working professionals in Vasant Kunj." },
      { q: "Is RO better than Jar water?", a: "RO water is significantly safer and more convenient than daily jar deliveries." }
    ]
  },
  "vasant-vihar": {
    name: "Vasant Vihar",
    description: "Expert water purifier service for the elite neighborhood of Vasant Vihar. We provide high-quality RO repair and AMC with a focus on excellence.",
    waterIssues: "Scaling and mineral buildup are common in Vasant Vihar due to the hardness of the local water supply.",
    faqs: [
      { q: "Do you provide emergency RO repair in Vasant Vihar?", a: "Yes, we offer priority service for Vasant Vihar residents." },
      { q: "What are the AMC charges for premium ROs?", a: "Comprehensive AMC starts from ₹3660, covering everything including the membrane." },
      { q: "Do you service imported water purifiers?", a: "We service most major domestic and international RO brands." },
      { q: "Are your technicians background verified?", a: "Yes, all our staff undergoes strict verification for your safety." },
      { q: "Do you offer free water testing?", a: "Yes, we provide digital TDS testing free of cost with every visit." }
    ]
  },
  "sarojini-nagar": {
    name: "Sarojini Nagar",
    description: "Fast RO service in Sarojini Nagar for government quarters and local residents. AquaShield ensures you never run out of pure drinking water.",
    waterIssues: "Older pipelines in Sarojini Nagar can sometimes introduce rust and particles into the water, making pre-filters essential.",
    faqs: [
      { q: "Do you provide service in Sarojini Nagar today?", a: "Yes, same-day service is available for Sarojini Nagar bookings." },
      { q: "What is the visit charge?", a: "The technician visit charge is ₹299." },
      { q: "Do you repair Kent RO in Sarojini Nagar?", a: "Yes, we are experts in Kent RO repair and service." },
      { q: "Is AMC available for government employees?", a: "Yes, we have special affordable AMC plans for all residents." },
      { q: "Do you provide RO on rent?", a: "Yes, RO rental is available starting from ₹599 per month." }
    ]
  },
  "defence-colony": {
    name: "Defence Colony",
    description: "High-quality RO repair and maintenance in Defence Colony. We provide prompt and professional water purifier solutions for discerning residents.",
    waterIssues: "Defence Colony water can have high TDS during summer months, requiring a well-maintained RO system.",
    faqs: [
      { q: "Do you offer doorstep service in Def Col?", a: "Yes, we provide prompt doorstep RO repair in Defence Colony." },
      { q: "What are the charges for RO AMC?", a: "Comprehensive AMC plans for Defence Colony start at ₹2550." },
      { q: "Do you provide genuine spare parts?", a: "Yes, all our parts are 100% genuine with warranty." },
      { q: "Is Sunday service available?", a: "Yes, we provide weekend services for your convenience." },
      { q: "Can you fix low water flow?", a: "Yes, we can fix flow issues by servicing filters or the booster pump." }
    ]
  },
  "south-extension": {
    name: "South Extension",
    description: "AquaShield is the leading RO service provider in South Extension Part 1 and 2. We offer expert repair, installation, and AMC services.",
    waterIssues: "South Ex residents often face issues with water taste and odor, which can be fixed with high-quality carbon filters.",
    faqs: [
      { q: "Do you cover both South Ex 1 and 2?", a: "Yes, we provide full coverage for both parts of South Extension." },
      { q: "What is the RO repair cost?", a: "Technician visit is ₹299; total cost depends on the repair needed." },
      { q: "Do you provide RO on rent in South Ex?", a: "Yes, we have several RO rental options for homes and shops." },
      { q: "How quickly can you install a new RO?", a: "We can complete installation within 4-6 hours of your request." },
      { q: "Is your work guaranteed?", a: "Yes, we provide a 30-day service guarantee on all our work." }
    ]
  },
  "govindpuri": {
    name: "Govindpuri",
    description: "Affordable and reliable RO repair service in Govindpuri. We provide quick fixes for all water purifier brands at your doorstep.",
    waterIssues: "Govindpuri often experiences high levels of impurities in the water supply, making regular filter changes vital.",
    faqs: [
      { q: "Do you provide RO service in Govindpuri?", a: "Yes, we have a strong presence in Govindpuri for quick service." },
      { q: "What is the cost of a pre-filter?", a: "Pre-filter (Spun) replacement starts at just ₹150." },
      { q: "Are technicians available on short notice?", a: "Yes, we usually have a technician nearby in the Govindpuri area." },
      { q: "Do you offer AMC plans?", a: "Yes, our AMC plans are very affordable for Govindpuri residents." },
      { q: "Is RO water better than local jars?", a: "RO water is much more hygienic and saves you money in the long run." }
    ]
  },
  "cr-park": {
    name: "CR Park",
    description: "Professional RO service in Chittaranjan Park (CR Park). We understand the needs of CR Park households and provide trusted water purifier repairs.",
    waterIssues: "Water in CR Park can have high iron content in some blocks, requiring specialized pre-treatment filters.",
    faqs: [
      { q: "Do you cover all blocks of CR Park?", a: "Yes, we provide RO service across all blocks of CR Park." },
      { q: "How much does RO AMC cost in CR Park?", a: "Our comprehensive AMC starts at ₹2550 per year." },
      { q: "Do you repair Aquaguard in CR Park?", a: "Yes, we specialize in Aquaguard, Kent, and all major brands." },
      { q: "Is a technician available today?", a: "Yes, we offer same-day service for bookings made early in the day." },
      { q: "Do you provide free water testing?", a: "Yes, we check your water TDS for free during the visit." }
    ]
  },
  "okhla": {
    name: "Okhla",
    description: "Expert RO repair and commercial RO plant maintenance in Okhla. We serve both residential areas and the Okhla Industrial Estate.",
    waterIssues: "Industrial areas in Okhla often have complex water quality issues including chemical contaminants that need multi-stage purification.",
    faqs: [
      { q: "Do you service Okhla Phase 1, 2, and 3?", a: "Yes, we cover all industrial and residential phases of Okhla." },
      { q: "Do you repair commercial RO plants?", a: "Yes, we are experts in industrial and commercial RO maintenance." },
      { q: "What is the response time for Okhla?", a: "We strive for a 2-4 hour response time in the Okhla area." },
      { q: "Can I get an RO on rent for my factory?", a: "Yes, we have high-capacity RO rental plans for workplaces." },
      { q: "Are your technicians trained?", a: "Yes, our Okhla team is specifically trained for commercial systems." }
    ]
  },
  "jamia-nagar": {
    name: "Jamia Nagar",
    description: "Reliable and budget-friendly RO service in Jamia Nagar. We provide doorstep repair and installation for all types of water purifiers.",
    waterIssues: "Jamia Nagar residents often face high TDS levels from borewell water, requiring robust RO membranes.",
    faqs: [
      { q: "Do you provide RO repair in Jamia Nagar?", a: "Yes, we offer quick doorstep repair services in Jamia Nagar." },
      { q: "What are the RO service charges?", a: "Our basic service and visit charge is only ₹299." },
      { q: "Do you offer AMC for home ROs?", a: "Yes, we have affordable AMC plans starting from ₹1750." },
      { q: "Is RO better than jar water?", a: "Yes, RO is safer, more reliable, and cheaper than 20L jars." },
      { q: "Do you fix RO leaks?", a: "Yes, we fix all types of leakage and noise issues in RO systems." }
    ]
  },
  "safdarjung-enclave": {
    name: "Safdarjung Enclave",
    description: "Premium water purifier service in Safdarjung Enclave. AquaShield provides professional RO repair and AMC services for healthy living.",
    waterIssues: "Water hardness in Safdarjung Enclave can lead to frequent clogging of the RO membrane if not serviced regularly.",
    faqs: [
      { q: "Do you cover all of Safdarjung Enclave?", a: "Yes, we provide full coverage for Safdarjung Enclave and nearby areas." },
      { q: "What is the cost of a new RO membrane?", a: "RO membrane replacement starts from ₹1250 with warranty." },
      { q: "Do you provide same-day RO service?", a: "Yes, same-day doorstep service is our specialty." },
      { q: "Are genuine parts used?", a: "We use only 100% genuine and high-quality spare parts." },
      { q: "Do you offer free water testing?", a: "Yes, we check your water TDS for free during every service visit." }
    ]
  }
};

export default function CityService() {
  const [locationPath] = useLocation();
  const [, params] = useRoute("/service/:city");
  
  let slug = params?.city || "delhi";
  
  // Handle direct RO repair routes
  if (locationPath.startsWith("/ro-repair-")) {
    slug = locationPath.replace("/ro-repair-", "");
  }

  const data = locationData[slug];
  
  if (!data) {
    const cityDisplay = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">RO Service in {cityDisplay}</h1>
        <p className="text-xl text-slate-600 mb-8">Expert water purifier repair and installation in {cityDisplay}.</p>
        <div className="max-w-md mx-auto">
          <ServiceForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>RO Repair in {data.name} | Same Day RO Service | ₹299 Visit</title>
        <meta name="description" content={`Expert RO water purifier repair and installation service in ${data.name}. ${data.description.substring(0, 120)}...`} />
      </Helmet>

      {/* City Hero */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wider text-sm font-medium">Serving {data.name} & South Delhi</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
            RO Water Purifier Repair Service in {data.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
            {data.description} Get genuine parts, certified technicians, and a 30-day service warranty.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"><CheckCircle className="w-4 h-4 text-green-400" /> ₹299 Visit Fee</div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"><CheckCircle className="w-4 h-4 text-green-400" /> Same Day Repair</div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"><CheckCircle className="w-4 h-4 text-green-400" /> Free Water Test</div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-10">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white flex gap-2" asChild>
              <a href={`https://wa.me/${CONTACT_CONFIG.phone.raw}?text=Hi, I need RO service in ${data.name}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> WhatsApp Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary border-white hover:bg-slate-100 flex gap-2" asChild>
              <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
                <Phone className="w-5 h-5" /> Call {CONTACT_CONFIG.phone.display}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="prose prose-lg max-w-none text-slate-700 mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Expert RO Repair in {data.name}</h2>
              <p>
                Is your water purifier making noise, leaking, or providing bad-tasting water? Don't compromise on your health. 
                AquaShield provides the most reliable <strong>RO service in {data.name}</strong> with a focus on quality and customer satisfaction. 
                Our team of certified technicians is experienced in handling all major RO brands including Kent, Aquaguard (Eureka Forbes), 
                Livpure, Pureit, BlueStar, and more.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Local Water Issues in {data.name}</h3>
              <p>
                {data.waterIssues} In {data.name}, the Total Dissolved Solids (TDS) levels can fluctuate significantly. 
                Our technicians provide a <strong>free water testing offer</strong> with every visit to ensure your RO system is 
                calibrated correctly for the specific water profile of your home.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Services in {data.name}</h3>
              <ul>
                <li><strong>RO Repair in {data.name}:</strong> Fixing pumps, SMPS, sensors, and leakages.</li>
                <li><strong>RO Service in {data.name}:</strong> Complete deep cleaning and filter replacement.</li>
                <li><strong>RO Installation in {data.name}:</strong> Professional mounting and setup for new units.</li>
                <li><strong>RO AMC in {data.name}:</strong> Yearly maintenance contracts for complete peace of mind.</li>
              </ul>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">RO on Rent in {data.name}</h3>
              <p>
                Moving to {data.name} for a short stay? Why buy when you can rent? We offer high-quality 
                <Link href="/ro-on-rent" className="text-primary hover:underline ml-1">RO on rent</Link> starting from just ₹599 per month. 
                Zero maintenance cost and free relocation included!
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Jar Water vs RO Purifier</h3>
              <p>
                Many households in {data.name} still rely on 20-liter jars. However, did you know that 
                <Link href="/jar-water-vs-ro" className="text-primary hover:underline mx-1">RO water is safer and 70% cheaper</Link> 
                than jar water? RO provides on-demand purity without the hassle of heavy jars or uncertain water sources.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Book Your Free Water Test</h3>
              <p>
                Not sure if your purifier is working correctly? Book a 
                <Link href="/free-water-test" className="text-primary hover:underline ml-1">free water TDS test</Link> today. 
                Our technician will visit your home in {data.name} and provide a detailed purity report.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {data.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-bold mb-4">Book Service in {data.name}</h3>
                <ServiceForm />
              </div>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <h3 className="font-bold text-primary mb-2 text-lg">Quick Contact</h3>
                <p className="text-sm text-slate-600 mb-4">Get instant support for RO repair in {data.name}.</p>
                <div className="space-y-3">
                  <a href={`tel:${CONTACT_CONFIG.phone.full}`} className="flex items-center gap-3 text-slate-900 font-medium hover:text-primary transition-colors">
                    <Phone className="w-5 h-5 text-primary" /> {CONTACT_CONFIG.phone.display}
                  </a>
                  <div className="flex items-center gap-3 text-slate-900 font-medium">
                    <CheckCircle className="w-5 h-5 text-primary" /> Same Day Response
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
