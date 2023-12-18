import { useEffect } from 'react';
import { gtm } from '../libs/gtm';

export const usePageView = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
};
