import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeetServices } from "../../services/MeetServices";
import { MeetAddEditHeader } from "./MeetAddEditHeader";
import { MeetObjectsRoom } from "./MeetObjectsRoom";

const meetServices = new MeetServices();

export const MeetAdd = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const goBack = () => {
        return navigate(-1);
    }

    const isFormInvalid = (!name || name.trim().length < 5
    || !color || color.trim().length < 4)

    const doSave = async () => {
        try {
            if (isFormInvalid) {
                return;
            }

            await meetServices.createMeet({ name, color });
            return goBack();
        } catch (e: any) {
            if (e?.response?.data?.message) {
                console.log('Erro ao efetuar login:', e?.response?.data?.message);
            } else {
                console.log('Erro ao efetuar login:', e);
            }
        }
    }

    return (
        <div className="container-principal">
            <div className="container-meet">
                <MeetAddEditHeader
                    name={name}
                    color={color}
                    setName={setName}
                    setColor={setColor}
                    isEdit={false}
                />
                <div className="form">
                    <span onClick={goBack}>Voltar</span>
                    <button onClick={doSave} 
                        disabled={isFormInvalid}
                        className={isFormInvalid ? 'disabled' : ''}>Salvar</button>
                </div>
            </div>
            <MeetObjectsRoom />
        </div>
    );
}