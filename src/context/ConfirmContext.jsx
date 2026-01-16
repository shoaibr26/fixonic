import { createContext, useContext, useState, useCallback } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';

const ConfirmContext = createContext(null);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};

export const ConfirmProvider = ({ children }) => {
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', resolver: null });

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        title,
        message,
        resolver: resolve
      });
    });
  }, []);

  const handleConfirm = () => {
    if (dialog.resolver) dialog.resolver(true);
    setDialog({ ...dialog, isOpen: false, resolver: null });
  };

  const handleCancel = () => {
    if (dialog.resolver) dialog.resolver(false);
    setDialog({ ...dialog, isOpen: false, resolver: null });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};
