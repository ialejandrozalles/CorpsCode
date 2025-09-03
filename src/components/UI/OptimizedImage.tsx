import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  overlay?: boolean;
  overlayOpacity?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style,
  width,
  height,
  priority = false,
  objectFit = 'cover',
  overlay = false,
  overlayOpacity = 0.3,
}) => {
  const [imageLoaded, setImageLoaded] = useState(priority);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const imageStyle: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    objectFit,
    transition: 'opacity 0.3s ease-in-out',
    opacity: imageLoaded && !imageError ? 1 : 0.7,
    ...style,
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
  };

  if (imageError) {
    return (
      <div
        className={`${className} image-error`}
        style={{
          ...containerStyle,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <span style={{ color: '#999', fontSize: '14px' }}>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <div className={className} style={containerStyle}>
      <motion.img
        src={src}
        alt={alt}
        style={imageStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={priority ? 'eager' : 'lazy'}
      />
      {overlay && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
