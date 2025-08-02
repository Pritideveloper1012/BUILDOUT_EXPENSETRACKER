import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
  width: "90%",
  maxWidth: "400px",
};

const categories = ["Food", "Travel", "Entertainment"];

export default function AddExpenseModal({ open, handleClose, addExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    addExpense({ title, amount: parseFloat(amount), category });
    handleClose();
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center">
            Add New Expense
          </Typography>

          <TextField
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            required
          />

          {/* Native select for Cypress compatibility */}
          <Box>
            <label
              htmlFor="category"
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Add Expense
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
