const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const CrearUsuarioIn = require('../../dtos/Usuarios/in/CrearUsuarioIn.dto');



class CrearUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new CrearUsuarioIn({ ...rawInput, usuarioCreacion: tokenId });
    const existeIdentificacion = await this.usuarioRepository.findByIdentificacion(inputDto.identificacion);
    if (existeIdentificacion) throw new UserAlreadyExistsError();
   
       // Generar usuario único: jzapata → jzapata1 → jzapata2 ...
       let usuarioFinal = inputDto.usuarioBase;
       let contador = 0;
   
       while (await this.usuarioRepository.findByUsuario(usuarioFinal)) {
         contador++;
         usuarioFinal = `${inputDto.usuarioBase}${contador}`;
       }
   
    inputDto.usuario = usuarioFinal;
    const creado =await this.usuarioRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear el usuario');

  }
}

module.exports = CrearUsuario;