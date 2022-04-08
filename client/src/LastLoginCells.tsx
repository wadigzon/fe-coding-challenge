import { AppSettings } from "./AppSettings";
import {useEffect, useState} from "react";

export default function LastLoginCells(props : any) {
    const {userId} = props;
    const [statusTime, setStatusTime] = useState("Loading login info ...");
    const [statusIP, setStatusIP] = useState("Loading login info ...");

    useEffect(() => {
        setStatusTime("1st try getting login info ...");
        setStatusIP("1st try getting login info ...");
        fetchUserLoginInfo().then(loginInfo => {
            const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
            setStatusTime(lastLoginTime);
            setStatusIP(lastLoginIP);
        }).catch(err => {
            setStatusTime("1st call failed, retrying ... ");
            setStatusIP("1st call failed, retrying ... ");
            fetchUserLoginInfo().then(loginInfo => {
                const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
                setStatusTime(lastLoginTime);
                setStatusIP(lastLoginIP);
            }).catch(err => {
                setStatusTime("2nd call failed, retrying ... ");
                setStatusIP("2nd call failed, retrying ... ");
                    fetchUserLoginInfo().then(loginInfo => {
                        const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
                        setStatusTime(lastLoginTime);
                        setStatusIP(lastLoginIP);
                    }).catch(err => {
                        setStatusTime("3rd call failed, retrying ... ");
                        setStatusIP("3rd call failed, retrying ... ");
                        fetchUserLoginInfo().then(loginInfo => {
                            const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
                            setStatusTime(lastLoginTime);
                            setStatusIP(lastLoginIP);
                        }).catch(err => {
                            setStatusTime("4th call failed, retrying ... ");
                            setStatusIP("4th call failed, retrying ... ");
                            fetchUserLoginInfo().then(loginInfo => {
                                const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
                                setStatusTime(lastLoginTime);
                                setStatusIP(lastLoginIP);
                            }).catch(err => {
                                setStatusTime("5th call failed, could not get info! ");
                                setStatusIP("5th call failed, could not get info! ");
                            });

                        });
                });
            });
        });
    }, []);

    const getLastLoginTimeAndIP = (loginInfo:any):any => {
        const logins = loginInfo.logins;
        // sort in descending order, so [0] is the most recent one (greater)
        logins.sort((a:any,b:any) => {
            const ad = new Date(a.login_time);
            const bd = new Date(b.login_time);
            return ad > bd ? -1 : ad < bd ? 1 : 0;
        });

        return [logins[0].login_time, logins[0].ip_v4];
    }

    const fetchUserLoginInfo = async () => {
        const getUserLoginInfoEndPoint = `${AppSettings.SERVER_URL}:${AppSettings.SERVER_PORT}${AppSettings.GET_USER_LOGINS_URL}`;
        const url = getUserLoginInfoEndPoint.replace(":id", userId);
        const response = await fetch(url);
        if (!response.ok) {
            const message = `error has occurred: ${response.status}`;
            throw new Error(message);
        }
        const loginInfo = await response.json();
        return loginInfo;

    }

    return (<>
        <td>{statusTime}</td>
        <td>{statusIP}</td>
   </>);
}
