const getAvatarSrc = (avatarPath: string | null): string => {
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
          
    if (!avatarPath) return `${base}/uploads/avatars/default-avatar.png`;
          
    if (avatarPath.startsWith('http')) return avatarPath.trim();
          
    const cleanPath = avatarPath.replace(/^.*[\\\/]/, '').trim();
          
    return `${base}/uploads/avatars/${cleanPath}`;
  };
  
  export default getAvatarSrc;