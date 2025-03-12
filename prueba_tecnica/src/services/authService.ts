
const users = [
    {
      email: 'hanan@gmail.com',
      password: '123456',
    },
  ];
  

  const generateFakeToken = (email: string) => {
    return `fake-jwt-token-for-${email}`;
  };
  

  export const fakeLogin = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          resolve({ token: generateFakeToken(user.email) });
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 1000); 
    });
  };
  
 
  export const fakeRegister = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userExists = users.some((u) => u.email === email);
        if (userExists) {
          reject(new Error('El usuario ya existe'));
        } else {
          users.push({ email, password });
          resolve({ token: generateFakeToken(email) });
        }
      }, 1000); 
    });
  };