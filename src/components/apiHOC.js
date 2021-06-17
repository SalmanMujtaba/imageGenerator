import React, { useEffect } from 'react';

export default function apiHOC() {
  const [ inputValue, setInputValue ] = useEffect("");

  useEffect(() => {
    const response = await fetch(`https://source.unsplash.com/${this.IMAGE_WIDTH}x${this.IMAGE_HEIGHT}/?${inputValue}/`);
    return () => response;
  }, [inputValue])
}