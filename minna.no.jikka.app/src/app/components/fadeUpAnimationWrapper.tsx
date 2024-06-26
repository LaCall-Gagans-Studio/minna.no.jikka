import React from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeUpAnimationWrapperProps {
    children: React.ReactNode;
    additionalClass?: string;
}

const FadeUpAnimationWrapper: React.FC<FadeUpAnimationWrapperProps> = ({ children, additionalClass }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    let animation = 'animate-fade-up';
    const combinedClass = `${inView ? animation: 'opacity-0'} ${additionalClass}`;

    return (
        <div ref={ref} className={combinedClass}>
            {children}
        </div>
    );
};

export default FadeUpAnimationWrapper;