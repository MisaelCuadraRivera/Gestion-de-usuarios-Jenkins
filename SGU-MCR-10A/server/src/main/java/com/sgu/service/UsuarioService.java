package com.sgu.service;

import com.sgu.model.Usuario;
import com.sgu.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }
    
    public Optional<Usuario> obtenerPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    public Usuario crear(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
    
    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setNombreCompleto(usuarioActualizado.getNombreCompleto());
                    usuario.setCorreoElectronico(usuarioActualizado.getCorreoElectronico());
                    usuario.setNumeroTelefono(usuarioActualizado.getNumeroTelefono());
                    return usuarioRepository.save(usuario);
                })
                .orElse(null);
    }
    
    public boolean eliminar(Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

