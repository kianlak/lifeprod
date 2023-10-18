const BASE_URL = 'http://localhost:8080/api/user';

export async function signUpRequest(user: User): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error('User creation error:', error);
    throw error;
  }
}