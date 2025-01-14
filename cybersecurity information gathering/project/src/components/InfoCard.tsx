import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Building, Clock, Shield, Server, AlertTriangle } from 'lucide-react';
import type { DomainInfo } from '../types/DomainInfo';
import { MapDisplay } from './MapDisplay';
import { GlobeView } from './GlobeView';

interface InfoCardProps {
  info: DomainInfo;
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      }
    }}
    className="flex items-start space-x-3"
  >
    <Icon className="text-green-500 mt-1" size={20} />
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-green-500 font-mono">{value}</p>
    </div>
  </motion.div>
);

export const InfoCard: React.FC<InfoCardProps> = ({ info }) => {
  const [showMap, setShowMap] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const getThreatColor = (score: number) => {
    if (score < 30) return 'text-green-500';
    if (score < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const [lat, lon] = info.loc.split(',').map(Number);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto"
    >
      {/* Left Column - Information */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900 p-6 rounded-lg border border-green-500 space-y-6"
      >
        {/* Network Information */}
        <div className="grid grid-cols-1 gap-4">
          <InfoItem icon={Globe} label="IP Address" value={info.ip} />
          <InfoItem icon={MapPin} label="Location" value={`${info.city}, ${info.region}`} />
          <InfoItem icon={Building} label="Organization" value={info.org} />
          <InfoItem icon={Clock} label="Timezone" value={info.timezone} />
        </div>

        {/* Advanced Details */}
        {info.asn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-t border-green-500/30 pt-4"
          >
            <h3 className="text-green-500 font-mono mb-3">Network Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <InfoItem icon={Server} label="ASN" value={info.asn} />
              {info.isp && <InfoItem icon={Building} label="ISP" value={info.isp} />}
            </div>
          </motion.div>
        )}

        {/* Threat Analysis */}
        {info.threatLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-green-500/30 pt-4"
          >
            <h3 className="text-green-500 font-mono mb-3">Threat Analysis</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className={getThreatColor(info.threatLevel.score)} size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Threat Score</p>
                  <p className={`font-mono ${getThreatColor(info.threatLevel.score)}`}>
                    {info.threatLevel.score}/100
                  </p>
                </div>
              </div>
              {info.threatLevel.factors.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-400 text-sm mb-2">Risk Factors:</p>
                  <ul className="space-y-1">
                    {info.threatLevel.factors.map((factor, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center space-x-2 text-yellow-500"
                      >
                        <AlertTriangle size={16} />
                        <span className="text-sm font-mono">{factor}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Open Ports */}
        {info.ports && info.ports.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="border-t border-green-500/30 pt-4"
          >
            <h3 className="text-green-500 font-mono mb-3">Open Ports</h3>
            <div className="flex flex-wrap gap-2">
              {info.ports.map((port) => (
                <motion.span
                  key={port}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, delay: 1 + port * 0.01 }}
                  className="px-2 py-1 bg-gray-800 rounded-md text-green-500 font-mono text-sm"
                >
                  {port}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Last Scan Time */}
        {info.lastScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-right text-gray-500 text-sm font-mono mt-4"
          >
            Last scanned: {info.lastScan}
          </motion.div>
        )}
      </motion.div>

      {/* Right Column - Globe/Map View */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900 rounded-lg border border-green-500 overflow-hidden h-[600px]"
      >
        <AnimatePresence mode="wait">
          {!showMap ? (
            <GlobeView
              key="globe"
              lat={lat}
              lon={lon}
              onAnimationComplete={() => setShowMap(true)}
            />
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <MapDisplay lat={lat} lon={lon} city={info.city} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};