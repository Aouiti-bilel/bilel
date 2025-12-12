// components/Col.tsx
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    /** General size (like Bootstrap `col`) */
    size?: number | string;
    /** Extra small columns (xs) */
    xs?: number | string;
    /** Small columns (sm) */
    sm?: number | string;
    /** Medium columns (md) */
    md?: number | string;
    /** Large columns (lg) */
    lg?: number | string;
    /** Extra large columns (xl) */
    xl?: number | string;
    /** Vertical alignment top */
    top?: boolean;
    /** Vertical alignment middle */
    middle?: boolean;
    /** Vertical alignment bottom */
    bottom?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** HTML tag to render */
    tag?: React.ElementType;
    children: ReactNode;
}

const Col: React.FC<ColProps> = ({
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    top,
    middle,
    bottom,
    className,
    tag: Tag = 'div',
    children,
    ...rest
}) => {
    // Map props to Tailwind width classes
    const widthClasses = classNames(
        size ? `w-${(size as number) * 1 / 12 * 100}%` : '',
        xs ? `w-[${(xs as number) * 1 / 12 * 100}%] sm:w-[${(xs as number) * 1 / 12 * 100}%]` : '',
        sm ? `sm:w-[${(sm as number) * 1 / 12 * 100}%]` : '',
        md ? `md:w-[${(md as number) * 1 / 12 * 100}%]` : '',
        lg ? `lg:w-[${(lg as number) * 1 / 12 * 100}%]` : '',
        xl ? `xl:w-[${(xl as number) * 1 / 12 * 100}%]` : ''
    );

    const alignmentClasses = classNames(
        top && 'self-start',
        middle && 'self-center',
        bottom && 'self-end'
    );

    const classes = classNames('px-4', widthClasses, alignmentClasses, className);

    return (
        <Tag data-test="col" className={classes} {...rest}>
            {children}
        </Tag>
    );
};

export default Col;
