import React from 'react';

interface LixeiraProps {
  onClick?: () => void;
}

export const Lixeira: React.FC<LixeiraProps> = ({ onClick }) => {
  return (
    <svg 
      width="18" 
      height="24" 
      viewBox="0 0 18 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className="cursor-pointer hover:opacity-80"
    >
      <path 
        d="M1.5 20.75C1.5 22.125 2.625 23.25 4 23.25H14C15.375 23.25 16.5 22.125 16.5 20.75V8.25C16.5 6.875 15.375 5.75 14 5.75H4C2.625 5.75 1.5 6.875 1.5 8.25V20.75ZM16.5 2H13.375L12.4875 1.1125C12.2625 0.8875 11.9375 0.75 11.6125 0.75H6.3875C6.0625 0.75 5.7375 0.8875 5.5125 1.1125L4.625 2H1.5C0.8125 2 0.25 2.5625 0.25 3.25C0.25 3.9375 0.8125 4.5 1.5 4.5H16.5C17.1875 4.5 17.75 3.9375 17.75 3.25C17.75 2.5625 17.1875 2 16.5 2Z" 
        fill="white"
      />
    </svg>
  );
}