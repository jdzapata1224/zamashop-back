class LoginInDTO {
  constructor({ usuario, password }) {
    if (!usuario  || typeof usuario  !== 'string' || !usuario.trim())  throw new Error('Usuario es requerido');
    if (!password || typeof password !== 'string' || !password.trim()) throw new Error('Password es requerido');

    this.usuario  = usuario.trim();
    this.password = password.trim();
  }
}

module.exports = LoginInDTO;
