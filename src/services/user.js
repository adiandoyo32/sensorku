import service from './index';

const PATH = 'api/users';

export default {
    fetchUser() {
      return service({
        method: "GET",
        url: PATH,
      });
    },
  
    createUser(user) {
      return service({
        method: "POST",
        url: PATH,
        data: user,
      });
    },
  
    showUser(userId) {
      return service({
        method: "GET",
        url: `${PATH}/${userId}`,
      });
    },
  
    updateUser(user) {
      return service({
        method: "PATCH",
        url: `${PATH}/${user.id}`,
        data: user,
      });
    },
  
    deleteUser(userId) {
      return service({
        method: "DELETE",
        url: `${PATH}/${userId}`,
      });
    },
  
    fetchUserDevices(userId) {
      return service({
        method: "GET",
        url: `${PATH}/${userId}/devices`,
      });
    },
  };
  