import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import {useContext} from 'react';

import { Context } from '../context/Context.js';

import { useForm } from 'react-hook-form';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const { handleUpdateUser } = useContext(Context);

  const { register, handleSubmit, setError } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateUser = async (data) => {
    const userData = {
      "id": data.id,
      "nickname": data.nickname,
      "about": data.about,
      "email": data.email
    }

    console.log(userData)

    await handleUpdateUser(userData)
      .catch(response => {
        setError('apiError', {message: response.error});
      });

  }


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Editar usuário
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(updateUser)}>
            <input type="number" name="id" defaultValue={props.user.id} {...register('id')} hidden/>
            <input type="text" name="nickname" defaultValue={props.user.nickname} {...register('nickname')}/>
            <input type="email" name="email" defaultValue={props.user.email} {...register('email')}/>
            <textarea name="about" defaultValue={props.user.about} {...register('about')}/>
            <DialogActions>
              <Button type="submit" onClick={handleClose}>
                Atualizar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
