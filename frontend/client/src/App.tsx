import React from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";

import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Layout } from "@/components/Layout";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

/* Pages */
import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";
import CityService from "@/pages/CityService";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Contact from "@/pages/Contact";
import ThankYou from "@/pages/ThankYou";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

/* ---------------- ROUTER ---------------- */
function Router() {
  return (
    <Layout>
      <Switch>
        {/* Core */}
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductList} />
        <Route path="/products/:slug" component={ProductDetail} />

        {/* City SEO routes */}
        <Route path="/service/:city" component={CityService} />

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />

        {/* Marketing pages */}
        <Route path="/jar-water-vs-ro" component={Home} />
        <Route path="/ro-on-rent" component={Home} />
        <Route path="/free-water-test" component={Home} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Contact */}
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

/* ---------------- APP ROOT ---------------- */
export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Router />
            <WhatsAppFloat />
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
