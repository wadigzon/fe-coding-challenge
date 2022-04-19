import {useState} from "react";
import LastLoginCells from "./LastLoginCells";

export default function TableRow(props : any) {
    const { key, id, firstName, lastName, email } = props
    const [fontColorValue, setFontColorValue] = useState("default");

    const updateFontColor = (colorValue: string) => {
        setFontColorValue(colorValue);
    }

    return (
    <tr key={key}>
        <td>{id}</td>
        <td style={{color: fontColorValue}}>{firstName}</td>
        <td style={{color: fontColorValue}}>{lastName}</td>
        <td>{email}</td>
        <LastLoginCells userId = {id} onUpdateFontColor={updateFontColor} />
    </tr>
    )
}