import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function WalletBalance({ balance, onOpenAddIncome }) {
  return (
    <Box
      sx={{
        bgcolor: 'grey.700',
        borderRadius: 2,
        p: { xs: 2, sm: 4, md: 6 },
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        mx: 'auto',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
        }}
      >
        Wallet Balance:{' '}
        <Box component="span" color="limegreen">
          {`₹${balance}`}
        </Box>
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={onOpenAddIncome}
        sx={{
          borderRadius: '50px',
          px: { xs: 2, sm: 3 },
          fontWeight: 'bold',
          fontSize: { xs: '0.8rem', sm: '1rem' },
        }}
        type="button"
      >
        + Add Income
      </Button>
    </Box>
  );
}
