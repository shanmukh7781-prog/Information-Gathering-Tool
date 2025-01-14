import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import { motion } from 'framer-motion';

interface GlobeViewProps {
  lat: number;
  lon: number;
  onAnimationComplete: () => void;
}

export const GlobeView: React.FC<GlobeViewProps> = ({ lat, lon, onAnimationComplete }) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globe = useRef<any>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Initialize globe
    globe.current = Globe()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .width(globeEl.current.clientWidth)
      .height(globeEl.current.clientHeight);

    // Add point of interest
    globe.current.pointsData([{
      lat,
      lng: lon,
      size: 0.5,
      color: '#50C878'
    }]);

    // Initial position
    globe.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

    // Start animation sequence
    setTimeout(() => {
      globe.current.pointOfView({
        lat: lat,
        lng: lon,
        altitude: 2.5
      }, 2000);
      
      setTimeout(() => {
        globe.current.pointOfView({
          lat: lat,
          lng: lon,
          altitude: 0.9
        }, 1000);
        
        setTimeout(onAnimationComplete, 1000);
      }, 2000);
    }, 1000);

    // Auto-rotate
    globe.current.controls().autoRotate = true;
    globe.current.controls().autoRotateSpeed = 0.5;

    // Cleanup
    return () => {
      if (globe.current) {
        globe.current.controls().dispose();
        globe.current = null;
      }
    };
  }, [lat, lon, onAnimationComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full"
      ref={globeEl}
    />
  );
};