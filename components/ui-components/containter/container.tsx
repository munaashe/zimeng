import React, { MutableRefObject, ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    ref?: MutableRefObject<HTMLDivElement | null>
}

const Container: React.FC<ContainerProps> = ({ children, className = '', ref = null }) => {
    return (
        <div className={`p-4 md:p-8 ${className}`} ref={ref}>
            {children}
        </div>
    );
};

export default Container;