import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { fakeLogin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fakeLogin(data.email, data.password);
      login((response as { token: string }).token);
      navigate('/');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700">
      <Paper elevation={6} className="p-8 w-full max-w-md bg-white rounded-2xl shadow-lg">
        <Typography variant="h4" className="text-center text-blue-600 font-bold">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email no válido' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            {...register('password', { required: 'Contraseña es requerida' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className="py-3 text-lg transition-transform transform hover:scale-105">
            Iniciar Sesión
          </Button>
        </form>
        <Box className="mt-6 text-center">
          <Typography variant="body2">
            ¿No tienes cuenta?{' '}
            <Link href="/register" underline="hover" className="text-blue-500 hover:text-blue-700">
              Regístrate
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
