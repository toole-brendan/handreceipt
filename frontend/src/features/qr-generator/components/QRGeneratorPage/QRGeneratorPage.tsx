import React, { useState } from 'react';
import { Box, Typography, CardContent, TextField, Select, MenuItem, FormControl, InputLabel, Stack, SelectChangeEvent } from '@mui/material';
import { Card } from '@/components/common/mui/Card';
import { SingleItemGenerator } from '../GeneratorOptions/SingleItemGenerator';
import { NewItemForm } from '../GeneratorOptions/NewItemForm';
import { RosterUpload } from '../RosterManagement/RosterUpload';
import { NewItemFormData } from '../../types/qr.types';

export const QRGeneratorPage: React.FC = () => {
  const [newItemFormData, setNewItemFormData] = useState<NewItemFormData>({
    name: '',
    serialNumber: '',
    category: '',
    location: '',
    value: '',
    condition: '',
    notes: '',
    isSensitive: false,
  });

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItemFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewItemFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    // TODO: Implement file upload handling
    console.log('File selected:', file.name);
  };

  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Searching:', query);
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
        QR Code Generator
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gap: 3, 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        alignItems: 'stretch',
        '& .MuiCard-root': {
          height: '100%',
          minHeight: '500px',
          backgroundColor: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          }
        }
      }}>
        <Card variant="outlined" emphasis="low">
          <CardContent sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            p: 3,
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Single Item Generator
            </Typography>
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 4,
              py: 4
            }}>
              <SingleItemGenerator onSearch={handleSearch} />
              <Box sx={{ 
                width: '200px', 
                height: '200px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                p: 2
              }}>
                <img src="/qr-placeholder.svg" alt="QR Code Preview" style={{ width: '100%', height: '100%', opacity: 0.6 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined" emphasis="low">
          <CardContent sx={{ 
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              New Item
            </Typography>
            <Stack spacing={3} sx={{ flex: 1 }}>
              <TextField
                fullWidth
                label="Item Name"
                name="name"
                value={newItemFormData.name}
                onChange={handleTextFieldChange}
                variant="outlined"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
              />
              <TextField
                fullWidth
                label="Serial Number"
                name="serialNumber"
                value={newItemFormData.serialNumber}
                onChange={handleTextFieldChange}
                variant="outlined"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
              />
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newItemFormData.category}
                  onChange={handleSelectChange}
                  label="Category"
                >
                  <MenuItem value="weapon">Weapon</MenuItem>
                  <MenuItem value="equipment">Equipment</MenuItem>
                  <MenuItem value="vehicle">Vehicle</MenuItem>
                  <MenuItem value="electronics">Electronics</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Initial Location"
                name="location"
                value={newItemFormData.location}
                onChange={handleTextFieldChange}
                variant="outlined"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
              />
              <TextField
                fullWidth
                label="Value"
                name="value"
                value={newItemFormData.value}
                onChange={handleTextFieldChange}
                variant="outlined"
                sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}
              />
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'rgba(0, 0, 0, 0.2)' }}>
                <InputLabel>Condition</InputLabel>
                <Select
                  name="condition"
                  value={newItemFormData.condition}
                  onChange={handleSelectChange}
                  label="Condition"
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="excellent">Excellent</MenuItem>
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="fair">Fair</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" emphasis="low">
          <CardContent sx={{ 
            height: '100%',
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Roster Upload
            </Typography>
            <Box sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3
            }}>
              <RosterUpload onFileSelect={handleFileSelect} />
              <Typography variant="body2" color="text.secondary">
                Supports .xlsx, .csv formats
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}; 