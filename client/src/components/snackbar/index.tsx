import { forwardRef } from 'react';
import { Alert as MuiAlert, AlertProps, Snackbar } from '@mui/material';

interface SnackbarAlertProps {
    text: string | null;
    severity: 'success' | 'error';
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarAlert = ({ text, open, setOpen, severity }: SnackbarAlertProps) => {
    const onClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={onClose}
            >
                <Alert
                    onClose={onClose}
                    severity={severity}
                    sx={{ fontFamily: 'inherit', fontSize: '1.3rem', fontWeight: 500 }}
                    color={severity === 'success' ? 'info' : 'error'}
                >
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SnackbarAlert;
