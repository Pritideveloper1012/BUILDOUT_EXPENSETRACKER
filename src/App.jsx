import React, { useState } from "react";
import AppContent from "./Components/AppContent"; // adjust path
import AddExpenseModal from "./Components/AddExpenseModal";

const App = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenAddIncome = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDelete = (id) => setExpenses(expenses.filter(e => e.id !== id));
  const handleEdit = (expense) => {
    // Handle edit logic
  };

  return (
    <>
      <AppContent
        balance={balance}
        onOpenAddIncome={handleOpenAddIncome}
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <AddExpenseModal open={openModal} handleClose={handleCloseModal} />
    </>
  );
};

export default App;
