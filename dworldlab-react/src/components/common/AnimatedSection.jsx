import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '../../hooks/useScrollAnimation';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp', 
  threshold = 0.1,
  className = '',
  delay = 0,
  ...props 
}) => {
  const { ref, isInView } = useScrollAnimation(threshold);
  
  const getAnimationVariant = () => {
    switch (animation) {
      case 'fadeInLeft':
        return fadeInLeft;
      case 'fadeInRight':
        return fadeInRight;
      case 'scaleIn':
        return scaleIn;
      case 'fadeInUp':
      default:
        return fadeInUp;
    }
  };

  const variant = getAnimationVariant();
  
  // Add delay to the animation
  const delayedVariant = {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={delayedVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 