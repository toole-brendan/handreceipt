import React from 'react';
import {
  Box,
  Typography,
  styled,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface MetricDataPoint {
  label: string;
  value: number;
  category?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface MetricsChartProps {
  data: MetricDataPoint[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const ChartContainer = styled(Box)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '24px',
  height: '100%',
}));

const ChartTitle = styled(Typography)(() => ({
  color: '#FFFFFF',
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  marginBottom: '24px',
  fontWeight: 500,
}));

const CustomTooltip = styled(Box)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '12px',
  '& .tooltip-label': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  '& .tooltip-value': {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '& .tooltip-trend': {
    fontSize: '0.75rem',
    marginTop: '4px',
    '&.up': { color: '#4CAF50' },
    '&.down': { color: '#FF3B3B' },
    '&.stable': { color: '#FFD700' },
  },
}));

export const MetricsChart: React.FC<MetricsChartProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
  layout = 'vertical',
}) => {
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find(item => item.label === label);
      return (
        <CustomTooltip>
          <div className="tooltip-label">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="tooltip-value">
              {entry.name}: {entry.value}
            </div>
          ))}
          {dataPoint?.trend && (
            <div className={`tooltip-trend ${dataPoint.trend}`}>
              Trend: {dataPoint.trend.toUpperCase()}
            </div>
          )}
        </CustomTooltip>
      );
    }
    return null;
  };

  const categories = [...new Set(data.map(item => item.category))];
  const colors = ['#FFFFFF', '#FFD700', '#4CAF50', '#FF3B3B'];

  return (
    <ChartContainer>
      {title && <ChartTitle variant="h6">{title}</ChartTitle>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
            horizontal={layout === 'vertical'}
            vertical={layout === 'horizontal'}
          />
          {layout === 'vertical' ? (
            <>
              <XAxis
                type="category"
                dataKey="label"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
              <YAxis
                type="category"
                dataKey="label"
                stroke="rgba(255, 255, 255, 0.7)"
                tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
              />
            </>
          )}
          <Tooltip content={renderTooltip} />
          {showLegend && (
            <Legend
              wrapperStyle={{
                color: '#FFFFFF',
                fontFamily: 'system-ui',
              }}
            />
          )}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Bar
                key={category || 'default'}
                dataKey="value"
                data={data.filter(item => item.category === category)}
                name={category || 'Value'}
                fill={colors[index % colors.length]}
                radius={[2, 2, 0, 0]}
              />
            ))
          ) : (
            <Bar
              dataKey="value"
              fill="#FFFFFF"
              radius={[2, 2, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MetricsChart; 