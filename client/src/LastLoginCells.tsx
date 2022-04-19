import { AppSettings } from "./AppSettings";
import {useEffect, useState} from "react";
import { retryPromiseWithDelay } from "./utils"
import { formatDistance, differenceInCalendarDays } from "date-fns"
//import geoip from "geoip-country"
export default function LastLoginCells(props : any) {
    const {userId, onUpdateFontColor} = props;
    const [statusTime, setStatusTime] = useState("Loading login info ...");
    const [statusIP, setStatusIP] = useState("Loading login info ...");
    const retry = AppSettings.NUMBER_TRIES;
    const waitBeforeRetry = AppSettings.WAIT_BEFORE_RETRY_MSECS;

    useEffect(() => {
        setStatusTime("fetching login info ...");
        setStatusIP("fetching login info ...");

        retryPromiseWithDelay(fetchUserLoginInfo, retry, waitBeforeRetry, onFailed)
        .then(loginInfo => {
            const now = new Date();
            const [lastLoginTime, lastLoginIP] = getLastLoginTimeAndIP(loginInfo);
            const loginDate = new Date(lastLoginTime);
            const formattedDateTime = formatDistance(loginDate, now, {addSuffix: true});
            const numberOfDaysPassed = differenceInCalendarDays(now, loginDate);
            if (numberOfDaysPassed > 30) {
                onUpdateFontColor("red")
            }
            setStatusTime(formattedDateTime); // /*lastLoginTime*/
            //const geo = null; //geoipCountry.lookup(lastLoginIP) || null;
            const country = '';// geo && geo.country ? `[${geo.country}]` : '';
            setStatusIP(`${lastLoginIP} ${country}`);
        }).catch(err => {
            setStatusTime(`Couldn't get login data after trying ${retry} times`);
            setStatusIP(`Couldn't get login data after trying ${retry} times`);
        })
    }, []);

    const onFailed = (times: number) => {
        setStatusTime(`failed@fetching login info ${times} time(s), trying again ...`);
        setStatusIP(`failed@fetching login info ${times} time(s), trying again ...`);
    }


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

    return (
    <>
        <td>{statusTime}</td>
        <td>{statusIP}</td>
    </>);
}
