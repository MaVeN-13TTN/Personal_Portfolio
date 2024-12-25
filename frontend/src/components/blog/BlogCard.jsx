import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Clock, Tag, Calendar } from 'lucide-react';
import TimeAgo from '../common/TimeAgo';

const BlogCard = ({ post }) => {
  return (
    <article className="bg-persian-indigo rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.slug}`} className="block">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h2 
            className="text-2xl font-titan text-orange-peel mb-2"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p 
            className="text-gray-300 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className="flex flex-col gap-3 text-sm text-gray-400 mt-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="flex-shrink-0" />
              <TimeAgo date={post.publishedDate} className="line-clamp-1" />
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="flex-shrink-0" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-russian-violet text-gray-300 hover:bg-tekhelet transition-colors"
                >
                  <Tag size={12} />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    featuredImage: PropTypes.string,
    publishedDate: PropTypes.string.isRequired,
    readingTime: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default BlogCard;
