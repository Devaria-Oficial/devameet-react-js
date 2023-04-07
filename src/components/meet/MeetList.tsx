import { useEffect, useState } from "react";
import emptyIcon from '../../assets/images/empty_list.svg';
import { MeetServices } from "../../services/MeetServices";

const meetServices = new MeetServices();

export const MeetList = () => {

    const [meets, setMeets] = useState([]);

    const getMeets = async () => {
        try{
            const result = await meetServices.getMeets();
            if(result?.data){
                setMeets(result.data);
            }
        }catch(e){
            console.log('Ocorreu erro ao listar reuniões:', e);
        }
    }

    useEffect(() => {
        getMeets();
    }, []);

    return (
        <div className="container-meet-list">
            {meets && meets.length > 0
                ?
                    meets.map((meet: any) => <p>{meet.name}</p>)
                :
                <div className="empty">
                    <img src={emptyIcon}/>
                    <p>Você ainda não possui reuniões criadas :(</p>
                </div>
            }
        </div>
    );
}