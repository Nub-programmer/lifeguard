import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { WaveformDataPoint, ZoneId } from '../types';
import { ZONE_LIST } from '../lib/zoneMath';

interface SignalChartProps {
  waveformHistory: WaveformDataPoint[];
  probabilities: Record<ZoneId, number>;
  likelyZone: ZoneId | 'NONE';
  type?: 'waveform' | 'probability' | 'confidence';
}

export const SignalChart: React.FC<SignalChartProps> = ({
  waveformHistory,
  probabilities,
  likelyZone,
  type = 'waveform'
}) => {
  if (type === 'waveform') {
    return (
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={waveformHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRssi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b8ff3d" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#b8ff3d" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorDelta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6464" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff6464" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2820" />
            <XAxis dataKey="time" stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} />
            <YAxis stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} domain={[-100, -60]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#101612',
                borderColor: '#2d3d31',
                borderRadius: '8px',
                color: '#f2f5ef',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
            />
            <Area
              type="monotone"
              dataKey="rxRssi"
              name="RX RSSI (dBm)"
              stroke="#b8ff3d"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRssi)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === 'probability') {
    const probData = ZONE_LIST.map(z => ({
      zone: z.id,
      name: z.name,
      prob: probabilities[z.id] || 0
    }));

    return (
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={probData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2820" />
            <XAxis dataKey="zone" stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} />
            <YAxis stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#101612',
                borderColor: '#2d3d31',
                borderRadius: '8px',
                color: '#f2f5ef',
                fontSize: '12px',
                fontFamily: 'monospace'
              }}
              formatter={(val: number) => [`${val.toFixed(1)}%`, 'Probability']}
            />
            <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
              {probData.map((entry) => (
                <Cell
                  key={entry.zone}
                  fill={entry.zone === likelyZone ? '#b8ff3d' : entry.prob > 20 ? '#66ff99' : '#2b3b30'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Confidence Timeline
  return (
    <div className="w-full h-[220px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={waveformHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorConf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#66ff99" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#66ff99" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1c2820" />
          <XAxis dataKey="time" stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} />
          <YAxis stroke="#526659" tick={{ fontSize: 10, fill: '#8a9d90' }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#101612',
              borderColor: '#2d3d31',
              borderRadius: '8px',
              color: '#f2f5ef',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}
          />
          <Area
            type="monotone"
            dataKey="confidence"
            name="Confidence %"
            stroke="#66ff99"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorConf)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
