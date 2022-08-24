import * as React from 'react';
import { Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addNewUserAPI } from '../components/services/index';

export default function UserDialog(props) {
  const { openDialog, setOpenDialog, getAllUser, setContentToast, setSeverity, setOpenToast } = props;
  const [idCardNumber, setIdCardNumber] = React.useState();
  const [name, setName] = React.useState();
  const [address, setAddress] = React.useState();
  const [email, setEmail] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [isError, setIsError] = React.useState(false);

  const addNewUser = async (data) => {
    try {
      const res = await addNewUserAPI(data);
      if (res.status === 200) {
        setIdCardNumber(null);
        setName(null);
        setAddress(null);
        setEmail(null);
        setPhoneNumber(null);
        setContentToast(res?.data);
        setSeverity('success');
        setOpenToast(true);
        setOpenDialog(false);
        getAllUser();
      } else {
        setContentToast('Thêm user thất bại');
        setOpenToast(true);
        setSeverity('error');
      }
    } catch (error) {
      setContentToast('Thêm user thất bại');
      setOpenToast(true);
      setSeverity('error');
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setIdCardNumber(null);
    setName(null);
    setAddress(null);
    setEmail(null);
    setPhoneNumber(null);
  };

  const handleAddUser = () => {
    if (!idCardNumber || !name || !address || !email || !phoneNumber) {
      setIsError(true);
    } else {
      setIsError(false);
      const data = {
        idCardNumber,
        name,
        address,
        email,
        phoneNumber,
        dob: '2000-05-27',
        avatar: '',
      };

      addNewUser(data);
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <TextField
              autoFocus
              id="idCardNumber"
              label="IdCardNumber"
              type="number"
              size="medium"
              sx={{ width: 400, mr: 2 }}
              onChange={(e) => setIdCardNumber(e.target.value)}
              required
            />
            <TextField
              id="demo-helper-text-aligned-no-helper"
              label="Name"
              type="text"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="number"
            variant="outlined"
            sx={{ mt: 2 }}
            fullWidth
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <p
            style={{
              margin: '10px',
              color: 'red',
              fontWeight: 'Bold',
              justifyContent: 'flex-end',
              display: isError ? 'flex' : 'none',
            }}
          >
            Please enter full information
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddUser} type="submit">
            Add user
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
