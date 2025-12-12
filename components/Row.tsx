// components/Row.tsx
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    around?: boolean;
    between?: boolean;
    bottom?: boolean;
    center?: boolean;
    end?: boolean;
    middle?: boolean;
    start?: boolean;
    top?: boolean;
    className?: string;
    tag?: React.ElementType;
    children: ReactNode;
    gutter?: boolean; // new prop to apply negative margins
}

const Row: React.FC<RowProps> = ({
    around,
    between,
    bottom,
    center,
    end,
    middle,
    start,
    top,
    className,
    tag: Tag = 'div',
    children,
    gutter = true,
    ...rest
}) => {
    const classes = classNames(
        'flex flex-wrap', // base row styles
        gutter && '-mx-4', // negative margin to offset col padding
        end && 'justify-end',
        start && 'justify-start',
        center && 'justify-center',
        between && 'justify-between',
        around && 'justify-around',
        top && 'items-start',
        middle && 'items-center',
        bottom && 'items-end',
        className
    );

    return (
        <Tag data-test="row" className={classes} {...rest}>
            {children}
        </Tag>
    );
};

export default Row;
