import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Modal,
  Paper,
  Chip,
  Button,
  Link,
  IconButton
} from '@mui/material';

import { tools } from '../data/tools';
import ToolsFilter from '../components/ToolsFilter';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StoreIcon from '@mui/icons-material/Store';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import AppsIcon from '@mui/icons-material/Apps';

const BubbleViewPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [open, setOpen] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [filteredTools, setFilteredTools] = useState(tools);
  const [filters, setFilters] = useState({
    searchTerm: '',
    type: 'all',
    pricing: 'all',
    license: 'all'
  });
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Apply filters to tools
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
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Initialize bubbles with positions
  useEffect(() => {
    if (containerRef.current && filteredTools.length > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      // Calculate grid dimensions - more columns for a tighter grid
      const columns = Math.ceil(Math.sqrt(filteredTools.length) * 1.5); // More columns for tighter grid
      const rows = Math.ceil(filteredTools.length / columns);

      // Calculate spacing between bubbles (tighter than full cell width/height)
      const spacingX = containerWidth / (columns + 1); // Add padding on sides
      const spacingY = containerHeight / (rows + 1); // Add padding on top/bottom

      const initialBubbles = filteredTools.map((tool, index) => {
        // Position in grid
        const col = index % columns;
        const row = Math.floor(index / columns);

        // Center position within grid
        const centerX = spacingX + col * spacingX;
        const centerY = spacingY + row * spacingY;

        // Add slight random offset to make it less rigid
        const offsetX = (Math.random() * 2 - 1) * 5; // Just a few pixels
        const offsetY = (Math.random() * 2 - 1) * 5; // Just a few pixels

        return {
          id: tool.id,
          tool,
          x: centerX + offsetX,
          y: centerY + offsetY,
          baseX: centerX, // Store original position for wiggle
          baseY: centerY,
          size: 70, // Slightly smaller bubbles for tighter grid
          targetSize: 70, // For smooth size transitions
          wigglePhase: Math.random() * Math.PI * 2, // Random starting phase
          wiggleSpeed: 0.5 + Math.random() * 0.5, // Slightly different speeds
          wiggleAmount: 2 + Math.random() * 2, // Slightly different amounts
          hover: false
        };
      });

      setBubbles(initialBubbles);
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [filteredTools]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const startAnimation = () => {
    const animate = () => {
      setBubbles(prevBubbles => {
        if (!containerRef.current) return prevBubbles;

        // Get current time for wiggle animation
        const time = performance.now() / 1000;

        return prevBubbles.map(bubble => {
          let {
            baseX, baseY, wigglePhase, wiggleSpeed, wiggleAmount,
            size, targetSize, hover
          } = bubble;

          // Check if mouse is near this bubble
          const mouseX = mousePosition.current.x;
          const mouseY = mousePosition.current.y;
          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Determine hover influence (0 to 1)
          const hoverRadius = 150; // How far the mouse influence reaches
          const hoverInfluence = Math.max(0, 1 - distance / hoverRadius);

          // Update hover state - true if very close
          const isHover = hoverInfluence > 0.7;

          // Calculate target size based on hover influence
          const newTargetSize = 70 + (hoverInfluence * 30); // Max size increase of 30px

          // Smoothly transition current size to target size
          const sizeDiff = newTargetSize - size;
          const newSize = size + sizeDiff * 0.1; // Slow, gradual change

          // Calculate wiggle for non-hovered bubbles
          // Reduce wiggle as hover influence increases
          const wiggleReduction = Math.max(0, 1 - hoverInfluence * 2);
          const wiggleX = Math.sin(time * wiggleSpeed + wigglePhase) * wiggleAmount * wiggleReduction;
          const wiggleY = Math.cos(time * wiggleSpeed + wigglePhase * 1.3) * wiggleAmount * wiggleReduction;

          // Final position is base position plus wiggle
          const x = baseX + wiggleX;
          const y = baseY + wiggleY;

          return {
            ...bubble,
            x,
            y,
            size: newSize,
            targetSize: newTargetSize,
            hover: isHover
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleOpen = (tool) => {
    setSelectedTool(tool);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#181c24', pt: 2, pb: 6, width: '100%' }}>
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
          <Box
            ref={containerRef}
            sx={{
            position: 'relative',
            height: 'calc(100vh - 150px)',
            minHeight: '600px',
            width: '100%',
            overflow: 'hidden',
            borderRadius: '8px',
            bgcolor: 'rgba(35, 41, 58, 0.3)',
            border: '1px solid rgba(0, 255, 179, 0.2)',
            boxShadow: 'inset 0 0 30px rgba(0, 255, 179, 0.1)',
            cursor: 'default'
          }}
        >
          {bubbles.map((bubble) => (
            <Box
              key={bubble.id}
              onClick={() => handleOpen(bubble.tool)}
              sx={{
                position: 'absolute',
                left: bubble.x - bubble.size/2,
                top: bubble.y - bubble.size/2,
                width: bubble.size,
                height: bubble.size,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#23293a',
                border: '2px solid var(--accent)',
                cursor: 'pointer',
                transition: 'box-shadow 0.5s ease',
                boxShadow: bubble.hover
                  ? '0 0 20px rgba(0, 255, 179, 0.6), 0 0 30px rgba(0, 255, 179, 0.3)'
                  : '0 0 10px rgba(0, 255, 179, 0.2)',
                zIndex: bubble.hover ? 10 : 1
              }}
            >
              {bubble.tool.logoUrl ? (
                <Box
                  component="img"
                  src={bubble.tool.logoUrl}
                  alt={bubble.tool.name}
                  sx={{
                    width: '70%',
                    height: '70%',
                    objectFit: 'contain',
                    opacity: bubble.hover ? 1 : 0.85,
                    transition: 'opacity 0.5s ease'
                  }}
                />
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'var(--accent)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    wordBreak: 'break-word',
                    padding: '5px',
                    opacity: bubble.hover ? 1 : 0.85,
                    transition: 'opacity 0.5s ease'
                  }}
                >
                  {bubble.tool.name}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
        )}
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="tool-detail-modal"
        aria-describedby="tool-detail-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          p: 2
        }}>
          {selectedTool && (
            <Paper sx={{
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: '#23293a',
              border: '1px solid var(--accent)',
              boxShadow: '0 0 20px rgba(0, 255, 179, 0.3)',
              p: 3,
              position: 'relative'
            }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#fff'
                }}
              >
                <CloseIcon />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                {selectedTool.logoUrl ? (
                  <Box
                    component="img"
                    src={selectedTool.logoUrl}
                    alt={selectedTool.name}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      mr: 2,
                      border: '2px solid var(--accent)',
                      p: 1,
                      bgcolor: '#181c24'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      mr: 2,
                      border: '2px solid var(--accent)',
                      p: 1,
                      bgcolor: '#181c24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'var(--accent)',
                        fontWeight: 'bold',
                        fontSize: '0.6rem',
                        textAlign: 'center'
                      }}
                    >
                      {selectedTool.name.substring(0, 10)}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="h5" component="h2" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    {selectedTool.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#b0b8c1' }}>
                    by {selectedTool.company}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: '#fff', mb: 3 }}>
                {selectedTool.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: 'var(--accent)', mb: 1, fontWeight: 'bold' }}>
                  Type
                </Typography>
                <Chip
                  label={selectedTool.type}
                  sx={{
                    bgcolor: '#181c24',
                    color: '#fff',
                    border: '1px solid var(--accent)'
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: 'var(--accent)', mb: 1, fontWeight: 'bold' }}>
                  Pricing
                </Typography>
                <Chip
                  label={selectedTool.pricing}
                  sx={{
                    bgcolor: '#181c24',
                    color: '#fff',
                    border: '1px solid var(--accent)'
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: 'var(--accent)', mb: 1, fontWeight: 'bold' }}>
                  Links
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedTool.marketplaceLink && (
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={selectedTool.marketplaceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<StoreIcon />}
                      sx={{
                        color: 'var(--accent)',
                        borderColor: 'var(--accent)',
                        '&:hover': {
                          borderColor: 'var(--accent)',
                          bgcolor: 'rgba(0, 255, 179, 0.1)'
                        }
                      }}
                    >
                      Marketplace
                    </Button>
                  )}
                  {selectedTool.homepageLink && (
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={selectedTool.homepageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<OpenInNewIcon />}
                      sx={{
                        color: 'var(--accent)',
                        borderColor: 'var(--accent)',
                        '&:hover': {
                          borderColor: 'var(--accent)',
                          bgcolor: 'rgba(0, 255, 179, 0.1)'
                        }
                      }}
                    >
                      Homepage
                    </Button>
                  )}
                  {selectedTool.demoLink && (
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      href={selectedTool.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<PlayCircleOutlineIcon />}
                      sx={{
                        color: 'var(--accent)',
                        borderColor: 'var(--accent)',
                        '&:hover': {
                          borderColor: 'var(--accent)',
                          bgcolor: 'rgba(0, 255, 179, 0.1)'
                        }
                      }}
                    >
                      Demo
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default BubbleViewPage;
