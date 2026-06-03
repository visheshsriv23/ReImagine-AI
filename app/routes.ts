import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // This handles http://localhost:5173/
  index("routes/home.tsx"),
  
  // By adding the id parameter, we resolve the "duplicate route id" crash!
  route("product", "routes/home.tsx", { id: "product-page" }),
  
  // Your other clean subpages
  route("visualizer/:id", "routes/visualizer.$id.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("community", "routes/community.tsx"),
  route("enterprise", "routes/enterprise.tsx")
] satisfies RouteConfig;