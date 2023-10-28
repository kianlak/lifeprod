const BASE_URL = 'http://localhost:8080/api';

export async function signUpRequest(user: User): Promise<boolean> {
  return fetch(`${BASE_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    console.log(JSON.stringify(user))
    if (response.ok) {
      return true;
    }
    
    throw new Error('Failed to create user');
  })
  .catch(error => {
    console.error('User creation error:', error);
    throw error;
  });
}