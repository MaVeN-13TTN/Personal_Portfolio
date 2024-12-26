import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  ArrowLeft
} from 'lucide-react';
import ShareModal from '../common/ShareModal';
import EngagementIcons from './EngagementIcons';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts/${slug}`);
        if (!response.ok) throw new Error('Post not found');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!post) return null;

  const currentUrl = window.location.href;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-orange-peel hover:text-orange-peel/80 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Blog
      </Link>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-titan text-orange-peel">{post.title}</h1>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="text-orange-peel hover:text-orange-peel/80 transition-colors flex items-center gap-2"
          aria-label="Share post"
        >
          <Share2 size={20} />
          <span>Share this post</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <time dateTime={post.publishedDate}>
            {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
          </time>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${tag}`}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-russian-violet text-gray-300 hover:bg-tekhelet transition-colors"
            >
              <Tag size={14} />
              {tag}
            </Link>
          ))}
        </div>
      )}

      <div className="prose prose-invert prose-orange max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-8 border-t border-russian-violet pt-6">
        <EngagementIcons 
          postId={post.slug} 
          initialCounts={{
            likes: post.engagement?.likes || 0,
            claps: post.engagement?.claps || 0,
            hearts: post.engagement?.hearts || 0
          }}
        />
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={currentUrl}
        title={post.title}
      />
    </article>
  );
};

export default BlogPost;
