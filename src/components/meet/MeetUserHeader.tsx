import { useNavigate } from 'react-router-dom';
import addIcon from '../../assets/images/add.svg';

export const MeetUserHeader = () => {

    const navigate = useNavigate();
    const mobile = window.innerWidth <= 992;
    const name = localStorage.getItem('name') || '';

    const navigateToAdd = () =>{
        navigate('/add');
    }

    return (
        <div className="container-user-header">
            <span>Minhas reuniões</span>
            <div>
                <p>Olá, {name}</p>
                {!mobile && <img src={addIcon} alt="Adicionar reunião" onClick={navigateToAdd}/>}
            </div>
        </div>
    )
}