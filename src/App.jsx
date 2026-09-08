import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PasswordGate from './components/PasswordGate';
import { AUTH_STORAGE_KEY, verifyStoredHash } from './config/auth';
import Home from './pages/Home';
import FireCalculator from './pages/FireCalculator';
import OpportunityCost from './pages/OpportunityCost';
import EtfList from './pages/EtfList';
import EtfDetail from './pages/EtfDetail';
import EtfCompare from './pages/EtfCompare';
import PortfolioLab from './pages/PortfolioLab';
import MacroComparison from './pages/MacroComparison';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';

export default function App() {
  const getInitialPath = () => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [comparedList, setComparedList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return Boolean(stored && verifyStoredHash(stored));
    } catch (_) {
      return false;
    }
  });

  const handleLock = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (_) {}
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setCurrentPath(hash || '/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const toggleCompare = (etf) => {
    setComparedList((prev) => {
      if (prev.some((c) => c.id === etf.id)) {
        return prev.filter((c) => c.id !== etf.id);
      }
      if (prev.length >= 3) {
        alert('비교함에는 최대 3개까지 담을 수 있습니다.');
        return prev;
      }
      return [...prev, etf];
    });
  };

  const clearCompare = () => setComparedList([]);

  // If not authenticated, display password gate screen
  if (!isAuthenticated) {
    return <PasswordGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  // Route matching
  const renderPage = () => {
    const cleanPath = currentPath.split('?')[0];

    if (cleanPath === '/' || cleanPath === '') {
      return (
        <Home
          navigate={navigate}
          onToggleCompare={toggleCompare}
          comparedList={comparedList}
        />
      );
    }
    if (cleanPath === '/fire-calculator') {
      return <FireCalculator navigate={navigate} />;
    }
    if (cleanPath === '/opportunity-cost') {
      return <OpportunityCost navigate={navigate} />;
    }
    if (cleanPath === '/etf') {
      return (
        <EtfList
          navigate={navigate}
          onToggleCompare={toggleCompare}
          comparedList={comparedList}
          onClearCompare={clearCompare}
        />
      );
    }
    if (cleanPath.startsWith('/etf/')) {
      const ticker = cleanPath.replace('/etf/', '');
      return <EtfDetail ticker={ticker} navigate={navigate} />;
    }
    if (cleanPath === '/compare') {
      return <EtfCompare navigate={navigate} />;
    }
    if (cleanPath === '/portfolio') {
      return <PortfolioLab navigate={navigate} />;
    }
    if (cleanPath === '/macro-comparison') {
      return <MacroComparison navigate={navigate} />;
    }
    if (cleanPath === '/insights') {
      return <Insights navigate={navigate} />;
    }
    if (cleanPath.startsWith('/insights/')) {
      const slug = cleanPath.replace('/insights/', '');
      return <InsightDetail slug={slug} navigate={navigate} />;
    }

    // Default fallback to Home
    return (
      <Home
        navigate={navigate}
        onToggleCompare={toggleCompare}
        comparedList={comparedList}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <Navbar currentPath={currentPath} navigate={navigate} onLock={handleLock} />
      <main className="flex-1 flex flex-col">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
