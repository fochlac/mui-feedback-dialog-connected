const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export const getRequest = (url) => {
    return fetch(url, { headers }).then((res) => (res.status < 400 ? res.json() : Promise.reject(res.json())))
}

export const postRequest = (url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> => {
    return fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(body)
    }).then((res) => (res.status < 400 ? res.json() : Promise.reject(res.json())))
}
