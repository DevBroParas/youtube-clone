'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/lib/services/userService';

interface SubscribeButtonProps {
  channelId: string; // The ID of the channel (user) who owns the video
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ channelId }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch subscription status when the component mounts
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const subscriptions = await userService.getSubscriptions();
        setIsSubscribed(subscriptions.some((channel) => channel.id === channelId));
      } catch (error: any) {
        console.error('Error fetching subscription status:', error.response?.data?.message || error.message);
      }
    };

    fetchSubscriptionStatus();
  }, [channelId]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      if (isSubscribed) {
        await userService.unsubscribe(channelId);
        setIsSubscribed(false);
      } else {
        await userService.subscribe(channelId);
        setIsSubscribed(true);
      }
    } catch (error: any) {
      console.error('Error updating subscription:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={`px-4 py-2 rounded ${
        isSubscribed ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {loading ? 'Loading...' : isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;