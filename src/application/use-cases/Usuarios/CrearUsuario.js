const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const CrearUsuarioIn = require('../../dtos/Usuarios/in/CrearUsuarioIn.dto');

class CrearUsuario {
  constructor(usuarioRepository, opcionesPerfilesRepository, opcionesUsuariosRepository) {
    this.usuarioRepository          = usuarioRepository;
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearUsuarioIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeIdentificacion = await this.usuarioRepository.findByIdentificacion(inputDto.identificacion);
    if (existeIdentificacion) throw new UserAlreadyExistsError();
    
    let usuarioFinal = `${inputDto.primer_nombre.charAt(0)}${inputDto.primer_apellido}`.toLowerCase();
    let contador = 0;
   
    while (await this.usuarioRepository.findByUsuario(usuarioFinal)) {
      contador++;
      usuarioFinal = `${inputDto.usuarioBase}${contador}`;
    }
   
    
    const creado =await this.usuarioRepository.create({ ...inputDto, usuario :usuarioFinal});
    if (!creado) throw new Error('No se pudo crear el usuario');

    const opcionesPerfil = await this.opcionesPerfilesRepository.findByPerfilId(inputDto.perfil);
    if (opcionesPerfil.length > 0) {
      await this.opcionesUsuariosRepository.createMany(
        creado.id,
        opcionesPerfil,
        tokenId
      );
    }

  }
}

module.exports = CrearUsuario;