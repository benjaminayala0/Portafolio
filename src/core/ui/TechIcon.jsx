import React from 'react';

const TechIcon = ({ slug, name }) => {
    if (!slug) return null;

    const getIconUrl = (s) => `https://cdn.simpleicons.org/${s}`;

    return (
        <span className="w-0 opacity-0 overflow-hidden group-hover/item:w-5 group-hover/item:mr-2 group-hover/item:opacity-100 transition-all duration-300 flex items-center justify-center">
            <img
                src={getIconUrl(slug)}
                alt={`${name} logo`}
                className="w-5 h-5 object-contain"
                loading="lazy"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </span>
    );
};

export default TechIcon;
