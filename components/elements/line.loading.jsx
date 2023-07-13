import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";

const CurcularProgressbar = ({ value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={10}
        variant="determinate"
        sx={{ color: "white" }}
        value={value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          sx={{
            fontSize: 10
          }}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CurcularProgressbar;
