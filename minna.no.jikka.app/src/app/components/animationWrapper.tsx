import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimationWrapperProps {
    children: React.ReactNode;
    animationType?: string;
    additionalClass?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ children, animationType, additionalClass }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    let animation = 'animate-fade-up';
    if (animationType != 'fade-up') {
        animation = 'animate-' + animationType;
    }
    const combinedClass = `${inView ? animation: 'opacity-0'} ${additionalClass}`;

    return (
        <div ref={ref} className={combinedClass}>
            {children}
        </div>
    );
};

export default AnimationWrapper;