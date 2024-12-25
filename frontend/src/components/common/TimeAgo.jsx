import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow, parseISO, format } from 'date-fns';

const TimeAgo = ({ 
  date, 
  className = '' 
}) => {
  const [timeAgo, setTimeAgo] = useState('');
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(parsedDate, { addSuffix: true }));
    };

    updateTimeAgo();
    // Update every minute for recent posts, every hour for older ones
    const interval = setInterval(updateTimeAgo, 
      timeAgo.includes('minute') ? 60000 : 3600000
    );

    return () => clearInterval(interval);
  }, [date, timeAgo, parsedDate]);

  const formattedDate = format(parsedDate, "EEEE, do MMMM yyyy");

  return (
    <time 
      dateTime={typeof date === 'string' ? date : date.toISOString()} 
      className={className}
      title={format(parsedDate, 'PPpp')} // Shows full date and time on hover
    >
      {formattedDate}, {timeAgo}
    </time>
  );
};

TimeAgo.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  className: PropTypes.string
};

export default TimeAgo;
