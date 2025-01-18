import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  styled,
  Divider,
  List,
  ListItem,
} from '@mui/material';
import { Print, ArrowBack } from '@mui/icons-material';
import ClassificationBanner from '@/components/common/ClassificationBanner';
import LoadingFallback from '@/components/feedback/LoadingFallback';
import { ReportClassificationBadge } from '@/features/reports/components/ReportClassificationBadge/ReportClassificationBadge';
import type { ClassificationLevel } from '@/features/reports/components/ReportClassificationBadge/ReportClassificationBadge';

interface Report {
  id: string;
  name: string;
  content: string;
  classification: ClassificationLevel;
  generatedDate: string;
  generatedBy: {
    id: string;
    name: string;
    rank: string;
  };
  metadata: {
    version: string;
    hash: string;
    signatures: string[];
  };
}

const StyledPaper = styled(Paper)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  padding: '24px',
  marginBottom: '24px',
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  color: '#FFFFFF',
  padding: '8px 24px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
}));

const MetadataItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
}));

const CodeBlock = styled(Box)(() => ({
  fontFamily: 'monospace',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  padding: '8px 12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '0.875rem',
  letterSpacing: '0.05em',
}));

const ReportViewer: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userClearance = useSelector((state: any) => state.auth.clearanceLevel);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reports/${reportId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-Security-Clearance': userClearance
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Insufficient clearance level to view this report');
          }
          throw new Error('Failed to fetch report');
        }

        const data = await response.json();
        setReport(data);

        // Log access for audit trail
        await fetch('/api/audit/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            action: 'VIEW_REPORT',
            resourceId: reportId,
            resourceType: 'REPORT',
            classification: data.classification
          })
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId, userClearance]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#FF3B3B',
              mb: 2,
              fontFamily: 'serif',
              letterSpacing: '0.05em'
            }}
          >
            {error}
          </Typography>
          <StyledButton
            startIcon={<ArrowBack />}
            onClick={() => navigate('/reports')}
          >
            Back to Reports
          </StyledButton>
        </StyledPaper>
      </Container>
    );
  }

  if (!report) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#FFD700',
              mb: 2,
              fontFamily: 'serif',
              letterSpacing: '0.05em'
            }}
          >
            Report not found
          </Typography>
          <StyledButton
            startIcon={<ArrowBack />}
            onClick={() => navigate('/reports')}
          >
            Back to Reports
          </StyledButton>
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <ClassificationBanner />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          {/* Report Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'serif',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                }}
              >
                {report.name}
              </Typography>
              <ReportClassificationBadge level={report.classification} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <MetadataItem>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem'
                  }}
                >
                  Generated:
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  {new Date(report.generatedDate).toLocaleString()}
                </Typography>
              </MetadataItem>
              <MetadataItem>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem'
                  }}
                >
                  By:
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  {report.generatedBy.rank} {report.generatedBy.name}
                </Typography>
              </MetadataItem>
              <MetadataItem>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.75rem'
                  }}
                >
                  Version:
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  {report.metadata.version}
                </Typography>
              </MetadataItem>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledButton
                startIcon={<Print />}
                onClick={() => window.print()}
              >
                Print Report
              </StyledButton>
              <StyledButton
                startIcon={<ArrowBack />}
                onClick={() => navigate('/reports')}
              >
                Back to Reports
              </StyledButton>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

          {/* Report Content */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="body1" 
              component="div"
              sx={{ 
                color: '#FFFFFF',
                lineHeight: 1.6,
                letterSpacing: '0.03em'
              }}
            >
              {report.content}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 3 }} />

          {/* Report Footer */}
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle2"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                  mb: 1
                }}
              >
                Verification Hash
              </Typography>
              <CodeBlock>
                {report.metadata.hash}
              </CodeBlock>
            </Box>

            <Box>
              <Typography 
                variant="subtitle2"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                  mb: 1
                }}
              >
                Digital Signatures
              </Typography>
              <List disablePadding>
                {report.metadata.signatures.map((sig, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding 
                    sx={{ mb: 1 }}
                  >
                    <CodeBlock sx={{ width: '100%' }}>
                      {sig}
                    </CodeBlock>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
      <ClassificationBanner />
    </Box>
  );
};

export default ReportViewer; 