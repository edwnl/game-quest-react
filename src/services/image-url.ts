import noImage from "../assets/no-image-placeholder.webp";

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage; // TODO: Handle missing images properly
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  // Crop to 600x400
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
