import { useState } from 'react';
import { ThumbsUp, Heart, Hand } from 'lucide-react';
import PropTypes from 'prop-types';

const EngagementIcons = ({ postId, initialCounts = { likes: 0, claps: 0, hearts: 0 } }) => {
  const [counts, setCounts] = useState(initialCounts);
  const [userEngagement, setUserEngagement] = useState({
    liked: false,
    clapped: false,
    hearted: false
  });
  const [isAnimating, setIsAnimating] = useState({
    likes: false,
    claps: false,
    hearts: false
  });

  const handleEngagement = async (type) => {
    const action = userEngagement[type] ? 'remove' : 'add';

    try {
      const response = await fetch(`/api/blog/posts/${postId}/engage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, action })
      });

      if (!response.ok) throw new Error('Failed to register engagement');

      const data = await response.json();
      setCounts(data.counts);
      setUserEngagement(prev => ({ ...prev, [type]: !prev[type] }));
      
      if (action === 'add') {
        // Trigger animation only when adding engagement
        setIsAnimating(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
          setIsAnimating(prev => ({ ...prev, [type]: false }));
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating engagement:', error);
    }
  };

  const engagementButtons = [
    {
      type: 'liked',
      icon: ThumbsUp,
      count: counts.likes,
      label: 'Like',
      activeColor: 'text-blue-500',
      hoverColor: 'hover:text-blue-400'
    },
    {
      type: 'clapped',
      icon: Hand,
      count: counts.claps,
      label: 'Clap',
      activeColor: 'text-green-500',
      hoverColor: 'hover:text-green-400'
    },
    {
      type: 'hearted',
      icon: Heart,
      count: counts.hearts,
      label: 'Heart',
      activeColor: 'text-red-500',
      hoverColor: 'hover:text-red-400'
    }
  ];

  return (
    <div className="flex items-center gap-6">
      {engagementButtons.map(({ type, icon: Icon, count, label, activeColor, hoverColor }) => (
        <button
          key={type}
          onClick={() => handleEngagement(type)}
          className={`flex flex-col items-center gap-1 transition-all ${
            userEngagement[type] ? activeColor : 'text-gray-400'
          } ${!userEngagement[type] && hoverColor}`}
          title={userEngagement[type] ? `Remove ${label}` : `Add ${label}`}
        >
          <div className="relative">
            <Icon
              size={24}
              className={`transition-transform ${
                isAnimating[type] ? 'animate-engagement' : ''
              }`}
              fill={userEngagement[type] ? 'currentColor' : 'none'}
            />
            {isAnimating[type] && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-full animate-ping" />
            )}
          </div>
          <span className="text-sm font-medium">
            {count > 0 ? count : label}
          </span>
        </button>
      ))}
    </div>
  );
};

EngagementIcons.propTypes = {
  postId: PropTypes.string.isRequired,
  initialCounts: PropTypes.shape({
    likes: PropTypes.number,
    claps: PropTypes.number,
    hearts: PropTypes.number
  })
};

export default EngagementIcons;
