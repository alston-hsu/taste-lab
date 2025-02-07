import { Chip } from "@mui/material";
import React from "react";

type FilterProps = {
  strCategory: string;
  onClick: () => void;
  isActive: boolean;
}

const Filter: React.FC<FilterProps> = ({ strCategory, onClick, isActive }) => {
  return (
    <Chip
      onClick={onClick}
      size="medium"
      label={strCategory}
      sx={{
        backgroundColor: isActive ? 'rgb(0,0,128)' : 'transparent',
        color: isActive ? 'white' : 'black',
        border: '1px solid black',
        borderRadius: '16px',
        boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: isActive ? 'black' : 'transparent',
          transform: 'scale(1.05)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
    />
  );
}
export default Filter;