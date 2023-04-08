
import { useState } from 'react';
import arrowIcon from '../../assets/images/arrow_down_color.svg';
import { Modal } from 'react-bootstrap';

type MeetAddEditHeaderProps = {
    name: string,
    setName(s: string): void,
    color: string,
    setColor(s: string): void,
    isEdit: boolean
}

export const MeetAddEditHeader: React.FC<MeetAddEditHeaderProps> = ({ name, color, setName, setColor, isEdit }) => {

    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const colors = [
        '#B0A4FF',
        '#3BD42D',
        '#F4FC7E',
        '#FC6C65',
        '#FC72E6',
        '#1D9AA1',
        '#D4B811',
        '#D46B26',
    ]

    const cancelSelection = () => {
        setSelected(null);
        setShowModal(false);
    }

    const selectColor = () => {
        if(selected){
            setColor(selected);
        }

        setShowModal(false);
    }

    return (
        <>
            <div className="container-user-header">
                <span>{isEdit ? 'Editar reunião' : 'Nova reunião'}</span>
                <div>
                    <input type="text" placeholder='Digite o nome de sua reunião'
                        value={name} onChange={e => setName(e.target.value)} />
                    <div className='color-select' onClick={() => setShowModal(true)}>
                        <div className='circle' style={color ? { backgroundColor: color } : {}} />
                        <img src={arrowIcon} alt='Selecionar cor' />
                    </div>
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="container-modal">
                <Modal.Body>
                    <div className="content">
                        <div className="container">
                            <span>Selecione a cor da reunião:</span>
                            <div className='colors'>
                                {colors?.map(c => <div key={c} className={c === selected ? 'selected' : ''} style={{ backgroundColor: c }} 
                                    onClick={() => setSelected(c)}/>)}
                            </div>
                        </div>
                        <div className="actions">
                            <span onClick={cancelSelection}>Cancelar</span>
                            <button onClick={selectColor}>Confirmar</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}