import React, { useEffect, useState } from 'react';
import RotatingLoader from './RotatingLoader';
import { UPHeaderFullline } from '../../Pages/StartPrinting/StartPrintingComponents/Dropfile/Dropfileelements';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  return loading ? (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #1d1f2b 0%, #1a1a1a 100%)',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Adjust the z-index as needed
      }}
    >
        <UPHeaderFullline>Loading</UPHeaderFullline>
      <RotatingLoader/>
    </div>
  ) : null;
};

export default SplashScreen;
