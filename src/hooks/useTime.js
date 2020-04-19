import { useEffect } from 'react';

export default (shouldTime, callback) => {
  useEffect(() => {
    let interval = null;
    const startTimer = () => {
      interval = setInterval(callback, 1000);
    };

    if (shouldTime) {
      startTimer();
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [shouldTime, callback]);

  return;
};
