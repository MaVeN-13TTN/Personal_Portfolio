import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tag, Folder, Search } from 'lucide-react';

const BlogSidebar = ({ 
  onSearch, 
  onCategoryClick, 
  onTagClick, 
  activeCategory = null, 
  activeTag = null,
  currentSearch = '' 
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState(currentSearch || '');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/blog/categories'),
          fetch('/api/blog/tags')
        ]);

        if (!categoriesRes.ok || !tagsRes.ok) {
          throw new Error('Failed to fetch sidebar data');
        }

        const [categoriesData, tagsData] = await Promise.all([
          categoriesRes.json(),
          tagsRes.json()
        ]);

        setCategories(categoriesData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        setCategories([]);
        setTags([]);
      }
    };

    fetchData();
  }, []);

  // Update local search term when currentSearch prop changes
  useEffect(() => {
    setSearchTerm(currentSearch || '');
  }, [currentSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedTerm = (searchTerm || '').trim();
    onSearch(trimmedTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setSearchTerm(value);
    if (!value.trim()) {
      onSearch('');
    }
  };

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-persian-indigo rounded-lg p-4">
        <h2 className="text-xl font-titan text-orange-peel mb-4">Search</h2>
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchTerm || ''}
            onChange={handleSearchChange}
            placeholder="Search posts..."
            className="w-full bg-russian-violet text-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-peel"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-peel"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      {/* Categories */}
      <div className="bg-persian-indigo rounded-lg p-4">
        <h2 className="text-xl font-titan text-orange-peel mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryClick(category === activeCategory ? null : category)}
                className={`flex items-center gap-2 w-full py-1 px-2 rounded transition-colors ${
                  category === activeCategory
                    ? 'bg-russian-violet text-orange-peel'
                    : 'text-gray-300 hover:text-orange-peel'
                }`}
              >
                <Folder size={16} />
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="bg-persian-indigo rounded-lg p-4">
        <h2 className="text-xl font-titan text-orange-peel mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag === activeTag ? null : tag)}
              className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-colors ${
                tag === activeTag
                  ? 'bg-russian-violet text-orange-peel'
                  : 'bg-russian-violet text-gray-300 hover:text-orange-peel'
              }`}
            >
              <Tag size={14} />
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

BlogSidebar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  activeCategory: PropTypes.string,
  activeTag: PropTypes.string,
  currentSearch: PropTypes.string
};

export default BlogSidebar;
