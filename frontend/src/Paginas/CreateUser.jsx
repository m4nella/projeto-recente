import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import estilos from './CadastrarUsuario.module.css'; // Importe os estilos CSS adequados
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaUsuario = z.object({
    username: z.string().nonempty('Nome de usuário é obrigatório'),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres').nonempty('Senha é obrigatória')
});

export function CadastrarUsuario() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaUsuario)
    });

    async function cadastrarUsuario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_user/', data);
            alert('Usuário cadastrado com sucesso!');
            navigate('/inicial'); // Redireciona para a página inicial após o cadastro
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário');
        }
    }

    return (
        <div className={estilos.container}>
            <form className={estilos.formulario} onSubmit={handleSubmit(cadastrarUsuario)}>
                <p className={estilos.titulo}>Cadastro de Usuário</p>

                <input {...register('username')} className={estilos.campo} placeholder="Nome de Usuário" />
                {errors.username && <p className={estilos.mensagem}>{errors.username.message}</p>}

                <input {...register('email')} className={estilos.campo} placeholder="Email" />
                {errors.email && <p className={estilos.mensagem}>{errors.email.message}</p>}

                <input {...register('password')} type="password" className={estilos.campo} placeholder="Senha" />
                {errors.password && <p className={estilos.mensagem}>{errors.password.message}</p>}

                <button className={estilos.botao}>Cadastrar</button>
            </form>
        </div>
    );
}
