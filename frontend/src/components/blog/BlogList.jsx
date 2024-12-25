import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import BlogCard from './BlogCard';
import BlogSidebar from './BlogSidebar';

const BlogList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const search = searchParams.get('search');
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setAllPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filterPosts = (posts) => {
    let filteredPosts = [...posts];

    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter(
        post => post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by tag
    if (tag) {
      filteredPosts = filteredPosts.filter(
        post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Filter by search term
    if (search) {
      const searchTerms = search.toLowerCase().split(' ').filter(term => term);
      filteredPosts = filteredPosts.filter(post => {
        const searchableText = [
          post.title,
          post.excerpt,
          post.content,
          post.category,
          ...post.tags
        ].join(' ').toLowerCase();

        return searchTerms.every(term => searchableText.includes(term));
      });

      // Add highlighting to matching content
      filteredPosts = filteredPosts.map(post => {
        const highlightedPost = { ...post };
        searchTerms.forEach(term => {
          // Highlight title
          highlightedPost.title = highlightText(post.title, term);
          // Highlight excerpt
          highlightedPost.excerpt = highlightText(post.excerpt, term);
        });
        return highlightedPost;
      });
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    return filteredPosts;
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-orange-peel/30 text-gray-100 rounded px-1">$1</mark>');
  };

  const handleSearch = (searchTerm) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (searchTerm) {
        newParams.set('search', searchTerm);
      } else {
        newParams.delete('search');
      }
      newParams.delete('page');
      return newParams;
    });
  };

  const handleCategoryClick = (selectedCategory) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (selectedCategory) {
        newParams.set('category', selectedCategory);
      } else {
        newParams.delete('category');
      }
      newParams.delete('page');
      newParams.delete('tag');
      return newParams;
    });
  };

  const handleTagClick = (selectedTag) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (selectedTag) {
        newParams.set('tag', selectedTag);
      } else {
        newParams.delete('tag');
      }
      newParams.delete('page');
      newParams.delete('category');
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-titan text-orange-peel mb-8">Code, Cloud and Cipher</h1>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-xl text-orange-peel">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-titan text-orange-peel mb-8">Code, Cloud and Cipher</h1>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  const filteredPosts = filterPosts(allPosts);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-titan text-orange-peel">Code, Cloud and Cipher</h1>
        {(category || tag || search) && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-persian-indigo text-gray-300 rounded-lg hover:bg-tekhelet transition-colors"
          >
            <X size={16} />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <BlogSidebar
            onSearch={handleSearch}
            onCategoryClick={handleCategoryClick}
            onTagClick={handleTagClick}
            activeCategory={category}
            activeTag={tag}
            currentSearch={search}
          />
        </div>

        <div className="lg:col-span-3">
          {!currentPosts.length ? (
            <div className="flex flex-col items-center justify-center min-h-[30vh]">
              <div className="text-xl text-orange-peel mb-4">
                {search ? (
                  <>
                    No results found for &quot;{search}&quot;
                    {category && <div className="mt-2 text-base">in category: {category}</div>}
                    {tag && <div className="mt-2 text-base">with tag: {tag}</div>}
                  </>
                ) : category ? (
                  <>No posts found in category: {category}</>
                ) : tag ? (
                  <>No posts found with tag: {tag}</>
                ) : (
                  <>No blog posts available</>
                )}
              </div>
              {(category || tag || search) && (
                <p className="text-gray-400">
                  Try adjusting your search or filters to find what you&apos;re looking for
                </p>
              )}
            </div>
          ) : (
            <>
              {search && (
                <div className="mb-6 text-gray-400">
                  Found {totalPosts} result{totalPosts !== 1 ? 's' : ''} for &quot;{search}&quot;
                  {category && <span className="ml-1">in category: {category}</span>}
                  {tag && <span className="ml-1">with tag: {tag}</span>}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setSearchParams(prev => {
                          const newParams = new URLSearchParams(prev);
                          newParams.set('page', page.toString());
                          return newParams;
                        });
                      }}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-orange-peel text-russian-violet'
                          : 'bg-persian-indigo text-gray-300 hover:bg-tekhelet'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
