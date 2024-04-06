import * as React from 'react';
import { Chip, Stack } from '@mui/material/';

interface getTaggingChips {
  getTaggingChips: (
    tags: string[],
    label: string,
    variant: "filled" | "outlined" | "default"
  ) => JSX.Element
}

export const getTaggingChips: getTaggingChips = {
  getTaggingChips: (tags, label, variant): JSX.Element => {
    return (
      <Stack direction="row" spacing={1}>
        {tags.map((tag, index) => {
          return <Chip key={index} label={tag} variant={variant} />
        })}
      </Stack>
    )
  }
}