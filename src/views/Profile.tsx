import { useState } from "react"
import { ActionHeader } from "../components/general/ActionHeader"
import { AvatarInput } from "../components/general/AvatarInput"
import { Footer } from "../components/general/Footer"
import { Header } from "../components/general/Header"
import clearIcon from '../assets/images/clear.svg';
import logoutIcon from '../assets/images/logout.svg';

export const Profile = () => {

    const [image, setImage] = useState('');

    return (
        <>
            <Header />
            <div className="container-profile">
                <ActionHeader />
                <AvatarInput image={image} setImage={setImage}/>
                <div className="input">
                    <span>Nome</span>
                    <input type="text" placeholder="Informe seu nome"/>
                    <img src={clearIcon} alt="limpar"/>
                </div>
                <div className="logout">
                    <div>
                        <img src={logoutIcon} alt="Sair"/>
                        <span>Sair</span>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}