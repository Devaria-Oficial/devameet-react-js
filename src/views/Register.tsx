import logo from '../assets/images/logo.svg';
import userIcon from '../assets/images/user.svg';
import emailIcon from '../assets/images/mail.svg';
import passwordIcon from '../assets/images/key.svg';
import { Link, useNavigate } from 'react-router-dom';

import { PublicInput } from '../components/general/PublicInput';
import { AvatarInput } from '../components/general/AvatarInput';
import { useState } from 'react';
import { RegisterServices } from '../services/RegisterServices';

const registerServices = new RegisterServices();

export const Register = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const navigate = useNavigate();

    const doRegister = async () => {
        try {
            setError('');
            if (!image || image.trim().length < 1
                || !name || name.trim().length < 2
                || !email || email.trim().length < 5
                || !password || password.trim().length < 4
                || !confirm || confirm.trim().length < 4
                ) {
                return setError('Favor preencher os campos corretamente.');
            }

            if(password !== confirm){
                return setError('Senha e confirmação não são iguais.');
            }

            setLoading(true);

            const body = { 
                name, 
                email,
                password,
                avatar: image
            };

            await registerServices.register(body);
            setLoading(false);
            return navigate('/?success=true')
        } catch (e: any) {
            console.log('Erro ao efetuar login:', e);
            setLoading(false);
            if (e?.response?.data?.message) {
                return setError(e?.response?.data?.message);
            }
            return setError('Erro ao efetuar login, tente novamente');
        }
    }

    return (
        <div className="container-public register">
            <img src={logo} alt="Logo Devameet" className="logo" />
            <form>
                <AvatarInput image={image} setImage={setImage} />

                {error && <p className='error'>{error}</p>}

                <PublicInput icon={userIcon} name='Nome' alt='Nome' modelValue={name} type='text' setValue={setName} />
                <PublicInput icon={emailIcon} name='Email' alt='Email' modelValue={email} type='text' setValue={setEmail} />
                <PublicInput icon={passwordIcon} name='Senha' alt='Senha' modelValue={password} type='password' setValue={setPassword} />
                <PublicInput icon={passwordIcon} name='Confirme a senha' alt='Confirme a senha' modelValue={confirm} type='password' setValue={setConfirm} />

                <button type='button' disabled={loading} onClick={doRegister}>{loading ? '...Carregando' : 'Cadastrar'}</button>

                <div className='link'>
                    <p>Já possui uma conta?</p>
                    <Link to='/'>Faça seu login agora!</Link>
                </div>
            </form>
        </div>
    )
}