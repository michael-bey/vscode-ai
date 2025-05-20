import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  Chip,
  useTheme,
  Button,
  ButtonGroup
} from '@mui/material';
import ToolCard from '../components/ToolCard';
import ToolsFilter from '../components/ToolsFilter';
import { tools } from '../data/tools';
import AppsIcon from '@mui/icons-material/Apps';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TagIcon from '@mui/icons-material/Tag';

const HomePage = () => {
  const theme = useTheme();
  const [filteredTools, setFilteredTools] = useState(tools);
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    pricing: 'all',
    license: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 6;

  useEffect(() => {
    const filtered = tools.filter(tool => {
      // Search term filter
      const searchMatch = filters.searchTerm === '' ||
        tool.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Type filter
      const typeMatch = filters.type === 'all' ||
        tool.type === filters.type;

      // Pricing filter
      const pricingMatch = filters.pricing === 'all' ||
        tool.pricing.includes(filters.pricing);

      // License filter
      const licenseMatch = filters.license === 'all' ||
        (filters.license === 'Open Source' && tool.isOpenSource === true) ||
        (filters.license === 'Closed Source' && tool.isOpenSource === false);

      return searchMatch && typeMatch && pricingMatch && licenseMatch;
    });

    setFilteredTools(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      bgcolor: '#181c24',
      pt: 2,
      pb: 6,
      width: '100%'
    }}>
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Filter Section */}
        <Box sx={{ mb: 3 }}>
          <ToolsFilter onFilterChange={handleFilterChange} />
        </Box>

        {/* Tools Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AppsIcon sx={{ mr: 1, color: 'var(--accent)', fontSize: 20 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1, color: '#fff' }}>
              AI Tools
            </Typography>
            <Chip
              label={filteredTools.length}
              size="small"
              sx={{
                bgcolor: 'var(--accent)',
                color: '#181c24',
                fontWeight: 'bold',
                height: '20px',
                fontSize: '0.75rem',
                boxShadow: '0 0 8px var(--accent)'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
              Showing {indexOfFirstTool + 1}-{Math.min(indexOfLastTool, filteredTools.length)} of {filteredTools.length} tools
            </Typography>
          </Box>
        </Box>

        {filteredTools.length === 0 ? (
          <Box sx={{
            textAlign: 'center',
            py: 6,
            px: 3,
          }}>
            <SearchOffIcon sx={{ fontSize: 48, color: '#444', mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
              No tools match your filters
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b8c1' }}>
              Try adjusting your search criteria
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ width: '100%' }}>
              {currentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </Box>

            {totalPages > 1 && (
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4
              }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="medium"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 1,
                      bgcolor: '#23293a',
                      color: '#fff',
                      border: '1px solid var(--accent)',
                      '&.Mui-selected': {
                        bgcolor: 'var(--accent)',
                        color: '#181c24',
                        boxShadow: '0 0 8px var(--accent)'
                      }
                    }
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;
