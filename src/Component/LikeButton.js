import React, { useState, useEffect } from 'react';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const LikeButton = ({ itemId }) => {
  const [liked, setLiked] = useState(() => {
    const storedLiked = localStorage.getItem(`liked_${itemId}`);
    return storedLiked === 'true';
  });

  useEffect(() => {
    localStorage.setItem(`liked_${itemId}`, liked.toString());
  }, [itemId, liked]);

  const toggleLiked = () => {
    setLiked(prevLiked => !prevLiked);
  };

  return (
    <button onClick={toggleLiked}>
      {liked ? <FcLike /> : <FcLikePlaceholder />}
    </button>
  );
};

export default LikeButton;
