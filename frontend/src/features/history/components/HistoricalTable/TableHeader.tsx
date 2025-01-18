import * as React from 'react';
import { Property } from '@/types/property';
import { PropertyTransfer } from '@/features/history/types/history.types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search, Settings } from 'lucide-react';

export interface HistoricalPropertyListProps {
  history: PropertyTransfer[];
  loading?: boolean;
  error?: string | null;
}

export function HistoricalPropertyList({ history, loading, error }: HistoricalPropertyListProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  if (loading) return <div className="property-list__loading">Loading historical property...</div>;
  if (error) return <div className="property-list__error">Error: {error}</div>;
  if (!history?.length) return null;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 2,
        p: 2,
        bgcolor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 1
      }}>
        <TextField
          size="small"
          placeholder="Search property history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="h-4 w-4" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ 
        bgcolor: 'rgba(0, 0, 0, 0.2)',
        backgroundImage: 'none',
        boxShadow: 'none'
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              '& th': { 
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: '1.5rem'
              }
            }}>
              <TableCell>Date</TableCell>
              <TableCell>Property ID</TableCell>
              <TableCell>Property Name</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map(item => (
              <TableRow 
                key={item.id}
                sx={{ 
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.03)'
                  },
                  '& td': {
                    borderColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                <TableCell>{new Date(item.transferDate).toLocaleDateString()}</TableCell>
                <TableCell>{item.propertyId}</TableCell>
                <TableCell>{item.propertyName}</TableCell>
                <TableCell>{item.fromPerson}</TableCell>
                <TableCell>{item.toPerson}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: item.status === 'transferred' ? 'success.dark' : 
                             item.status === 'turned-in' ? 'info.dark' : 'error.dark',
                      color: 'white',
                      textTransform: 'capitalize',
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 