import { useState, useEffect } from 'react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?';

export const useDecryptEffect = (targetText, delay = 0, duration = 1500) => {
    const [displayText, setDisplayText] = useState('');
    const [isDecrypting, setIsDecrypting] = useState(false);

    useEffect(() => {
        let startTime;
        let animationFrame;
        let hasStarted = false;

        const animate = (timestamp) => {
            // Manage initial delay
            if (!startTime && timestamp) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;

            if (elapsed < delay) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            if (!hasStarted) {
                hasStarted = true;
                setIsDecrypting(true);
            }

            const activeElapsed = elapsed - delay;
            // Progress from 0 to 1
            const progress = Math.min(activeElapsed / duration, 1);

            // Calculate how many characters of the *target string* should be revealed
            const revealCount = Math.floor(progress * targetText.length);

            let currentText = '';
            for (let i = 0; i < targetText.length; i++) {
                if (i < revealCount) {
                    // Revealed original character
                    currentText += targetText[i];
                } else if (targetText[i] === ' ') {
                    // Keep spaces intact to avoid Layout Shifts
                    currentText += ' ';
                } else {
                    // Random character for unrevealed portion
                    currentText += characters[Math.floor(Math.random() * characters.length)];
                }
            }

            setDisplayText(currentText);

            // Continue animation if not reached 100%
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Ensure exact target text at the end
                setDisplayText(targetText);
                setIsDecrypting(false);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [targetText, delay, duration]);

    return { displayText, isDecrypting };
};
