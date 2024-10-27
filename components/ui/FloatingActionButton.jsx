import React from 'react';
import { AccordionDetails, Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      className='fixed bottom-[20px] right-[20px] bg-indigo-600 rounded-full w-[36px] h-[36px]'
      onClick={onClick}
      
    >
      <AccordionDetails/>
    </button>
  );
};

export default FloatingActionButton;
