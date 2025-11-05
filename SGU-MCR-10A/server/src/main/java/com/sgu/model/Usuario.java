package com.sgu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre completo es obligatorio")
    @Column(nullable = false)
    private String nombreCompleto;
    
    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "Debe ser un correo electrónico válido")
    @Column(nullable = false, unique = true)
    private String correoElectronico;
    
    @NotBlank(message = "El número de teléfono es obligatorio")
    @Column(nullable = false)
    private String numeroTelefono;
    
    public Usuario() {
    }
    
    public Usuario(String nombreCompleto, String correoElectronico, String numeroTelefono) {
        this.nombreCompleto = nombreCompleto;
        this.correoElectronico = correoElectronico;
        this.numeroTelefono = numeroTelefono;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombreCompleto() {
        return nombreCompleto;
    }
    
    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }
    
    public String getCorreoElectronico() {
        return correoElectronico;
    }
    
    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }
    
    public String getNumeroTelefono() {
        return numeroTelefono;
    }
    
    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }
}

