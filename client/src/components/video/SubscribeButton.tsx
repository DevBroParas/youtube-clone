// src/components/SubscribeButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/lib/services/userService';

export default function SubscribeButton({ channelId }: { channelId: string }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriptions = await userService.getSubscriptions();
      setIsSubscribed(subscriptions.some(sub => sub.subscribedTo.id === channelId));
    };
    checkSubscription();
  }, [channelId]);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      if (isSubscribed) {
        await userService.unsubscribe(channelId);
      } else {
        await userService.subscribe(channelId);
      }
      setIsSubscribed(!isSubscribed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={loading}
      className={`px-4 py-2 rounded-lg ${
        isSubscribed ? 'bg-gray-200 text-black' : 'bg-red-600 text-white'
      }`}
    >
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  );
}
