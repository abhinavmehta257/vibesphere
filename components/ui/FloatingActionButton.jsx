import React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
const FloatingActionButton = ({ onClick, showForm }) => {
  return (
    <button
      className='fixed bottom-[30px] right-[30px] bg-dark-background rounded-full p-3 shadow-[0px_0px_4px_0px_#04a29f]'
      onClick={onClick}
      
    >
      {showForm ? <CloseOutlinedIcon /> : <CreateOutlinedIcon />}
    </button>
  );
};

export default FloatingActionButton;
