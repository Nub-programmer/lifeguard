import React from 'react';
import { Info, Shield, Radio, Cpu } from 'lucide-react';

export const FooterDisclaimer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#080b09] border-t border-[#18221c] text-[#7a8b80] text-xs font-sans py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-2 text-[#b8ff3d] font-mono font-bold text-sm mb-2">
            <Radio className="w-4 h-4" />
            <span>LifeGuard Concept Simulation</span>
          </div>
          <p className="text-[#a0b2a6] leading-relaxed">
            Camera-free indoor sensing platform utilizing Wi-Fi signal disturbances (reflection, absorption, scattering, and multipath effect) between dual fixed nodes to estimate probable presence zones.
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 text-[#ffd54a] font-mono font-bold text-sm mb-2">
            <Shield className="w-4 h-4" />
            <span>Privacy & Ethics First</span>
          </div>
          <p className="text-[#a0b2a6] leading-relaxed">
            Operates without optical cameras, GPS, microphones, or client wearables. Preserves physical privacy while providing spatial occupancy intelligence for smart buildings and search-and-rescue assistance.
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 text-[#66ff99] font-mono font-bold text-sm mb-2">
            <Info className="w-4 h-4" />
            <span>Science Fair Prototype Disclaimer</span>
          </div>
          <p className="text-[#a0b2a6] leading-relaxed">
            LifeGuard is a simulation-based concept prototype demonstrating camera-free indoor presence estimation using Wi-Fi signal behavior. Actual localization accuracy depends on calibration, hardware placement, room geometry, interference, and signal processing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#141c17] mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5c6e62]">
        <p>© 2026 LifeGuard Research Project • School Science Exhibition Demonstration</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <Cpu className="w-3 h-3 text-[#b8ff3d]" />
          <span>Simulated Node Engine • ESP32 Wireless Concept</span>
        </p>
      </div>
    </footer>
  );
};
