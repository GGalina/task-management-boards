export interface IconButtonProps {
  variant: 'edit' | 'delete';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; 
  children?: React.ReactNode;
  icon?: string;
}

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};