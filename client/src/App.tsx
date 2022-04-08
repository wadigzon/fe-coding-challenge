import {useEffect, useState} from "react";
import { AppSettings } from "./AppSettings";
import UsersTable from "./UsersTable";


export default function App() {
    const [status, setStatus] = useState("starting");
    const [usersList, setUsersList] = useState(null);

    useEffect(() =>{
        setStatus("1st call, fetching users ...");
        fetchUsers().then(users => {
            // we've got the users
            setStatus("We've got user's data on 1st try");
            setUsersList(users);
            //console.log(users)
        }).catch(error => {
            // fail: call again 2nd time
            setStatus("1st call failed, retrying fetching users ... ");
            //console.log('we call again')
            fetchUsers().then(users => {
                // we've got the users
                setStatus("We've got user's data on 2nd try");
                setUsersList(users);
                //console.log(users)
            }).catch(error => {
                // fail: call again 3rd time
                setStatus("2nd call failed, retrying fetching users one last time ... ");
                //console.log('we call again')
                fetchUsers().then(users => {
                    // we've got the users
                    setStatus("We've got user's data on 3rd try");
                    setUsersList(users);
                    //console.log(users)
                }).catch(error => {
                    // we do not call again!
                    setStatus("3rd call failed: please try again later!  ");
                    //console.log('server is unresponsive!')
                });
            });
        });

    }, []); // 1st rendered

    const fetchUsers = async () => {
        const getUsersEndPoint = `${AppSettings.SERVER_URL}:${AppSettings.SERVER_PORT}${AppSettings.GET_USERS_URL}`;
        const response = await fetch(getUsersEndPoint);
        if (!response.ok) {
            const message = `error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const users = await response.json();
        return users;
    }

    return (<div>
        <h1>BigEye Assignment</h1>
        <h4>Status : {status}</h4>
        <div>
            {usersList !== null &&
                <UsersTable usersList = {usersList} />
            }
        </div>
    </div>);
}