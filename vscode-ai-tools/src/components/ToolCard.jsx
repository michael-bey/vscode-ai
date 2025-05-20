import { useState } from 'react';
import { Card, Typography, Chip, Box, Link, Collapse, IconButton, Grid, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import ToolLogo from './ToolLogo';

const ToolCard = ({ tool }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Prevent card toggle when clicking a link
  const handleCardClick = (e) => {
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    setExpanded((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 3,
        boxShadow: (expanded || hovered)
          ? '0 0 16px 2px #00ffb3a0'
          : '0 2px 8px 0 #0008',
        border: (expanded || hovered)
          ? '2px solid var(--accent)'
          : '2px solid #23293a',
        mb: 2,
        overflow: 'visible',
        bgcolor: '#181c24',
        color: '#fff',
        transition: 'box-shadow 0.3s, border 0.3s',
        cursor: 'pointer',
        position: 'relative',
      }}
      elevation={0}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Minimal Header */}
      <Box sx={{
        px: 3,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
          flex: 1
        }}>
          <ToolLogo name={tool.name} logoUrl={tool.logoUrl} size={44} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              ml: 2,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {tool.name}
          </Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          {tool.isOpenSource && (
            <Chip
              label="Open Source"
              size="small"
              icon={<GitHubIcon style={{ fontSize: 16, color: '#181c24' }} />}
              sx={{
                bgcolor: '#00ffb3',
                color: '#181c24',
                fontWeight: 700,
                fontSize: '0.75rem',
                borderRadius: 1.5,
                px: 1,
                boxShadow: '0 0 8px #00ffb3',
                height: 28,
              }}
            />
          )}
          {tool.pricing && (
            <Chip
              label={tool.pricing}
              size="small"
              sx={{
                bgcolor: tool.pricing === 'Free' ? '#00ffb3' : '#222',
                color: tool.pricing === 'Free' ? '#181c24' : '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderRadius: 1.5,
                px: 1.5,
                boxShadow: tool.pricing === 'Free' ? '0 0 8px #00ffb3' : 'none',
                height: 28,
              }}
            />
          )}
          <IconButton
            size="small"
            sx={{ color: '#00ffb3', zIndex: 2 }}
            onClick={e => { e.stopPropagation(); setExpanded(prev => !prev); }}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Expandable Details */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{
          px: 4,
          pb: 3,
          pt: 0.5
        }}>
          {/* Description */}
          {tool.description && (
            <Typography variant="body2" sx={{ color: '#b0b8c1', mb: 2, lineHeight: 1.7 }}>
              {tool.description}
            </Typography>
          )}

          {/* Features */}
          {tool.features && tool.features.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#00ffb3', fontWeight: 700, mb: 1 }}>
                Features
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                {tool.features.map((feature, idx) => (
                  <Chip
                    key={idx}
                    label={feature}
                    size="small"
                    sx={{
                      bgcolor: '#23293a',
                      color: '#fff',
                      borderRadius: 1.5,
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      height: 26,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Company and Type */}
          <Box sx={{ display: 'flex', gap: 6, mb: 2 }}>
            {tool.company && (
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#00ffb3', fontWeight: 700, mb: 0.5 }}>
                  Company
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b8c1' }}>{tool.company}</Typography>
              </Box>
            )}
            {tool.type && (
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#00ffb3', fontWeight: 700, mb: 0.5 }}>
                  Type
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0b8c1' }}>{tool.type}</Typography>
              </Box>
            )}
          </Box>

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#00ffb3', fontWeight: 700, mb: 1 }}>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                {tool.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag}
                    size="small"
                    sx={{
                      bgcolor: '#23293a',
                      color: '#fff',
                      borderRadius: 1.5,
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      height: 26,
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Links Section */}
          {(tool.marketplaceLink || tool.homepageLink || tool.demoLink || tool.githubLink) && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#00ffb3', fontWeight: 700, mb: 1.5 }}>
                Links
              </Typography>
              <Grid container spacing={2}>
                {tool.marketplaceLink && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      href={tool.marketplaceLink}
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      sx={{
                        borderColor: '#00ffb3',
                        color: '#00ffb3',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#fff',
                          backgroundColor: 'rgba(0, 255, 179, 0.08)',
                          boxShadow: '0 0 8px #00ffb3'
                        },
                      }}
                    >
                      VS Marketplace
                    </Button>
                  </Grid>
                )}

                {tool.homepageLink && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<HomeIcon />}
                      href={tool.homepageLink}
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      sx={{
                        borderColor: '#00ffb3',
                        color: '#00ffb3',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#fff',
                          backgroundColor: 'rgba(0, 255, 179, 0.08)',
                          boxShadow: '0 0 8px #00ffb3'
                        },
                      }}
                    >
                      Homepage
                    </Button>
                  </Grid>
                )}

                {tool.demoLink && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PlayCircleOutlineIcon />}
                      href={tool.demoLink}
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      sx={{
                        borderColor: '#00ffb3',
                        color: '#00ffb3',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#fff',
                          backgroundColor: 'rgba(0, 255, 179, 0.08)',
                          boxShadow: '0 0 8px #00ffb3'
                        },
                      }}
                    >
                      Demo
                    </Button>
                  </Grid>
                )}

                {tool.githubLink && (
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<GitHubIcon />}
                      href={tool.githubLink}
                      target="_blank"
                      rel="noopener"
                      onClick={e => e.stopPropagation()}
                      sx={{
                        borderColor: '#00ffb3',
                        color: '#00ffb3',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: '#fff',
                          backgroundColor: 'rgba(0, 255, 179, 0.08)',
                          boxShadow: '0 0 8px #00ffb3'
                        },
                      }}
                    >
                      GitHub
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

export default ToolCard;
