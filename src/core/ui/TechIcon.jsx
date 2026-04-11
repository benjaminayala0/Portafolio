import React from 'react';

const TechIcon = ({ slug, name }) => {
    if (!slug) return null;

    const getIconUrl = (s) => `https://cdn.simpleicons.org/${s}`;

    return (
        <span className="inline-flex items-center justify-center w-5 h-5 mx-1 transition-transform duration-300 group-hover/item:scale-110">
            <img 
                src={getIconUrl(slug)}
                alt={`${name} logo`}
                className="w-[18px] h-[18px] object-contain grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300 invert brightness-200 group-hover/item:invert-0 group-hover/item:brightness-100"
                loading="lazy"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </span>
    );
};

export default TechIcon;
