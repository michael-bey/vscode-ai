import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CodeIcon from '@mui/icons-material/Code';


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'MDR View', path: '/bubble-view', icon: <ViewModuleIcon /> },
  ];

  const getIcon = (name) => {
    switch(name) {
      case 'Home': return <HomeIcon fontSize="small" />;
      case 'MDR View': return <ViewModuleIcon fontSize="small" />;
      default: return null;
    }
  };

  const drawer = (
    <Box
      sx={{ width: 250, bgcolor: '#23293a', color: '#fff', height: '100%' }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CodeIcon sx={{ color: 'var(--accent)', fontSize: 32, mr: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1, color: '#fff' }}>
          vscode.ai
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#333' }} />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            component={Link}
            to={item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              borderRadius: 2,
              mx: 1,
              color: '#fff',
              textDecoration: 'none',
              '&:hover': {
                bgcolor: 'rgba(0,255,179,0.08)',
                color: 'var(--accent)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'var(--accent)' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: '#333' }} />
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <IconButton sx={{ color: 'var(--accent)' }} aria-label="github">
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '2px solid #23293a',
        bgcolor: '#23293a',
        boxShadow: '0 2px 12px 0 #0006',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                '& .logo-text': {
                  color: 'var(--accent)',
                }
              }
            }}
          >
            <CodeIcon sx={{ color: 'var(--accent)', fontSize: 28, mr: 1, display: { xs: 'block', sm: 'block' } }} />
            <Typography
              variant="h6"
              className="logo-text"
              sx={{
                fontWeight: 900,
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: '#fff',
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                ml: 0.5,
                transition: 'color 0.3s ease'
              }}
            >
              vscode.ai
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 4, flexGrow: 1 }}>
            {!isMobile && navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                size="small"
                startIcon={item.icon}
                sx={{
                  mr: 2,
                  textTransform: 'none',
                  fontWeight: 'medium',
                  fontSize: '0.95rem',
                  color: '#fff',
                  letterSpacing: 0.5,
                  borderRadius: 2,
                  px: 1.5,
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: 'rgba(0,255,179,0.08)',
                    color: 'var(--accent)',
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {isMobile ? (
            <>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{ ml: 1, color: 'var(--accent)' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="github"
                size="small"
                sx={{
                  color: '#fff',
                  ml: 1,
                  '&:hover': {
                    color: 'var(--accent)',
                    bgcolor: 'transparent',
                  }
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
