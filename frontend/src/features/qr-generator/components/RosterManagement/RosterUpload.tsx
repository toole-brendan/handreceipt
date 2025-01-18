import React, { useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface RosterUploadProps {
  onFileSelect: (file: File) => void;
}

export const RosterUpload: React.FC<RosterUploadProps> = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        width: '100%',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        bgcolor: 'rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <input {...getInputProps()} />
      <Upload size={40} strokeWidth={1.5} style={{ opacity: 0.6 }} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body1" gutterBottom>
          {isDragActive ? 'Drop the file here' : 'Drag and drop your roster file here'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or
        </Typography>
        <Button
          variant="text"
          sx={{
            mt: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            }
          }}
        >
          Choose File
        </Button>
      </Box>
    </Box>
  );
}; 