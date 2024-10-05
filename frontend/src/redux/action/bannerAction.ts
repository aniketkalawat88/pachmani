import api from '@/lib/axios';
import { useState, useEffect } from 'react';

interface Carousel {
  desktopUrl: string;
  mobileUrl: string;
  fileId: string;
  url: string;
  // Add other relevant properties here
}

interface FetchCarouselResult {
  carousels: Carousel[];
  loading: boolean;
  error: string | null;
}

const useFetchCarousel = (pageName: string): FetchCarouselResult => {
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`carousel/pages/name/${pageName}`);
        setCarousels(data.page.carousels);
      } catch (error: any) {
        console.error("Failed to fetch data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageName]);

  return { carousels, loading, error };
};

export default useFetchCarousel;
