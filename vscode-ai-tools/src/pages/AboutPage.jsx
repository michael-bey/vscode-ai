import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BoltIcon from '@mui/icons-material/Bolt';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExtensionIcon from '@mui/icons-material/Extension';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';

const AboutPage = () => {
  const theme = useTheme();

  const benefitItems = [
    {
      icon: <AutoFixHighIcon color="primary" />,
      text: "Providing intelligent code completions that understand context"
    },
    {
      icon: <BoltIcon color="primary" />,
      text: "Automating repetitive coding tasks"
    },
    {
      icon: <MenuBookIcon color="primary" />,
      text: "Offering code explanations and documentation"
    },
    {
      icon: <AutoAwesomeIcon color="primary" />,
      text: "Suggesting optimizations and best practices"
    },
    {
      icon: <BugReportIcon color="primary" />,
      text: "Helping with debugging and error resolution"
    }
  ];

  const evaluationItems = [
    {
      icon: <ExtensionIcon color="secondary" />,
      title: "Feature set",
      text: "What capabilities does the tool offer?"
    },
    {
      icon: <LanguageIcon color="secondary" />,
      title: "Language support",
      text: "Which programming languages are supported?"
    },
    {
      icon: <AttachMoneyIcon color="secondary" />,
      title: "Pricing model",
      text: "Is it free, freemium, or paid?"
    },
    {
      icon: <IntegrationInstructionsIcon color="secondary" />,
      title: "Integration",
      text: "How well does it integrate with VSCode?"
    },
    {
      icon: <SpeedOutlinedIcon color="secondary" />,
      title: "Performance",
      text: "How responsive and accurate is the tool?"
    }
  ];

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(180deg, rgba(245,247,250,1) 0%, rgba(255,255,255,1) 100%)',
      pt: 6,
      pb: 8
    }}>
      <Container maxWidth="md">
        <Box sx={{
          mb: 5,
          textAlign: 'center',
          px: { xs: 2, md: 6 }
        }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #2196f3 0%, #1565c0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2
            }}
          >
            About VSCode AI Tools Explorer
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Helping developers discover the perfect AI tools for their coding workflow
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            mb: 5,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <CodeIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mr: 1.5 }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Our Mission
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            VSCode AI Tools Explorer is a comprehensive comparison website for AI-powered extensions and tools available for Visual Studio Code. Our goal is to help developers find the right AI tools to enhance their coding experience and productivity.
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Each tool is evaluated based on its features, pricing, and capabilities, allowing you to make informed decisions about which AI tools best suit your development workflow.
          </Typography>
        </Paper>

        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}
            >
              <Box sx={{
                bgcolor: 'primary.main',
                py: 2,
                px: 3,
                display: 'flex',
                alignItems: 'center'
              }}>
                <SmartToyIcon sx={{ color: 'white', mr: 1.5 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Why Use AI Tools in VSCode?
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  AI-powered tools can significantly enhance your coding experience by:
                </Typography>
                <List disablePadding>
                  {benefitItems.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { lineHeight: 1.5 }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}
            >
              <Box sx={{
                bgcolor: 'secondary.main',
                py: 2,
                px: 3,
                display: 'flex',
                alignItems: 'center'
              }}>
                <SpeedIcon sx={{ color: 'white', mr: 1.5 }} />
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                  How We Evaluate Tools
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  Our evaluation criteria include:
                </Typography>
                <List disablePadding>
                  {evaluationItems.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {item.title}: <span style={{ fontWeight: 'normal' }}>{item.text}</span>
                          </Typography>
                        }
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { lineHeight: 1.5 }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            bgcolor: 'rgba(0,0,0,0.02)',
            py: 3,
            px: 4,
            borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} VSCode AI Tools Explorer. All information is provided for reference purposes only.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
