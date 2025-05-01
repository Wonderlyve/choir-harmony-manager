
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ChoirMembers from "./pages/ChoirMembers";
import ParishMembers from "./pages/ParishMembers";
import AllMembers from "./pages/AllMembers";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* Move TooltipProvider inside BrowserRouter, after React has fully initialized */}
      <Routes>
        <Route path="/" element={
          <TooltipProvider>
            <Layout />
          </TooltipProvider>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chorale/:gender" element={<ChoirMembers />} />
          <Route path="paroisse/:parish" element={<ParishMembers />} />
          <Route path="membres" element={<AllMembers />} />
          <Route path="add" element={<AddMember />} />
          <Route path="edit/:id" element={<EditMember />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
