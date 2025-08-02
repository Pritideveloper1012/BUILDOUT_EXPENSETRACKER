import React, { useState } from 'react';
import Modal from 'react-modal';
import { Box, Typography, TextField, Button } from '@mui/material';

Modal.setAppElement('#root');

export default function AddIncomeModal({ open, onClose, onAddIncome }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      alert('Please enter a valid income amount');
      return;
    }
    onAddIncome(numAmount);
    setAmount('');
    onClose();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 1000,
    },
    content: {
      maxWidth: '300px',
      width: '90%', // responsive width
      maxHeight: '200px',
      margin: 'auto',
      borderRadius: '20px',
      padding: '20px',
      backgroundColor: '#1f2937',
      color: 'white',
      inset: '50% auto auto 50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Income Modal"
    >
      <Typography variant="h6" mb={2} textAlign="center">
        Add Income
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
          inputProps={{ min: 1 }}
          sx={{ mb: 3, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} color="inherit" type="button">
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Add Balance
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
