import React from 'react';
import clsx from 'clsx'; // A small, essential utility for building class strings

/**
 * Defines the strict, type-safe props for the Container component.
 */
export interface ContainerProps {
  /** The content to be rendered inside the container. This is required. */
  children: React.ReactNode;
  
  /** Optional: Additional Tailwind or custom CSS classes to be appended to the container's default classes. */
  className?: string;
  
  /** * Optional: If true, the container spans 100% width (fluid) and removes max-width constraints. 
   * Default is false (standard responsive container). 
   */
  fluid?: boolean;
}

/**
 * A responsive layout wrapper that centers content and applies responsive max-widths
 * (e.g., max-w-7xl) unless the 'fluid' prop is set to true.
 * * NOTE: Exported as default to resolve potential module import issues in environments 
 * that expect a default export for the main file component.
 */
const Container: React.FC<ContainerProps> = ({ 
  children, 
  className, 
  fluid = false 
}) => {
  
  // Use clsx to conditionally combine default and user-provided classes.
  const containerClasses = clsx(
    // Base Class: Ensure it takes full width of its parent and applies horizontal padding (gutter).
    'w-full px-4', 
    
    // Conditional Classes: Apply standard responsive container behavior only if NOT fluid.
    {
      // 'container' applies the responsive max-width at breakpoints (sm:max-w-*, md:max-w-*, etc.)
      // 'mx-auto' centers the container horizontally.
      'container mx-auto': !fluid, 
    },
    
    // Apply any user-defined classes last to allow overriding defaults.
    className 
  );
  
  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

// We export the component as default for easy integration in various environments,
// particularly when the file is the main entry point.
export default Container;