import React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useNavigate } from 'react-router-dom';

interface Artist {
  id: number;
  name: string;
  imageSrc: string;
}

interface GroupAvatarsProps {
  artists: Artist[]; 
}

const GroupAvatars: React.FC<GroupAvatarsProps> = ({ artists }) => {
  const navigate = useNavigate();

  const handleArtistClick = (artistId: number) => {
    navigate(`/artist/${artistId}`); // Navigate to artist detail page on click
  };

  return (
    <AvatarGroup max={5}>
      {artists.map((artist) => (
        <Avatar
          key={artist.id}
          alt={artist.name}
          src={artist.imageSrc}
          onClick={() => handleArtistClick(artist.id)}
          style={{ cursor: 'pointer' }} // Avatar is clickable
        />
      ))}
    </AvatarGroup>
  );
};

export default GroupAvatars;
