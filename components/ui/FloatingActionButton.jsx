import React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      className='fixed bottom-[20px] right-[20px] bg-dark-background rounded-full p-3'
      onClick={onClick}
      
    >
      <CreateOutlinedIcon />
    </button>
  );
};

export default FloatingActionButton;
