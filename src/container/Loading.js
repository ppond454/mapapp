import * as React from "react"
import { LinearProgress, Box } from "@mui/material/"

export default function Loading() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="success" />
    </Box>
  )
}
