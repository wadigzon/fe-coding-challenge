import { AppSettings } from "./AppSettings";

const waitFor = (msecs: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, msecs);
    })
}

/**
 *
 * @param dataSourceFnc : async function that calls server
 * @param nthTry : number of tries left
 * @param delay : delay in msec to wait before trying again
 * @param onFailed : function called at every failure to update times called
 * @returns
 */
export const retryPromiseWithDelay = async (dataSourceFnc: any, nthTry: number, delay: number, onFailed: any):Promise<any> => {
    try {
        const res = await dataSourceFnc();
        return res;
    } catch (e) {
        if (nthTry === 1) {
            return Promise.reject(e);
        }
        const times = `${AppSettings.NUMBER_TRIES - nthTry + 1}`
        onFailed(times);
        await waitFor(delay);
        return retryPromiseWithDelay(dataSourceFnc, nthTry - 1, delay, onFailed);
    }
};
