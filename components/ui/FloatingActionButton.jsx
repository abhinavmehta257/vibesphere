import React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const FloatingActionButton = ({ onClick, showForm }) => {
  return (
    <button
      className='fixed bottom-[20px] right-[20px] bg-dark-background rounded-full p-3'
      onClick={onClick}
      
    >
      {showForm ? <CloseOutlinedIcon /> : <CreateOutlinedIcon />}
    </button>
  );
};

export default FloatingActionButton;
