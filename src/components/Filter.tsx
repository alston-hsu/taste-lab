import { Box, Chip } from "@mui/material";
import React from "react";

type FilterProps = {
  strCategory: string;
  onClick: () => void;
}

const Filter: React.FC<FilterProps> = ({ strCategory, onClick }) => {
  return (
    <Chip
      onClick={onClick}
      size="medium"
      label={strCategory}
      sx={{
        backgroundColor: 'transparent',
        border: '1px solid grey',
      }}
    />
  );
};
export default Filter;