import React from 'react';

function Header({ sortType, setSortType }) {
  return (
    <>
      <div className='fixed top-0 left-0 bg-dark-background w-full p-4 flex flex-col items-start gap-4'>
        <h3 className="text-xl font-bold text-light-text">VibeSphere</h3>
        <div className='flex gap-4'>
          <p
            className={`border-2 border-dark-surface px-4 py-1 rounded-[20px] cursor-pointer ${
              sortType === 'new' ? 'bg-dark-surface' : ''
            }`}
            onClick={() => setSortType('new')} // Add click handler to set the sort type
          >
            New
          </p>
          <p
            className={`border-2 border-dark-surface px-4 py-1 rounded-[20px] cursor-pointer ${
              sortType === 'hot' ? 'bg-dark-surface' : ''
            }`}
            onClick={() => setSortType('hot')} // Add click handler to set the sort type
          >
            Hot
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
