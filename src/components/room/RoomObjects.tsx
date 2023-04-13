import { useState } from 'react';
import linkIcon from '../../assets/images/link_preview.svg';


type RoomObjectsProps = {
    objects: Array<any>,
    connectedUsers: Array<any>,
    me: any,
    enterRoom():void
}

export const RoomObjects : React.FC<RoomObjectsProps> = ({objects, enterRoom, connectedUsers, me}) =>{

    const [objectsWithWidth, setObjectsWithWidth] = useState<Array<any>>([]);
    const mobile = window.innerWidth <= 992;

    const getImageFromObject = (object: any, isAvatar: boolean) => {
        if (object && object._id) {
            const path = `../../assets/objects/${isAvatar ? 'avatar' : object?.type}/${isAvatar ? object.avatar : object.name}${object.orientation? "_"+ object.orientation : ''}.png`;
            const imageUrl = new URL(path, import.meta.url);

            if(mobile){
                let img = new Image();
                img.onload = () => {
                    const exist = objectsWithWidth.find((o:any) => o.name == object.name);
                    if(!exist){
                        const newObjects = [...objectsWithWidth, {name: object.name, width: img.width}];
                        setObjectsWithWidth(newObjects);
                    }
                }

                img.src = imageUrl.href;
            }

            return imageUrl.href;
        }
    }

    const getObjectStyle = (object: any) => {
        const style = {zIndex: object.zindex} as any;

        if(mobile){
            const obj = objectsWithWidth.find((o:any) => o.name == object.name);
            if(obj){
                const width = obj.width * 0.5;
                style.width = width+'px';
            }
        }

        return style;
    }

    const getClassFromObject = (object: any) => {
        let style = '';

        switch(object.y){
            case 0: {
                style += 'row-one '
                break;
            }
            case 1: {
                style += 'row-two '
                break;
            }
            case 2: {
                style += 'row-three '
                break;
            }
            case 3: {
                style += 'row-four '
                break;
            }
            case 4: {
                style += 'row-five '
                break;
            }
            case 5: {
                style += 'row-six '
                break;
            }
            case 6: {
                style += 'row-seven '
                break;
            }
            case 7: {
                style += 'row-eight '
                break;
            }
            default:
                break;
        }

        switch(object.x){
            case 0: {
                style += 'column-one '
                break;
            }
            case 1: {
                style += 'column-two '
                break;
            }
            case 2: {
                style += 'column-three '
                break;
            }
            case 3: {
                style += 'column-four '
                break;
            }
            case 4: {
                style += 'column-five '
                break;
            }
            case 5: {
                style += 'column-six '
                break;
            }
            case 6: {
                style += 'column-seven '
                break;
            }
            case 7: {
                style += 'column-eight '
                break;
            }
            default:
                break;
        }

        return style;
    }

    const getName = (user: any) => {
        if(user?.name){
            return user.name.split(' ')[0];
        }
        return '';
    }

    return (
        <div className="container-objects">
            <div className="center">
                <div className="grid">
                    {
                        objects?.map((object: any) => 
                            <img key={object._id} 
                                src={getImageFromObject(object, false)}
                                className={getClassFromObject(object)}
                                style={getObjectStyle(object)}
                                />)
                    }
                    {
                        connectedUsers?.map((user: any) =>
                        <div key={user._id} className={'user-avatar ' + getClassFromObject(user)}>
                            <div>
                                <span>{getName(user)}</span>
                            </div>
                            <img 
                                src={getImageFromObject(user, true)}
                                style={getObjectStyle(user)}
                                />
                        </div>)
                    }
                    {(!connectedUsers || connectedUsers?.length === 0) && <div className="preview">
                        <img src={linkIcon} alt="Entrar na sala"/>
                        <button onClick={enterRoom}>Entrar na sala</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}