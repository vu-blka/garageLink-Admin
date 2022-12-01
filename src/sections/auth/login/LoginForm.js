import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClick = () => {
    const data = {
      username: userName,
      password,
    };
    async function loginAdmin() {
      const res = await axios.post('http://localhost:5000/api/account/signin', data);
      // console.log(res.data);
      if (res?.status === 200 && res?.data?.role?.roleName !== 'USER') {
        localStorage.setItem('adminInfo', JSON.stringify(res.data));
        navigate('/dashboard/user');
      } else {
        setErrorMsg('Thất bại: Người dùng không đủ quyền đăng nhập');
      }
    }
    loginAdmin();
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          <TextField
            fullWidth
            placeholder="Tài khoản"
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            fullWidth
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // error={Boolean(touched.password && errors.password)}
            // helperText={touched.password && errors.password}
          />
        </Stack>

        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>{errorMsg}</p>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
