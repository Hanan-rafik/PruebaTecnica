import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
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
      alert('Registro exitoso. Por favor, inicia sesión.'); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error:', (error as Error).message);
      alert('El usuario ya existe');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email no válido' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            {...register('password', { required: 'Contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            {...register('confirmPassword', { required: 'Confirma tu contraseña' })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Registrarse
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" underline="hover">
                Inicia Sesión
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;