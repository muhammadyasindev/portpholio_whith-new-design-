import React from 'react';
import * as Icons from 'lucide-react';

const IconRenderer = ({ name, className = "w-5 h-5", size = 20 }) => {
  try {
    if (!name) return <Icons.Code className={className} size={size} />;
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
    const Component = Icons[cleanName] || Icons[name] || Icons.Code;
    
    if (Component && (typeof Component === 'function' || typeof Component === 'object')) {
      return <Component className={className} size={size} />;
    }
    return <Icons.Code className={className} size={size} />;
  } catch (e) {
    return <Icons.Code className={className} size={size} />;
  }
};

export default IconRenderer;
