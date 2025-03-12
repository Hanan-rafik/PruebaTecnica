import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5174/api/register', {
        email: data.email,
        password: data.password,
      });
      login(response.data.token); // Almacena el token en el contexto
      navigate('/'); // Redirige al usuario a la página de inicio
    } catch (error) {
      console.error('Error:', error);
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
        </form>
      </Box>
    </Container>
  );
};

export default Register;