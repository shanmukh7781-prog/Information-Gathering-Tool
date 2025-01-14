import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { InfoCard } from './components/InfoCard';
import { useDomainLookup } from './hooks/useDomainLookup';

function App() {
  const [domain, setDomain] = useState('');
  const { info, loading, error, lookupDomain } = useDomainLookup();

  const handleSearch = () => {
    lookupDomain(domain);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Shield className="text-green-500" size={40} />
            <Terminal className="text-green-500" size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-green-500 font-mono">CyberScope</h1>
          <p className="text-gray-400">Advanced Domain Intelligence Gathering Tool</p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="space-y-8"
        >
          <SearchBar
            domain={domain}
            setDomain={setDomain}
            onSearch={handleSearch}
          />

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-green-500"
            >
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center"
            >
              {error}
            </motion.div>
          )}

          {info && <InfoCard info={info} />}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;