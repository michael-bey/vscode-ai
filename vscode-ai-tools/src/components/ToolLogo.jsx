import { useState } from 'react';
import { Avatar } from '@mui/material';

const ToolLogo = ({ name, logoUrl, size = 48 }) => {
  const [error, setError] = useState(false);

  // Generate a color based on the name for consistent avatar backgrounds
  const stringToColor = (string) => {
    let hash = 0;
    if (!string) return '#bdbdbd'; // Default color if name is undefined
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
    if (!name) return '??'; // Default initials if name is undefined
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const avatarColor = stringToColor(name);

  // If no logoUrl is provided, or if there was an error loading the image, show Avatar
  if (error || !logoUrl) {
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: avatarColor,
          fontSize: size * 0.4,
          border: '1px solid rgba(0,0,0,0.08)', // Added border to match image style
        }}
      >
        {getInitials(name)}
      </Avatar>
    );
  }

  // Construct the effective URL for the image using Vite's BASE_URL
  // import.meta.env.BASE_URL will be like '/' or '/subdirectory/'
  const baseUrl = import.meta.env.BASE_URL;
  let pathSegment = logoUrl;
  if (logoUrl.startsWith('/')) {
    pathSegment = logoUrl.substring(1); // Remove leading slash if present, e.g., 'logos/image.png'
  }
  // Ensures no double slashes if baseUrl is '/' and pathSegment starts without one,
  // or correctly joins if baseUrl is '/subdir/' and pathSegment is 'logos/image.png'.
  const effectiveLogoUrl = baseUrl.endsWith('/') ? baseUrl + pathSegment : baseUrl + '/' + pathSegment;
  
  // Handle case where baseUrl might be "/" and pathSegment already starts with "/" (after potential modification if logoUrl was just "/"),
  // or if logoUrl was "" and became "", leading to "//" or "/".
  // A more robust join:
  const finalEffectiveLogoUrl = new URL(pathSegment, window.location.origin + baseUrl).href;

  // Otherwise, show the image
  return (
    <img
      src={finalEffectiveLogoUrl} // Use the constructed URL
      alt={`${name} logo`}
      onError={() => setError(true)} // Set error to true on image load failure
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        padding: '4px', // Added padding for better visual appearance
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '4px', // Added borderRadius to match Avatar style
        backgroundColor: 'white' // Ensure background is white for transparent PNGs
      }}
    />
  );
};

export default ToolLogo;
