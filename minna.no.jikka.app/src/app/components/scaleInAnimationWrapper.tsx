import React from 'react';
import { useInView } from 'react-intersection-observer';

interface ScaleInAnimationWrapperProps {
    children: React.ReactNode;
}

const ScaleInAnimationWrapper: React.FC<ScaleInAnimationWrapperProps> = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    let animation = 'animate-scale-in-center';
    const combinedClass = `${inView ? animation: 'opacity-0'}`;

    return (
        <div ref={ref} className={combinedClass}>
            {children}
        </div>
    );
};

export default ScaleInAnimationWrapper;