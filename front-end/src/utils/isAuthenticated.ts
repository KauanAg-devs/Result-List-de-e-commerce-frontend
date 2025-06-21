export const handleIsAuthenticated = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false; 

  try {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => 
      cookie.trim().startsWith('access_token=')
    );

    return !!authCookie && authCookie.split('=')[1] !== '';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};