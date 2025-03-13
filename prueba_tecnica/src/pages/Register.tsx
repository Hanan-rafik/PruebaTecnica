import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Link, Paper } from '@mui/material';
import { fakeRegister } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await fakeRegister(data.email, data.password);
      alert('Registro exitoso. Inicia sesión.');
      navigate('/login');
    } catch (error) {
      alert('El usuario ya existe');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-500 to-teal-700">
      <Paper elevation={6} className="p-8 w-full max-w-md bg-white rounded-2xl shadow-lg">
        <Typography variant="h4" className="text-center text-green-600 font-bold">
          Registro
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
            {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            {...register('confirmPassword', { required: 'Confirma tu contraseña' })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="contained" color="success" fullWidth className="py-3 text-lg transition-transform transform hover:scale-105">
            Registrarse
          </Button>
        </form>
        <Box className="mt-6 text-center">
          <Typography variant="body2">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" underline="hover" className="text-green-500 hover:text-green-700">
              Inicia Sesión
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default Register;
