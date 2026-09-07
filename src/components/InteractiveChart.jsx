import React, { useState } from 'react';

export default function InteractiveChart({
  series = [], // [{ name: 'S&P500', color: '#0f766e', points: [{ date: '2020-01-01', value: 100 }] }]
  height = 320,
  yUnit = '',
  normalized = false
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!series || series.length === 0 || !series[0].points || series[0].points.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-sm text-[var(--muted-foreground)]">
        표시할 시계열 데이터가 없습니다.
      </div>
    );
  }

  // Use primary series as base length
  const primaryPoints = series[0].points;
  const n = primaryPoints.length;

  // Compute min/max values
  let allVals = [];
  series.forEach(s => {
    s.points.forEach(p => {
      if (p.value !== null && !isNaN(p.value)) allVals.push(p.value);
    });
  });

  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals);
  const range = maxVal - minVal || 1;

  // SVG dimensions
  const width = 800;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const getX = (idx) => padLeft + (idx / (n - 1 || 1)) * chartW;
  const getY = (val) => padTop + chartH - ((val - minVal) / range) * chartH;

  // Generate SVG path for a line
  const makePath = (points) => {
    return points
      .map((p, i) => {
        const x = getX(i);
        const y = getY(p.value);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const relX = (xPos / rect.width) * width;
    const idx = Math.round(((relX - padLeft) / chartW) * (n - 1));
    if (idx >= 0 && idx < n) {
      setHoverIndex(idx);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Y-axis ticks
  const yTicks = [minVal, minVal + range * 0.25, minVal + range * 0.5, minVal + range * 0.75, maxVal];

  // X-axis ticks: pick 5 roughly evenly spaced dates
  const xIndices = [0, Math.floor(n * 0.25), Math.floor(n * 0.5), Math.floor(n * 0.75), n - 1];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-3 text-xs">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color || '#0f766e' }} />
            <span className="font-semibold text-[var(--foreground)]">{s.name}</span>
            {hoverIndex !== null && s.points[hoverIndex] && (
              <span className="font-mono text-slate-500">
                : {s.points[hoverIndex].value.toLocaleString()} {yUnit}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="w-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto cursor-crosshair"
          style={{ maxHeight: height }}
        >
          {/* Background Grid Lines */}
          {yTicks.map((val, i) => {
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#e2e8e6"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  className="font-mono"
                >
                  {val >= 1000 ? Math.round(val).toLocaleString() : val.toFixed(1)}
                  {yUnit}
                </text>
              </g>
            );
          })}

          {/* Lines */}
          {series.map((s, idx) => (
            <path
              key={idx}
              d={makePath(s.points)}
              fill="none"
              stroke={s.color || '#0f766e'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Hover scrubber vertical line and dots */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padTop}
                x2={getX(hoverIndex)}
                y2={padTop + chartH}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {series.map((s, i) => {
                const pt = s.points[hoverIndex];
                if (!pt) return null;
                return (
                  <circle
                    key={i}
                    cx={getX(hoverIndex)}
                    cy={getY(pt.value)}
                    r="5"
                    fill={s.color || '#0f766e'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          )}

          {/* X Axis Labels */}
          {xIndices.map((idx, i) => {
            const pt = primaryPoints[idx];
            if (!pt) return null;
            return (
              <text
                key={i}
                x={getX(idx)}
                y={padTop + chartH + 22}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
                className="font-mono"
              >
                {pt.label || pt.date}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
