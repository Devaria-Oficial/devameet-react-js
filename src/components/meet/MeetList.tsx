import { useEffect, useState } from "react";
import emptyIcon from '../../assets/images/empty_list.svg';
import { MeetServices } from "../../services/MeetServices";
import { MeetListItem } from "./MeetListItem";

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

    const selectToRemove = () =>{

    }

    useEffect(() => {
        getMeets();
    }, []);

    return (
        <div className="container-meet-list">
            {meets && meets.length > 0
                ?
                    meets.map((meet: any) => <MeetListItem key={meet.id} meet={meet} selectToRemove={selectToRemove}/>)
                :
                <div className="empty">
                    <img src={emptyIcon}/>
                    <p>Você ainda não possui reuniões criadas :(</p>
                </div>
            }
        </div>
    );
}