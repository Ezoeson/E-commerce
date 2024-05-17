import React from 'react';
import { FiMoon } from 'react-icons/fi';

function Switch() {
  return (
    <div variant='outline-success' className='w-[70px]  p-2 mx-2 text-white '>
      <FiMoon />{' '} DarkMode
    </div>
  );
}

export default Switch;
