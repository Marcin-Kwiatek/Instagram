import {v4 as uuidv4} from 'uuid';

const generateId = () => {
    let myuuid = uuidv4()
    return myuuid
}
export default generateId