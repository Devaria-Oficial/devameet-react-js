import linkIcon from '../../assets/images/link_preview.svg';


type RoomObjectsProps = {
    objects: Array<any>,
    enterRoom():void
}

export const RoomObjects : React.FC<RoomObjectsProps> = ({objects, enterRoom}) =>{

    const getImageFromObject = (object: any) => {
        if (object && object._id) {
            const path = `../../assets/objects/${object?.type}/${object.name}${object.orientation? "_"+ object.orientation : ''}.png`;
            const imageUrl = new URL(path, import.meta.url);
            return imageUrl.href;
        }
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

    return (
        <div className="container-objects">
            <div className="center">
                <div className="grid">
                    {
                        objects?.map((object: any) => 
                            <img key={object._id} 
                                src={getImageFromObject(object)}
                                className={getClassFromObject(object)}
                                style={{zIndex: object.zindex}}
                                />)
                    }
                    <div className="preview">
                        <img src={linkIcon} alt="Entrar na sala"/>
                        <button onClick={enterRoom}>Entrar na sala</button>
                    </div>
                </div>
            </div>
        </div>
    )
}