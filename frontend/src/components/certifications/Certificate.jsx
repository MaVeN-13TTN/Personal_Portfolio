import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { getSecureUrl, isValidUrl } from "../../utils/imageUtils";

const Certificate = ({ certification, directUrl, verificationUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    retryCount.current = 0;
  }, []);

  const handleError = useCallback(() => {
    if (retryCount.current < maxRetries) {
      retryCount.current += 1;
      setIframeKey((prev) => prev + 1);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [maxRetries]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    retryCount.current = 0;
    setIframeKey((prev) => prev + 1);
  }, []);

  const handleVerify = useCallback(() => {
    if (verificationUrl) {
      window.open(verificationUrl, "_blank", "noopener,noreferrer");
    }
  }, [verificationUrl]);

  if (!directUrl || !isValidUrl(directUrl)) {
    return (
      <div className="aspect-video relative bg-gray-100 rounded-t-lg flex items-center justify-center">
        <p className="text-red-500">Invalid certificate URL</p>
      </div>
    );
  }

  const secureUrl = getSecureUrl(directUrl);

  return (
    <div className="aspect-video relative bg-gray-100 rounded-t-lg">
      {verificationUrl && (
        <button
          onClick={handleVerify}
          className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors group"
          title="Verify Certificate"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-persian-indigo group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      )}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-50"
          >
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-persian-indigo" />
              <p className="mt-2 text-sm text-gray-600">
                Loading certificate...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-50"
          >
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">Failed to load certificate</p>
              <div className="space-y-2">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-persian-indigo text-white rounded hover:bg-persian-indigo/90 transition-colors"
                >
                  Retry
                </button>
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-persian-indigo hover:underline"
                >
                  Open in new tab
                </a>
                {verificationUrl && (
                  <button
                    onClick={handleVerify}
                    className="block w-full px-4 py-2 bg-persian-indigo/20 text-persian-indigo rounded hover:bg-persian-indigo/30 transition-colors"
                  >
                    Verify Certificate
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {secureUrl && (
        <iframe
          key={iframeKey}
          ref={iframeRef}
          src={secureUrl}
          className={`w-full h-full border-none rounded-t-lg transition-opacity duration-300 ${
            isLoading || hasError ? "opacity-0" : "opacity-100"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          title={`${certification.name} certificate from ${certification.issuer}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="autoplay"
          aria-label={certification.name}
        />
      )}
    </div>
  );
};

Certificate.propTypes = {
  certification: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
  }).isRequired,
  directUrl: PropTypes.string.isRequired,
  verificationUrl: PropTypes.string,
};

export default Certificate;
