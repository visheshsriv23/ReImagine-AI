import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar"; // Adjust path if your Navbar sits in /components/ui/
import gsap from "gsap";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"all" | "trending" | "showcase">("all");
  
  // State to manage live interactions for likes and clicked statuses
  const [renders, setRenders] = useState([
    {
      id: 1,
      title: "Scandinavian Japandi Living Room",
      author: "Elena_Design",
      likes: 342,
      hasLiked: false,
      tag: "trending",
      imagePlaceholder: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Industrial Loft Workspace Conversion",
      author: "MarcusArch",
      likes: 198,
      hasLiked: false,
      tag: "showcase",
      imagePlaceholder: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Biophilic Minimalist Bedroom",
      author: "EcoSpaces",
      likes: 512,
      hasLiked: false,
      tag: "trending",
      imagePlaceholder: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Mid-Century Modern Dining Studio",
      author: "RetroFit_AI",
      likes: 277,
      hasLiked: false,
      tag: "showcase",
      imagePlaceholder: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  // DOM references for GSAP target animations
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Trigger GSAP Entry Stagger Animations on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-in up for the main hero heading elements
      gsap.from(".animate-hero", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Stagger entrance for the connection resource tiles
      gsap.from(".animate-hub-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        delay: 0.3,
      });
    }, headerRef);

    return () => ctx.revert(); // Garbage cleanup on component unmount
  }, []);

  // Functional Toggle to handle incremental Heart Logic + Micro Interaction
  const handleLikeToggle = (id: number) => {
    setRenders((prevRenders) =>
      prevRenders.map((item) => {
        if (item.id === id) {
          const updatedHasLiked = !item.hasLiked;
          const updatedLikes = updatedHasLiked ? item.likes + 1 : item.likes - 1;

          // Micro-animation trigger when liking an item
          if (updatedHasLiked) {
            gsap.to(`#heart-icon-${id}`, {
              scale: 1.4,
              duration: 0.15,
              yoyo: true,
              repeat: 1,
              ease: "power2.out",
            });
          }

          return { ...item, likes: updatedLikes, hasLiked: updatedHasLiked };
        }
        return item;
      })
    );
  };

  const filteredRenders = renders.filter(
    (item) => activeTab === "all" || item.tag === activeTab
  );

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1" ref={headerRef}>
        {/* ================= HERO BLOCK ================= */}
        <section className="bg-gray-50 border-b border-gray-100 py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="animate-hero text-xs font-semibold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full inline-block">
              Global Sandbox
            </span>
            <h1 className="animate-hero text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-5">
              Where prompt engine design meets space creation
            </h1>
            <p className="animate-hero text-gray-500 mt-4 text-lg leading-relaxed">
              Step into an open ecosystem of architects, spatial planners, and creative developers building the next wave of hyper-visualized floor structures.
            </p>
          </div>
        </section>

        {/* ================= SOCIAL CONNECTIONS MATRIX ================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* GitHub Portal Container */}
            <div className="animate-hub-card border border-gray-100 bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-5 bg-gray-900 text-white">
                  ⚙️
                </div>
                <h3 className="text-xl font-bold text-gray-900">GitHub Repository</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Explore our open core. Contribute custom preset architectures or file spatial layout adjustments straight into the codebase.
                </p>
              </div>
              <a 
                href="https://github.com/visheshsriv23" 
                target="_blank" 
                rel="noreferrer" 
                className="mt-6 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors inline-flex items-center gap-1"
              >
                Explore GitHub Org <span>→</span>
              </a>
            </div>

            {/* LinkedIn Core Container */}
            <div className="animate-hub-card border border-gray-100 bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-5 bg-blue-50 text-blue-600">
                  💼
                </div>
                <h3 className="text-xl font-bold text-gray-900">LinkedIn Connect</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Follow structural logs, product engineering updates, and join conversations about scaling spatial automation with global leads.
                </p>
              </div>
              <a 
                href="https://www.linkedin.com/in/vishesh-srivastava-29572233a/" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors inline-flex items-center gap-1"
              >
                Connect on LinkedIn <span>→</span>
              </a>
            </div>

            {/* Discord Community Server Tile */}
            <div className="animate-hub-card border border-gray-100 bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-5 bg-indigo-50 text-indigo-600">
                  💬
                </div>
                <h3 className="text-xl font-bold text-gray-900">Discord Chatroom</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Join 12,000+ spatial artists swapping parameters, debugging environmental variables, and streaming design workflows.
                </p>
              </div>
              <a 
                href="https://discord.com/users/visheshsrivastava1123_37019" 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors inline-flex items-center gap-1"
              >
                Launch Discord Server <span>→</span>
              </a>
            </div>

          </div>
        </section>

        {/* ================= DYNAMIC VISUAL LOG GENERATION PACK ================= */}
        <section className="py-16 bg-gray-50/50 border-t border-gray-100 px-6 w-full" ref={cardsContainerRef}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Public Generation Log</h2>
                <p className="text-sm text-gray-500 mt-1">Explore and remix recent renders shared openly by the space collective.</p>
              </div>

              {/* Filtering mechanism selectors */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-xl self-start sm:self-auto">
                {(["all", "trending", "showcase"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeTab === tab ? "bg-gray-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRenders.map((render) => (
                <div
                  key={render.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:translate-y-[-2px] transition-all group"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img
                      src={render.imagePlaceholder}
                      alt={render.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-800 capitalize shadow-xs">
                      {render.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{render.title}</h4>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>by @{render.author}</span>
                      
                      {/* FIXED INTERACTIVE LIKE TOGGLE BUTTON */}
                      <button
                        onClick={() => handleLikeToggle(render.id)}
                        className={`flex items-center gap-1 font-semibold transition-colors focus:outline-none ${
                          render.hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <span id={`heart-icon-${render.id}`} className="inline-block transform origin-center text-sm">
                          {render.hasLiked ? "❤️" : "🤍"}
                        </span>
                        <span>{render.likes}</span>
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}