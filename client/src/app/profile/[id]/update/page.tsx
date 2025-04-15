'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UpdateProfilePageProps {
    params: {
        id: string;
    };
}

export default function  UpdateProfilePage({ params }: UpdateProfilePageProps) {
    const { id } = params;
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch current user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
                    { withCredentials: true }
                );
                const userData = response.data.user;
                setUsername(userData.username);
                setAbout(userData.about || '');
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data');
            }
        };

        fetchUserData();
    }, [id]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            // Create preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('about', about);
            if (avatar) {
                formData.append('avatar', avatar);
            }

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                router.push(`/profile/${id}`);
                router.refresh(); // Refresh the page to show updated data
            }
        } catch (error: any) {
            console.error('Error updating profile:', error.response?.data?.message || error.message);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Cleanup preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (avatarPreview) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        About
                    </label>
                    <textarea
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows={4}
                    />
                </div>

                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar
                    </label>
                    {avatarPreview && (
                        <div className="mt-2 mb-2">
                            <Image
                                src={avatarPreview}
                                alt="Avatar preview"
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}