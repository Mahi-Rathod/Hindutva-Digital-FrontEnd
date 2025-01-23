import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsap = (animations, dependencies = []) => {
    useEffect(() => {
        const ctx = gsap.context(() => {
            animations();
        });

        return () => ctx.revert();
    }, dependencies);
};

export default useGsap;
