import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  styled,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface TimelineDataPoint {
  timestamp: string;
  value: number;
  category?: string;
}

interface TimelineChartProps {
  data: TimelineDataPoint[];
  title?: string;
  height?: number;
  showLegend?: boolean;
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
}));

export const TimelineChart: React.FC<TimelineChartProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
}) => {
  const theme = useTheme();

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <div className="tooltip-label">{formatDate(label)}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="tooltip-value">
              {entry.name}: {entry.value}
            </div>
          ))}
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
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.1)"
            vertical={false}
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            stroke="rgba(255, 255, 255, 0.7)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.7)"
            tick={{ fill: 'rgba(255, 255, 255, 0.7)' }}
          />
          <Tooltip content={renderTooltip} />
          {showLegend && (
            <Legend
              wrapperStyle={{
                color: '#FFFFFF',
                fontFamily: theme.typography.fontFamily,
              }}
            />
          )}
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Line
                key={category || 'default'}
                type="monotone"
                dataKey="value"
                data={data.filter(item => item.category === category)}
                name={category || 'Value'}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={{ fill: '#FFFFFF', r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TimelineChart; 