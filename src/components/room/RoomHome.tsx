import { useEffect, useState } from "react";
import emptyIcon from '../../assets/images/empty_list.svg';
import copyIcon from '../../assets/images/copy.svg';
import { useNavigate, useParams } from "react-router-dom";
import { RoomObjects } from "./RoomObjects";
import { RoomServices } from "../../services/RoomServices";

const roomServices = new RoomServices();

export const RoomHome = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [objects, setObjects] = useState([]);
    const { link } = useParams();

    const getRoom = async () => {
        try{
            if(!link){
                return navigate('/');
            }

            const result = await roomServices.getRoomByLink(link);

            if(!result || !result.data){
                return;
            }

            const {color, name, objects} = result.data;

            setName(name);
            setColor(color);

            const newObjects = objects.map((o: any) => {
                return {...o, type : o?.name?.split('_')[0]}
            });

            setObjects(newObjects);
        }catch(e){
            console.log('Ocorreu erro ao buscar dados da sala:', e);
        }
    }

    useEffect(() => {
        getRoom();
    }, [])


    const enterRoom = () => {

    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    return (
        <div className="container-principal">
            <div className="container-room">
                {
                    objects?.length > 0
                        ?
                        <>
                            <div className="resume">
                                <div onClick={copyLink}>
                                    <span><strong>Reunião</strong> {link}</span>
                                    <img src={copyIcon} />
                                </div>
                                <p style={{color}}>{name}</p>
                            </div>
                            <RoomObjects 
                                objects={objects}
                                enterRoom={enterRoom}/>
                        </>

                        :
                        <div className="empty">
                            <img src={emptyIcon} />
                            <p>Reunião não encontrada :/</p>
                        </div>
                }
            </div>
        </div>
    );
}