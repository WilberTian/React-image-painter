import url from 'url';
import fetch from 'isomorphic-fetch';

import { FetchError, ServerError, TimeoutError } from '../errors';
import delay from './delay';

const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;


// enable cookie in the request
const basicFetchOptions = {
    credentials: 'include',
};

const sendRequest = async (config) => {
    let response = null;
    const {
        method = 'GET',
        data,
        url: requestUrl,
    } = config;

    const requestMethod = method.toUpperCase();

    switch (requestMethod) {
        case 'GET':
            response = await fetch(url.format({
                pathname: requestUrl,
                query: data,
            }), {
                ...basicFetchOptions,
            });
            break;
        case 'POST':
            response = await fetch(requestUrl, {
                ...basicFetchOptions,
                method: requestMethod,
                body: JSON.stringify(data),
            });
            break;
        default:
            break;
    }

    return response;
};

const timeoutPromise = async (timeout) => {
    await delay(timeout);
    throw new TimeoutError(timeout);
};

export default async (config) => {
    const {
        timeout = 60000,
        ...fetchConfig
    } = config;

    const response = await Promise.race([timeoutPromise(timeout), sendRequest(fetchConfig)]);

    if (response.status < SUCCESS_CODE_LOWER_BOUND || response.status >= SUCCESS_CODE_HIGHER_BOUND) {
        // fetch will not goto reject path when server response 400, 500
        throw new FetchError(response);
    } else {
        const result = await response.json();
        if (result.code !== 0) {
            throw new ServerError(result);
        } else if (!result.success) {
            throw new ServerError(result);
        } else {
            return result.data;
        }
    }
};
