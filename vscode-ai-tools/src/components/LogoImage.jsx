import { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import './LogoImage.css';

const LogoImage = ({ logoUrl, name, size = 48 }) => {
  const [error, setError] = useState(false);

  // Generate a color based on the name for consistent avatar backgrounds
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  // Get first letter of each word for the avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const avatarColor = stringToColor(name);

  const handleError = () => {
    console.log(`Error loading logo: ${logoUrl}`);
    setError(true);
  };

  if (!logoUrl || error) {
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: avatarColor,
          fontSize: size * 0.4
        }}
      >
        {getInitials(name)}
      </Avatar>
    );
  }

  // For external URLs, use them directly
  // For local paths, make sure they start with a slash
  const imageSrc = logoUrl.startsWith('http')
    ? logoUrl
    : logoUrl.startsWith('/') ? logoUrl : `/${logoUrl}`;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.08)',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={imageSrc}
        alt={`${name} logo`}
        onError={handleError}
        className="logo-image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
};

export default LogoImage;
