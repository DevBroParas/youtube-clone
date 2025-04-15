const getThumbnailSrc = (thumbnailPath: string | null) => {
    if (!thumbnailPath) {
        return '/default-thumbnail.png';
    }

    if (thumbnailPath.startsWith('http')) {
        return thumbnailPath.trim();
    }

    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/thumbnails/${thumbnailPath.replace(/^.*[\\\/]/, '').trim()}`;
};

export default getThumbnailSrc;