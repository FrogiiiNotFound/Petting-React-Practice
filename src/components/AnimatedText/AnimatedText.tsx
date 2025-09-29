import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  animationType?: 'fadeUp' | 'scale' | 'rotate' | 'bounce';
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  animationType = 'fadeUp',
  stagger = 0.03,
  duration = 0.6,
  delay = 0,
  className,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const words = text.split(' ');
    element.innerHTML = '';

    const allLetterSpans: HTMLSpanElement[] = [];

    words.forEach((word, wordIndex) => {
      const wordWrapper = document.createElement('span');
      wordWrapper.style.display = 'inline-block';
      wordWrapper.style.whiteSpace = 'nowrap';

      const letters = word.split('').map((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        wordWrapper.appendChild(span);
        return span;
      });

      allLetterSpans.push(...letters);
      element.appendChild(wordWrapper);

      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = '\u00A0';
        spaceSpan.style.display = 'inline-block';
        spaceSpan.style.whiteSpace = 'nowrap';
        element.appendChild(spaceSpan);

        spaceSpan.style.opacity = '0';
        allLetterSpans.push(spaceSpan);
      }
    });

    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
      scale: {
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1 },
      },
      rotate: {
        from: { opacity: 0, rotationY: 90 },
        to: { opacity: 1, rotationY: 0 },
      },
      bounce: {
        from: { opacity: 0, y: -100 },
        to: { opacity: 1, y: 0 },
      },
    };

    const animation = animations[animationType];

    gsap.fromTo(allLetterSpans, animation.from, {
      ...animation.to,
      duration,
      stagger,
      delay,
      ease: 'back.out(1.7)',
    });

    return () => {
      gsap.killTweensOf(allLetterSpans);
    };
  }, [text, animationType, stagger, duration, delay]);

  return (
    <div
      ref={textRef}
      className={className}
      style={{
        textAlign: 'left',
        lineHeight: '1.2',
      }}
    />
  );
};

export default AnimatedText;
