import { Box, Chip } from "@mui/material";
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
        backgroundColor: isActive ? 'black' : 'transparent',
        color: isActive ? 'white' : 'black',
        border: '1px solid black'
      }}
    />
  );
};export default Filter;