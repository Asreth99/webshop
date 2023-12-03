class AuthService {

  getChosenQuestion() {
    return JSON.parse(localStorage.getItem('kerdes'));
  }

    getChosenProduct() {
      return JSON.parse(localStorage.getItem('product'));
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  
    logout() {
      return localStorage.removeItem('user');
    }
  }
  
  const authService = new AuthService();
  
  export default authService;
  