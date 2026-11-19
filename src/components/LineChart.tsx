import { useMemo } from 'react';
import Svg, { Circle, Defs, Line, LinearGradient, Mask, Path, Rect, Stop } from 'react-native-svg';

import { colors } from '@/theme';

function curve(pts: number[], W: number, H: number) {
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const pad = (max - min) * 0.12 || 1;
  const lo = min - pad;
  const hi = max + pad;
  const xy = pts.map((v, i) => [(i * W) / (pts.length - 1), 8 + (H - 16) * (1 - (v - lo) / (hi - lo))] as const);
  let d = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 1; i < xy.length; i++) {
    const [x0, y0] = xy[i - 1];
    const [x1, y1] = xy[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { line: d, area: `${d} L${W},${H} L0,${H} Z`, end: xy[xy.length - 1] };
}

export function LineChart({ points, width, height = 180 }: { points: number[]; width: number; height?: number }) {
  const cv = useMemo(() => curve(points, width, height), [points, width, height]);
  const [ex, ey] = cv.end;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <Defs>
        <LinearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors.dataFrom} />
          <Stop offset="1" stopColor={colors.dataTo} />
        </LinearGradient>
        <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#fff" stopOpacity={0.42} />
          <Stop offset="1" stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
        <Mask id="fadeMask">
          <Rect width={width} height={height} fill="url(#fade)" />
        </Mask>
      </Defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <Line
          key={f}
          x1={0}
          x2={width}
          y1={height * f}
          y2={height * f}
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="2 5"
        />
      ))}
      <Path d={cv.area} fill="url(#line)" mask="url(#fadeMask)" />
      <Path d={cv.line} fill="none" stroke="url(#line)" strokeWidth={2.5} strokeLinecap="round" />
      <Line x1={ex} x2={ex} y1={ey} y2={height} stroke="rgba(123,224,122,0.45)" strokeDasharray="2 3" />
      <Circle cx={ex} cy={ey} r={11} fill="rgba(123,224,122,0.18)" />
      <Circle cx={ex} cy={ey} r={4.5} fill={colors.dataTo} stroke={colors.bg} strokeWidth={2} />
    </Svg>
  );
}
