import { Share2, X, Linkedin, MessageCircle, Mail, Link2, Check } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ShareModal = ({ isOpen, onClose, url, title }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareLinks = [
    {
      name: 'X (Twitter)',
      icon: <X size={24} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'bg-black hover:bg-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'bg-[#0A66C2] hover:bg-[#004182]'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: 'bg-[#25D366] hover:bg-[#1fb855]'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color: 'bg-[#EA4335] hover:bg-[#d33426]'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-persian-indigo rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-orange-peel flex items-center gap-2">
            <Share2 size={24} />
            Share This Post
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} flex items-center justify-center gap-2 p-3 rounded-lg text-white transition-colors`}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-russian-violet text-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-peel"
            />
            <button
              onClick={copyToClipboard}
              className={`${
                copied 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-orange-peel hover:bg-orange-peel/90'
              } text-white p-3 rounded-lg transition-colors flex items-center gap-2`}
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check size={20} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Link2 size={20} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          {copied && (
            <div className="text-sm text-green-400 text-center animate-fade-in">
              Link copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ShareModal;
