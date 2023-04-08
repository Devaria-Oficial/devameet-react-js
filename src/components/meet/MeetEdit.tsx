import { useEffect, useState } from "react"
import { MeetAddEditHeader } from "./MeetAddEditHeader"
import { MeetObjectPicker } from "./MeetObjectPicker";
import wallIcon from '../../assets/images/wall.svg';
import floorIcon from '../../assets/images/floor.svg';
import rugIcon from '../../assets/images/rug.svg';
import tableIcon from '../../assets/images/table.svg';
import chairIcon from '../../assets/images/chair.svg';
import couchIcon from '../../assets/images/couch.svg';
import decorIcon from '../../assets/images/decor.svg';
import natureIcon from '../../assets/images/nature.svg';
import objectsJson from '../../assets/objects/objects.json';
import { MeetObjectsRoom } from "./MeetObjectsRoom";
import { useNavigate, useParams } from "react-router-dom";
import { MeetServices } from "../../services/MeetServices";

const meetServices = new MeetServices();

export const MeetEdit = () => {

    const [index, setIndex] = useState(0);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [selected, setSelected] = useState<any>({});
    const [objects, setObjects] = useState<any>([]);

    const isFormInvalid = (!id || id.trim().length < 5 || !name || name.trim().length < 5
        || !color || color.trim().length < 4)

    const navigate = useNavigate();

    const { meetId } = useParams();
    const getMeet = async () => {
        if (!meetId) {
            return navigate('/');
        }

        const result = await meetServices.getMeetById(meetId);

        if (!result?.data) {
            return navigate('/');
        }

        const { _id, name, color } = result.data;

        setId(_id);
        setName(name);
        setColor(color);

        const objectsResult = await meetServices.getMeetObjectsById(meetId);

        if (objectsResult?.data) {
            const newObjects = objectsResult?.data?.map((e: any) => {
                return { ...e, type: e?.name?.split('_')[0] }
            });
            setObjects(newObjects);
        }
    }

    useEffect(() => {
        getMeet();
    }, [])

    const setObject = (object: any) => {
        const newIndex = index + 1;
        object._id = newIndex;
        setIndex(newIndex);

        if (object.selectMultiple === true) {
            const newArray = [...objects, object];
            setObjects(newArray);
        } else {
            const filtered = objects.filter((o: any) => o.type !== object.type);
            filtered.push(object);
            setObjects(filtered);
        }

        setSelected(object);
    }

    const removeObject = (object: any) => {

        const filtered = objects.filter((o: any) => o._id !== object._id);
        setObjects(filtered);
        setSelected(null);
    }

    const rotateObject = (object: any, to: string) => {

        if (object?._id && (object?.type === 'chair' || object?.type === 'couch')) {
            const index = objects?.indexOf(object);
            if (to === 'left') {
                switch (object.orientation) {
                    case 'front':
                        object.orientation = 'right';
                        break;
                    case 'right':
                        object.orientation = 'back';
                        break;
                    case 'back':
                        object.orientation = 'left';
                        break;
                    case 'left':
                        object.orientation = 'front';
                        break;
                    default: break;
                }
            } else if (to === 'right') {
                switch (object.orientation) {
                    case 'front':
                        object.orientation = 'left';
                        break;
                    case 'left':
                        object.orientation = 'back';
                        break;
                    case 'back':
                        object.orientation = 'right';
                        break;
                    case 'right':
                        object.orientation = 'front';
                        break;
                    default: break;
                }
            }

            setSelected(object);
            objects[index] = object;
            const newArray = [...objects];
            setObjects(newArray);
        }
    }

    const moveSelected = (event: any, selected: any) => {

        if (selected && selected._id
            && selected.type !== 'wall' && selected.type !== 'floor') {
            const index = objects?.indexOf(selected);

            switch (event?.key) {
                case 'ArrowUp':
                    selected.y = selected.y > 1 ? selected.y - 1 : 1;
                    break;
                case 'ArrowDown':
                    selected.y = selected.y < 7 ? selected.y + 1 : 7;
                    break;
                case 'ArrowLeft':
                    selected.x = selected.x > 0 ? selected.x - 1 : 0;
                    break;
                case 'ArrowRight':
                    selected.x = selected.x < 7 ? selected.x + 1 : 7;
                    break;
                default: break;
            }

            setSelected(selected);
            objects[index] = selected;
            const newArray = [...objects];
            setObjects(newArray);
        }
    }

    const goBack = () => {
        return navigate(-1);
    }

    const doUpdate = async () => {
        try {
            if (isFormInvalid) {
                return;
            }

            const body = {
                name,
                color,
                objects
            }

            await meetServices.updateMeet(body, id);
            return navigate('/');
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
                <MeetAddEditHeader name={name} setName={setName}
                    color={color} setColor={setColor}
                    isEdit={true} />
                <div className="scroll">
                    <MeetObjectPicker image={wallIcon} label="Paredes" asset={objectsJson.wall} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={floorIcon} label="Pisos" asset={objectsJson.floor} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={rugIcon} label="Tapetes" asset={objectsJson.rug} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={tableIcon} label="Mesas" asset={objectsJson.table} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={chairIcon} label="Cadeiras" asset={objectsJson.chair} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={couchIcon} label="Sofás" asset={objectsJson.couch} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={decorIcon} label="Decorações" asset={objectsJson.decor} selected={selected?.name} setObject={setObject} />
                    <MeetObjectPicker image={natureIcon} label="Plantas" asset={objectsJson.nature} selected={selected?.name} setObject={setObject} />
                </div>
                <div className="form">
                    <span onClick={goBack}>Voltar</span>
                    <button
                        onClick={doUpdate}
                        disabled={isFormInvalid}
                        className={isFormInvalid ? 'disabled' : ''}>Salvar</button>
                </div>
            </div>
            <MeetObjectsRoom objects={objects} selected={selected}
                setSelected={setSelected} removeObject={removeObject} rotateObject={rotateObject}
                moveSelected={moveSelected} />
        </div>
    )
}