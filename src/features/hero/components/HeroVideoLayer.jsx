import React from 'react';
import { motion } from 'framer-motion';

/**
 * @typedef {Object} HeroVideoLayerProps
 * @property {React.RefObject<HTMLVideoElement>} videoRef
 * @property {React.RefObject<HTMLCanvasElement>} [canvasRef]
 * @property {string} videoSrc
 * @property {import("framer-motion").MotionValue<number>} canvasOpacity
 * @property {boolean} hasError
 * @property {boolean} [isMobile]
 * @property {boolean} [showCanvas] - When true, hides video and shows the canvas layer
 */

/** @param {HeroVideoLayerProps} props */
export const HeroVideoLayer = ({ 
    videoRef, 
    canvasRef, 
    videoSrc, 
    canvasOpacity, 
    hasError, 
    isMobile = false, 
    showCanvas = false 
}) => {
    return (
        <motion.div
            className="absolute inset-y-0 left-0 w-full md:w-[50%] z-0 bg-surface"
            style={{ opacity: canvasOpacity }}
            aria-hidden="true"
        >
            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-text-secondary/50 font-mono text-center max-w-sm px-6">
                        [DEV]: GPU error or limit reached. Video unavailable at {videoSrc}
                    </div>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        poster={videoSrc.replace('.mp4', '-poster.jpg')}
                        preload="auto"
                        muted
                        playsInline
                        disablePictureInPicture
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ 
                            objectPosition: 'center 80%', 
                            willChange: 'transform',
                            opacity: (isMobile && showCanvas) ? 0 : 1,
                        }}
                    />

                    {isMobile && (
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full"
                            style={{
                                opacity: showCanvas ? 1 : 0,
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                </>
            )}

            <div className="hidden md:block absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-surface to-transparent pointer-events-none" />
            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent pointer-events-none" />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(13,17,23,0.5) 100%)' }}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        </motion.div>
    );
};
