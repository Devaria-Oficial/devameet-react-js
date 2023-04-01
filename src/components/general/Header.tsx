import logo from '../../assets/images/logo.svg';
import homeIcon from '../../assets/images/home.svg';
import homeActiveIcon from '../../assets/images/home_active.svg';
import linkIcon from '../../assets/images/link.svg';
import linkActiveIcon from '../../assets/images/link_active.svg';
import avatarIcon from '../../assets/images/avatar.svg';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const getIcon = (name: string) => {
        switch (name) {
            case 'home':
                if (location.pathname !== '/user' &&
                    location.pathname !== '/link' &&
                    location.pathname !== '/room') {
                    return homeActiveIcon;
                }
                return homeIcon;
            case 'room':
                if (location.pathname === '/room' ||
                    location.pathname === '/link') {
                    return linkActiveIcon;
                }
                return linkIcon;
            default:
                return '';
        }
    }

    const getSelectedClass = () => {
        if(location.pathname === '/user'){
            return 'selected';
        }
        return '';
    }

    return (
        <div className="container-header">
            <img src={logo} alt="Logo Devameet" className="logo" />
            <div className="navigation">
                <ul>
                    <li>
                        <img src={getIcon('home')} alt="Minhas reuniões" className='iconeNav' onClick={() => navigate('/')} />
                    </li>
                    <li>
                        <img src={getIcon('room')} alt="Entrar na reunião" className='iconeNav' onClick={() => navigate('/link')} />
                    </li>
                    <li>
                        <div className={'avatar mini ' + getSelectedClass()} onClick={() => navigate('/user')}>
                            <img src={avatarIcon} alt='Editar usuário' />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}