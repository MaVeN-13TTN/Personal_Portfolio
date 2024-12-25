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
  Twitter,
  Facebook,
  Linkedin,
  ArrowLeft
} from 'lucide-react';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shareUrl = window.location.href;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/posts/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch post');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl text-orange-peel">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl text-orange-peel">Post not found</div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/blog"
        className="inline-flex items-center text-orange-peel hover:text-princeton-orange mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2" />
        Back to Blog
      </Link>

      {post.featuredImage && (
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-titan text-orange-peel mb-6">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-8">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <time dateTime={post.publishedDate}>
            {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
          </time>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{post.readingTime} min read</span>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <Link
              key={tag}
              to={`/blog/tag/${tag}`}
              className="flex items-center gap-1 text-sm bg-russian-violet px-3 py-1 rounded-full hover:bg-tekhelet transition-colors"
            >
              <Tag size={14} />
              {tag}
            </Link>
          ))}
        </div>
      )}

      <div className="prose prose-invert prose-orange max-w-none mb-8">
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

      <div className="flex items-center gap-4 border-t border-persian-indigo pt-8">
        <span className="text-gray-300 flex items-center gap-2">
          <Share2 size={20} />
          Share this post:
        </span>
        <div className="flex gap-2">
          <TwitterShareButton url={shareUrl} title={post.title}>
            <Twitter className="w-8 h-8 p-1.5 text-gray-300 hover:text-orange-peel transition-colors" />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <Facebook className="w-8 h-8 p-1.5 text-gray-300 hover:text-orange-peel transition-colors" />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl} title={post.title}>
            <Linkedin className="w-8 h-8 p-1.5 text-gray-300 hover:text-orange-peel transition-colors" />
          </LinkedinShareButton>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
