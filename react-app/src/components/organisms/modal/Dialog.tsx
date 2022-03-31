import { ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { dialogState } from '../../../recoil/modal';
import { dialogDefaultProps } from '../../../types/index';
import { Dialog as MDialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
type Props = {};
export default function Dialog({}: Props) {
  const router = useRouter();
  const [dialog, setDialog] = useRecoilState(dialogState);
  const onClose = (e: any) => {
    e.stopPropagation();
    setDialog({ ...dialog, open: false });
  };
  const open = dialog.open;
  const title = dialog.title;
  const content = dialog.content;
  const cancel = dialog.cancel;
  const cancelTitle = cancel.title;
  const cancelDiabled = cancel.disabled;
  const onCancelClick = cancel.onClick;
  const confirm = dialog.confirm;
  const confirmTitle = confirm.title;
  const onConfirmClick = confirm.onClick;
  const dialogOpen = open && dialog.pathname === router.asPath;
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setDialog({ ...dialogDefaultProps, value: dialog.value });
      }, 150);
    }
  }, [open]);
  const onCancel = (e: any) => {
    onClose(e);
    onCancelClick();
  };
  const onConfirm = (e: any) => {
    onClose(e);
    onConfirmClick();
    if (dialog.form) {
      dialog.confirm.onConfirm(Number(dialog.value));
      setDialog({ ...dialog, open: false, value: '' });
    }
  };
  return (
    <MDialog
      open={dialogOpen}
      onClose={(event: any, reason: any) => {
        if (dialog.backDisable) {
          onCancel(event);
        } else if (reason !== 'backdropClick') {
          onCancel(event);
        }
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll={'paper'}
      sx={{
        ...dialog.sx,
        position: 'fixed',
        zIndex: 9999999,
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '360px',
        },
        '& .MuiTextField-root': {
          zIndex: 1,
        },
      }}
    >
      {title !== '' ? <DialogTitle sx={{ fontWeight: '700' }}>{title}</DialogTitle> : null}
      <DialogContent>
        <DialogContentText sx={{ fontWeight: '400' }}>{content}</DialogContentText>
        {dialog.form && (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="마신 물 (ml)"
            // type="number"
            fullWidth
            variant="standard"
            defaultValue={dialog.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setDialog({ ...dialog, value: e.target.value });
            }}
          />
        )}
        {dialog.children}
      </DialogContent>
      <DialogActions>
        {cancel.show ? (
          <Button variant="text" size="small" onClick={onCancel} sx={cancelDiabled ? { color: 'gray' } : {}}>
            {cancelTitle}
          </Button>
        ) : null}
        <Button variant="text" size="small" onClick={onConfirm}>
          {confirmTitle}
        </Button>
      </DialogActions>
    </MDialog>
  );
}

Dialog.defaultProps = {};
