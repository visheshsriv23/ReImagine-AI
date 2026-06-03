import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import {useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import { createProject, getProjects, deleteProject } from "../../lib/puter.action";
import gsap from "gsap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New ReImagine AI App" },
    { name: "description", content: "Welcome to ReImagine AI!" },
  ];
}

export default function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]); // Preserved design item array tracking layer
    const isCreatingProjectRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null); // GSAP scope initialization targeting

    const handleUploadComplete = async (base64Image: string) => {
        try {

            if(isCreatingProjectRef.current) return false;
            isCreatingProjectRef.current = true;
            const newId = Date.now().toString();
            const name = `Residence ${newId}`;

            const newItem = {
                id: newId, name, sourceImage: base64Image,
                renderedImage: undefined,
                timestamp: Date.now()
            }

            const saved = await createProject({ item: newItem, visibility: 'private' });

            if(!saved) {
                console.error("Failed to create project");
                return false;
            }

            setProjects((prev) => [saved, ...prev]);

            navigate(`/visualizer/${newId}`, {
                state: {
                    initialImage: saved.sourceImage,
                    initialRendered: saved.renderedImage || null,
                    name
                }
            });

            return true;
        } finally {
            isCreatingProjectRef.current = false;
        }
    }

    // 1. Updated deletion handler that tags the ID in localStorage
    const handleCardDelete = (id: string | number, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents page redirect navigation triggers

        // Run the visual fade/scale out animation instantly
        gsap.to(`#project-card-${id}`, {
            scale: 0.92,
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: async () => {
                // Remove from current UI state array view layer
                setProjects((prev) => prev.filter((proj) => proj.id !== id));
                
                // Save this ID to browser local storage so it stays hidden on reload
                const hiddenRaw = localStorage.getItem("reimagine_deleted_projects");
                const hiddenIds = hiddenRaw ? JSON.parse(hiddenRaw) : [];
                if (!hiddenIds.includes(id.toString())) {
                    hiddenIds.push(id.toString());
                    localStorage.setItem("reimagine_deleted_projects", JSON.stringify(hiddenIds));
                }

                // Fire the backend worker cleanup in the background (silent fallback)
                try {
                    await deleteProject(id);
                } catch(e) {
                    console.log("Background cloud sync skipped");
                }
            }
        });
    };

    // 2. Updated useEffect that filters out deleted items right when they load
    useEffect(() => {
        const fetchProjects = async () => {
            const items = await getProjects();
            const safeItems = items || [];

            // Retrieve our local storage list of deleted item keys
            const hiddenRaw = localStorage.getItem("reimagine_deleted_projects");
            const hiddenIds: string[] = hiddenRaw ? JSON.parse(hiddenRaw) : [];

            // Filter out any items that the backend mistakenly returned
            const filteredItems = safeItems.filter(
                (proj: any) => !hiddenIds.includes(proj.id?.toString())
            );

            setProjects(filteredItems);
        };

        fetchProjects();

        const ctx = gsap.context(() => {
            gsap.from(".hero h1, .hero .subtitle, .hero .actions", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            gsap.from(".project-card", {
                scale: 0.96,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                delay: 0.3,
                ease: "power2.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

  return (
      <div className="home" ref={containerRef}>
          <Navbar />

          <section className="hero">
              <div className="announce">
                  <div className="dot">
                      <div className="pulse"></div>
                  </div>

                  <p>Introducing ReImagine AI </p>
              </div>

              <h1>Build beautiful spaces at the speed of thought with ReImagine AI</h1>

              <p className="subtitle">
                  ReImagine AI is an AI-first design environment that helps you visualize, render, and ship architectural projects faster than ever.
              </p>

              <div className="actions">
                  <a href="#upload" className="cta">
                      Start Building <ArrowRight className="icon" />
                  </a>

                  <Button variant="outline" size="lg" className="demo">
                      Watch Demo
                  </Button>
              </div>

              <div id="upload" className="upload-shell">
                <div className="grid-overlay" />

                  <div className="upload-card">
                      <div className="upload-head">
                          <div className="upload-icon">
                              <Layers className="icon" />
                          </div>

                          <h3>Upload your floor plan</h3>
                          <p>Supports JPG, PNG, formats up to 10MB</p>
                      </div>

                      <Upload onComplete={handleUploadComplete} />
                  </div>
              </div>
          </section>

          <section className="projects">
              <div className="section-inner">
                  <div className="section-head">
                      <div className="copy">
                          <h2>Projects</h2>
                          <p>Your latest work and shared community projects, all in one place.</p>
                      </div>
                  </div>

                  <div className="projects-grid">
                      {projects.map(({id, name, renderedImage, sourceImage, timestamp}) => (
                          <div key={id} id={`project-card-${id}`} className="project-card group relative" onClick={() => navigate(`/visualizer/${id}`)}>
                              
                              {/* ================= INJECTED FUNCTIONAL DELETE ACTION BUTTON ================= */}
                              <button
                                  onClick={(e) => handleCardDelete(id, e)}
                                  className="absolute top-3 right-3 z-30 bg-white/90 hover:bg-red-500 hover:text-white text-gray-500 p-2 rounded-xl border border-gray-200/60 transition-all opacity-0 group-hover:opacity-100 shadow-xs focus:outline-none"
                                  title="Delete Project"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  </svg>
                              </button>

                              <div className="preview">
                                  <img  src={renderedImage || sourceImage} alt="Project" />

                                  <div className="badge">
                                      <span>Community</span>
                                  </div>
                              </div>

                              <div className="card-body">
                                  <div>
                                      <h3>{name}</h3>

                                      <div className="meta">
                                          <Clock size={12} />
                                          <span>{new Date(timestamp).toLocaleDateString()}</span>
                                          <span>By Vishesh Srivastava</span>
                                      </div>
                                  </div>
                                  <div className="arrow">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      </div>
  )
}