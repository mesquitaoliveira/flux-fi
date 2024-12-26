import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Dashboard from "@/pages/dashboard";
import Buy from "@/pages/buy";
import Loan from "@/pages/loan";
import { Account } from "@/pages/account";
import Pools from "@/pages/pools";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="h-screen flex">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/swap" element={<Buy />} />
              <Route path="/loan" element={<Loan />} />
              <Route path="/pools" element={<Pools />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
