import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
      <CircularProgress />
    </div>
  );
}

export default Loader;
