import {useEffect} from "react";

export default function Home() {
    useEffect(() =>{
        document.title = ("Home BigEye Assignment");
    }, [])

    return (<div>
        <h1>Home</h1>

    </div>);
}