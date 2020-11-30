import service from './index';

const PATH = 'api/users';

export function fetchUser() {
    return service({
        method: "GET",
        url: PATH,
    })
}
