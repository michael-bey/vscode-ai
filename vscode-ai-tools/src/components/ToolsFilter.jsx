import { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
  Badge,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PaidIcon from '@mui/icons-material/Paid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { getAllTypes, getAllLicenseTypes } from '../data/tools';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ToolsFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [pricingFilter, setPricingFilter] = useState('all');
  const [licenseFilter, setLicenseFilter] = useState('all');

  const allTypes = getAllTypes().sort();
  const allLicenseTypes = getAllLicenseTypes();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    updateFilters(event.target.value, selectedType, pricingFilter, licenseFilter);
  };

  const clearSearch = () => {
    setSearchTerm('');
    updateFilters('', selectedType, pricingFilter, licenseFilter);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    updateFilters(searchTerm, event.target.value, pricingFilter, licenseFilter);
  };

  const handlePricingChange = (event) => {
    setPricingFilter(event.target.value);
    updateFilters(searchTerm, selectedType, event.target.value, licenseFilter);
  };

  const handleLicenseChange = (event) => {
    setLicenseFilter(event.target.value);
    updateFilters(searchTerm, selectedType, pricingFilter, event.target.value);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setPricingFilter('all');
    setLicenseFilter('all');
    updateFilters('', 'all', 'all', 'all');
  };

  const updateFilters = (search, type, pricing, license) => {
    onFilterChange({
      searchTerm: search,
      type: type,
      pricing: pricing,
      license: license
    });
  };

  // Count active filters
  const activeFilterCount =
    (selectedType !== 'all' ? 1 : 0) +
    (pricingFilter !== 'all' ? 1 : 0) +
    (licenseFilter !== 'all' ? 1 : 0);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3,
        border: '1.5px solid #23293a',
        width: '100%',
        bgcolor: '#23293a',
        color: '#fff',
        boxShadow: '0 2px 12px 0 #0006',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <TextField
            size="small"
            placeholder="Search AI tools..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              flexGrow: 1,
              maxWidth: { xs: '100%', sm: 400 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#23293a',
                color: '#fff',
                border: '1px solid #333',
                boxShadow: 'none',
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--accent)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--accent)',
                },
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#b0b8c1',
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'var(--accent)' }} fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end" size="small" sx={{ color: '#b0b8c1' }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterAltOutlinedIcon sx={{ color: 'var(--accent)' }} />}
              onClick={() => {
                // Toggle filter visibility logic would go here
              }}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium',
                borderColor: 'var(--accent)',
                color: '#fff',
                bgcolor: '#23293a',
                '&:hover': {
                  borderColor: 'var(--accent)',
                  bgcolor: '#23293a',
                  color: 'var(--accent)'
                }
              }}
            >
              Filters
              {activeFilterCount > 0 && (
                <Chip
                  label={activeFilterCount}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 18,
                    minWidth: 18,
                    fontSize: '0.7rem',
                    bgcolor: 'var(--accent)',
                    color: '#181c24',
                    fontWeight: 'bold'
                  }}
                />
              )}
            </Button>

            {(searchTerm || selectedType !== 'all' || pricingFilter !== 'all' || licenseFilter !== 'all') && (
              <Button
                variant="text"
                size="small"
                onClick={clearAllFilters}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'medium',
                  color: 'var(--accent)'
                }}
              >
                Clear All
              </Button>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2, borderColor: '#333' }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="type-filter-label" sx={{ fontSize: '0.875rem', color: '#b0b8c1', '&.Mui-focused': { color: 'var(--accent)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterAltOutlinedIcon fontSize="small" sx={{ mr: 0.5, color: 'var(--accent)' }} />
                  Type
                </Box>
              </InputLabel>
              <Select
                labelId="type-filter-label"
                value={selectedType}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FilterAltOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Type
                  </Box>
                }
                onChange={handleTypeChange}
                sx={{ borderRadius: 2, bgcolor: '#23293a', color: '#fff', border: '1px solid #333', '& .MuiSvgIcon-root': { color: 'var(--accent)' } }}
              >
                <MenuItem value="all">All Types</MenuItem>
                {allTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="pricing-filter-label" sx={{ fontSize: '0.875rem', color: '#b0b8c1', '&.Mui-focused': { color: 'var(--accent)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaidIcon fontSize="small" sx={{ mr: 0.5, color: 'var(--accent)' }} />
                  Pricing
                </Box>
              </InputLabel>
              <Select
                labelId="pricing-filter-label"
                value={pricingFilter}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PaidIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Pricing
                  </Box>
                }
                onChange={handlePricingChange}
                sx={{ borderRadius: 2, bgcolor: '#23293a', color: '#fff', border: '1px solid #333', '& .MuiSvgIcon-root': { color: 'var(--accent)' } }}
              >
                <MenuItem value="all">All Pricing Options</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
                <MenuItem value="Freemium">Freemium</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="license-filter-label" sx={{ fontSize: '0.875rem', color: '#b0b8c1', '&.Mui-focused': { color: 'var(--accent)' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockOpenIcon fontSize="small" sx={{ mr: 0.5, color: 'var(--accent)' }} />
                  License
                </Box>
              </InputLabel>
              <Select
                labelId="license-filter-label"
                value={licenseFilter}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockOpenIcon fontSize="small" sx={{ mr: 0.5 }} />
                    License
                  </Box>
                }
                onChange={handleLicenseChange}
                sx={{ borderRadius: 2, bgcolor: '#23293a', color: '#fff', border: '1px solid #333', '& .MuiSvgIcon-root': { color: 'var(--accent)' } }}
              >
                <MenuItem value="all">All License Types</MenuItem>
                {allLicenseTypes.map((license) => (
                  <MenuItem key={license} value={license}>{license}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ToolsFilter;
