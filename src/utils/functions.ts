export const getSafeImageUrl = (url: string, fallback: string) => {
  if (!url || typeof url !== 'string') return fallback;

  const trimmedUrl = url.trim();
  if (
    !trimmedUrl ||
    trimmedUrl === 'null' ||
    trimmedUrl === 'undefined' ||
    trimmedUrl === 'false' ||
    trimmedUrl === 'true'
  ) {
    return fallback;
  }
  const validImagePatterns = [
    /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml|bmp|tiff);base64,[a-zA-Z0-9+/]+={0,2}$/,
    /^https?:\/\/.+\.(jpeg|jpg|png|gif|webp|svg|bmp|tiff)(\?.*)?$/i,
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
    /^\.?\.?\/[^\s]+\.(jpeg|jpg|png|gif|webp|svg|bmp|tiff)(\?.*)?$/i,
    /^\.?\.?\/[^\s]*$/,
  ];
  const isValid = validImagePatterns.some((pattern) => pattern.test(trimmedUrl));

  return isValid ? trimmedUrl : fallback;
};
