import React from 'react';
import {
  Box,
  Typography,
  styled,
} from '@mui/material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

interface StatusDataPoint {
  status: string;
  count: number;
  color?: string;
}

interface StatusDistributionProps {
  data: StatusDataPoint[];
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
  '& .tooltip-percentage': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.75rem',
    marginTop: '4px',
  },
}));

const CustomLegend = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '16px',
  marginTop: '16px',
}));

const LegendItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '& .legend-color': {
    width: '12px',
    height: '12px',
  },
  '& .legend-label': {
    color: '#FFFFFF',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
}));

export const StatusDistribution: React.FC<StatusDistributionProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
}) => {
  const defaultColors = {
    'Operational': '#4CAF50',
    'Warning': '#FFD700',
    'Critical': '#FF3B3B',
    'Unknown': 'rgba(255, 255, 255, 0.7)',
  };

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <CustomTooltip>
          <div className="tooltip-label">{payload[0].name}</div>
          <div className="tooltip-value">Count: {payload[0].value}</div>
          <div className="tooltip-percentage">{percentage}% of total</div>
        </CustomTooltip>
      );
    }
    return null;
  };

  const renderLegend = () => (
    <CustomLegend>
      {data.map((entry, index) => (
        <LegendItem key={index}>
          <div
            className="legend-color"
            style={{
              backgroundColor: entry.color || defaultColors[entry.status as keyof typeof defaultColors] || '#FFFFFF',
            }}
          />
          <span className="legend-label">{entry.status}</span>
        </LegendItem>
      ))}
    </CustomLegend>
  );

  return (
    <ChartContainer>
      {title && <ChartTitle variant="h6">{title}</ChartTitle>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color || defaultColors[entry.status as keyof typeof defaultColors] || '#FFFFFF'}
              />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
        </PieChart>
      </ResponsiveContainer>
      {showLegend && renderLegend()}
    </ChartContainer>
  );
};

export default StatusDistribution; 