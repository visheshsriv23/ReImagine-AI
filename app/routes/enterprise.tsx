import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar"; // Adjust path if your Navbar sits in /components/ui/
import gsap from "gsap";

export default function EnterprisePage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pull the Formspree URL from your .env.local file
  const formActionUrl = import.meta.env.VITE_FORMSPREE_ENTERPRISE_URL;

  // Trigger GSAP entrance animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide up headings
      gsap.from(".animate-ent-hero", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Staggered list items
      gsap.from(".animate-ent-list", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden text-gray-900" ref={sectionRef}>
      {/* Keeps your navbar locked safely at the top */}
      <Navbar />

      <main className="flex-1 pb-24">
        {/* ================= HERO HEADER ================= */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-20 px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="animate-ent-hero text-xs font-semibold tracking-widest text-orange-400 uppercase bg-white/10 px-3 py-1 rounded-full inline-block">
              Enterprise Hub
            </span>
            <h1 className="animate-ent-hero text-4xl md:text-5xl font-bold tracking-tight mt-4">
              Lead Routing Environment
            </h1>
            <p className="animate-ent-hero text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
              Submit your studio parameters to send a clean markdown data card directly into our administrative notification channel.
            </p>
          </div>
        </section>

        {/* ================= INTERACTIVE EMAIL FORM ================= */}
        <section className="py-12 px-6 max-w-4xl mx-auto w-full">
          <div className="bg-gray-50 border border-gray-200/60 p-8 md:p-10 rounded-3xl shadow-xs">
            
            {/* The HTML form points straight to your .env.local endpoint variable */}
            <form action={formActionUrl} method="POST" className="space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors" 
                    placeholder="Vishesh Srivastava"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Work Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors" 
                    placeholder="vishesh@firm.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Company / Firm Name</label>
                <input 
                  type="text" 
                  name="company" 
                  required 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors" 
                  placeholder="Srivastava Architectural Group"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Expected Workspace Seats</label>
                <select 
                  name="teamSize"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 cursor-pointer"
                >
                  <option value="10-50">10 - 50 seats</option>
                  <option value="50-200">50 - 200 seats</option>
                  <option value="200+">200+ Enterprise seats</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Custom Integration Requirements</label>
                <textarea 
                  rows={4} 
                  name="message"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 resize-none transition-colors" 
                  placeholder="Type out any additional integration notes you want sent to your email inbox..."
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-gray-900 hover:bg-black text-white text-sm font-semibold py-4 rounded-xl transition-colors shadow-xs"
              >
                Submit Enterprise Request →
              </button>
            </form>
          </div>
        </section>

        {/* ================= PROJECTS CAPABILITY AUDIT (NON-FICTIONAL) ================= */}
        <section className="mt-12 px-6 max-w-3xl mx-auto w-full">
          <div className="border border-gray-200 rounded-2xl bg-white p-6 md:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Project Execution Manifest</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              An explicit inventory of the live engineering functions this architecture stack executes on your local machine.
            </p>

            <ul className="space-y-4 text-sm text-gray-600">
              <li className="animate-ent-list flex gap-3 items-start">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900 block">Single-Page State Compiling</strong>
                  <span>Maintains live UI filtering updates, tab toggle switches, and numerical interactive operations (like matching unique heart likes) in browser memory.</span>
                </div>
              </li>
              <li className="animate-ent-list flex gap-3 items-start">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900 block">Client-Side Routing Sub-systems</strong>
                  <span>Links and mounts multi-page structural directory paths (`/pricing`, `/community`, `/enterprise`) via React Router 7 layouts without flashing hard-refresh white screens.</span>
                </div>
              </li>
              <li className="animate-ent-list flex gap-3 items-start">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900 block">Hardware-Accelerated UI Motion</strong>
                  <span>Interfaces with the GSAP engine library core to stagger element nodes on mount hooks and execute spring physics transformation matrix scales.</span>
                </div>
              </li>
              <li className="animate-ent-list flex gap-3 items-start">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <strong className="text-gray-900 block">External API Pipeline Routing</strong>
                  <span>Pulls system-level path keys from `.env.local` to safely forward user payloads outward into a verified automated inbox forwarding engine.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}