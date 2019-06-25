export function user (state) {
  return state.user;
}

export function myRouters (state) {
    return state.routers;
}

export function loggedIn (state) {
  return (state.user !== null);
}

export function gotRouters (state) {
    return (state.routers !== null);
}

//check roles
export const check = state => (roles) => {
    const user = state.user;
    if (user) {
        if (Array.isArray(roles) && roles.length) {
            for (let role of roles) {
                if (!user.roleNames.includes(role)) {
                    return false;
                }
            }
        } else if (roles) {
            if (!user.roleNames.includes(roles)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
