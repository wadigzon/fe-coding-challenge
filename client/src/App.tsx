import {useEffect, useState} from "react";
import { AppSettings } from "./AppSettings";
import UsersTable from "./UsersTable";
import { retryPromiseWithDelay } from "./utils"

export default function App() {
    const [status, setStatus] = useState("starting");
    const [usersList, setUsersList] = useState(null);
    const retry = AppSettings.NUMBER_TRIES;
    const waitBeforeRetry = AppSettings.WAIT_BEFORE_RETRY_MSECS;
    useEffect(() => {
        setStatus("fetching users ...");
        retryPromiseWithDelay(fetchUsers, retry, waitBeforeRetry, onFailed)
        .then(users => {
            setStatus("We've got user's data");
            setUsersList(users);
        })
        .catch(err => {
            setStatus(`We've could not get user's data after trying ${retry} times`);
        });
    }, []); // 1st rendered

    const onFailed = (times: number) => {
        setStatus(`failed fetching users ${times} time(s), trying again ...`);
    }
    const fetchUsers = async () => {
        const getUsersEndPoint = `${AppSettings.SERVER_URL}:${AppSettings.SERVER_PORT}${AppSettings.GET_USERS_URL}`;
        const response = await fetch(getUsersEndPoint);
        if (!response.ok) {
            const message = `error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const users = await response.json();
        return users;
    };

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