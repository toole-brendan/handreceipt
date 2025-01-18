import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  CircularProgress,
} from '@mui/material';
import { ReportClassificationBadge } from '../ReportClassificationBadge/ReportClassificationBadge';
import { ReportActions } from './ReportActions';
import { ReportFilters } from '../ReportFilters/ReportFilters';
import { useNavigate } from 'react-router-dom';

export interface Report {
  id: string;
  name: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  generatedDate: string;
  status: 'Generated' | 'Processing' | 'Failed';
  type: string;
}

interface ReportListProps {
  reportType: string;
}

// Mock data for development
const MOCK_REPORTS: Record<string, Report[]> = {
  'property_book': [
    {
      id: '1',
      name: 'Monthly Property Accountability Report',
      classification: 'UNCLASSIFIED',
      generatedDate: new Date().toISOString(),
      status: 'Generated',
      type: 'property_book'
    },
    {
      id: '2',
      name: 'Quarterly Property Review',
      classification: 'CONFIDENTIAL',
      generatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Processing',
      type: 'property_book'
    }
  ],
  'maintenance': [
    {
      id: '3',
      name: 'Equipment Maintenance Schedule',
      classification: 'UNCLASSIFIED',
      generatedDate: new Date().toISOString(),
      status: 'Generated',
      type: 'maintenance'
    }
  ],
  'audit': [
    {
      id: '4',
      name: 'Annual Audit Report',
      classification: 'SECRET',
      generatedDate: new Date().toISOString(),
      status: 'Generated',
      type: 'audit'
    }
  ]
};

interface ReportActionsProps {
  report: Report;
}

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 0,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  padding: '16px',
}));

const StyledTableHeaderCell = styled(StyledTableCell)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: 'rgba(255, 255, 255, 0.7)',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontSize: '0.75rem',
}));

const StatusChip = styled(Box)<{ status: string }>(({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'generated':
        return '#4CAF50';
      case 'processing':
        return '#FFD700';
      case 'failed':
        return '#FF3B3B';
      default:
        return 'rgba(255, 255, 255, 0.7)';
    }
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${getStatusColor()}`,
    color: getStatusColor(),
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  };
});

export const ReportList: React.FC<ReportListProps> = ({ reportType }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Use mock data for development
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        const mockData = MOCK_REPORTS[reportType] || [];
        setReports(mockData);
        setFilteredReports(mockData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [reportType]);

  const handleFilterChange = (filters: Record<string, any>) => {
    const filtered = reports.filter(report => {
      const matchesClassification = !filters.classification || 
        report.classification === filters.classification;
      const matchesStatus = !filters.status || 
        report.status === filters.status;
      const matchesDate = !filters.date || 
        new Date(report.generatedDate) >= new Date(filters.date);
      
      return matchesClassification && matchesStatus && matchesDate;
    });
    
    setFilteredReports(filtered);
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress sx={{ color: '#FFFFFF' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FF3B3B',
            fontFamily: 'serif',
            letterSpacing: '0.05em'
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <ReportFilters onFilterChange={handleFilterChange} />
      </Box>

      <StyledPaper>
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Classification</StyledTableHeaderCell>
                <StyledTableHeaderCell>Generated Date</StyledTableHeaderCell>
                <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <StyledTableCell colSpan={5}>
                    <Typography 
                      sx={{ 
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontStyle: 'italic'
                      }}
                    >
                      No reports found
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow 
                    key={report.id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.03)' 
                      }
                    }}
                  >
                    <StyledTableCell>
                      <Typography sx={{ fontWeight: 500 }}>
                        {report.name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <ReportClassificationBadge level={report.classification} />
                    </StyledTableCell>
                    <StyledTableCell>
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>
                      <StatusChip status={report.status}>
                        {report.status}
                      </StatusChip>
                    </StyledTableCell>
                    <StyledTableCell>
                      <ReportActions 
                        onView={() => navigate(`/reports/${report.id}`)}
                        onDownload={() => {
                          // Handle download
                          console.log('Download report:', report.id);
                        }}
                        onPrint={() => {
                          // Handle print
                          console.log('Print report:', report.id);
                        }}
                        onDelete={() => {
                          // Handle delete
                          console.log('Delete report:', report.id);
                        }}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledPaper>
    </Box>
  );
};

export default ReportList; 