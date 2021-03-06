const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a,b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
    response.send(200, sortedUsers);
  },

  getUserById(request, response) {
    const  { id } = request.params;
    console.log(id)
    const user = users.find((user) => user.id === Number(id));

    if (!user) {
     return  response.send(400, { error: 'User not found' })
    } 
    response.send(200, user);
  },

  createUser(request, response) {
    const { body } = request;
    const lastUserId = users[users.length -1].id;

    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },

  updateUser(request, response) {
    let { id } = request.params;
    let { name } = request.body;

    id = Number(id);

    const userExists = users.find((users) => users.id === id)

    if (!userExists) {
     return response.send(400, { error: 'User not found' })
    }

    user = users.map((user) => {
      if (user.id === id) {
        return { 
          ...user,
          name,
        };
      }
      return user;
    });

    return response.send(200, { id, name })
   },

   deleteUser(request, response) {
     let { id } = request.params;
     id = Number(id);

     user = users.filter((user) => user.id !== id);

     response.send(200, {deleted: true });
   }
};