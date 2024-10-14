import prisma from "../lib/db.js";

export const handleSocket = (io) => {
  const users = [];

  return io.on("connection", (socket) => {
    socket.on("join_room", (data, callback) => {
      socket.join(data.chatId);

      //Lidar com refresh ao adicionar um novo usuário na sala
      const userInRoom = users.find(
        (user) => user.nickname === data.nickname && user.chatId === data.chatId
      );

      if (userInRoom) {
        userInRoom.socketId = socket.id;
        userInRoom.chatId = data.chatId;
      } else {
        users.push({
          chatId: data.chatId,
          nickname: data.nickname,
          socketId: socket.id,
        });
      }

      // Enviar lista de usuários na sala para o cliente
      const usersInRoom = users.filter((user) => user.chatId === data.chatId);
      io.to(data.chatId).emit("users_in_room", { users: usersInRoom });

      // Notificar os outros usuários que um novo usuário entrou
      socket.broadcast.to(data.chatId).emit("user_joined", {
        nickname: data.nickname,
        firstTime: data.firstTime,
        message: `${data.nickname} entrou na sala.`,
      });

      // Retorno para quando o usuário entrar na sala
      callback({
        message: `Você entrou na sala ${data.chatId}.`,
      });

      socket.on("disconnect", () => {
        // Quando o usuário se desconectar, remover da lista
        const index = users.findIndex(
          (user) => user.socketId === socket.id && user.chatId === data.chatId
        );

        if (index !== -1) {
          let disconnectedUser = users.find((user, idx) => idx === index);

          console.log(disconnectedUser);

          users.splice(index, 1);

          io.to(data.chatId).emit("users_in_room", {
            users: users.filter((user) => user.chatId === data.chatId),
            disconnectedUser,
          });
        }
      });
    });

    socket.on("forceDisconnect", function (data) {
      const index = users.findIndex(
        (user) => user.socketId === socket.id && user.chatId === data.chatId
      );

      if (index !== -1) {
        let disconnectedUser = users.find((user, idx) => idx === index);

        console.log(disconnectedUser);

        users.splice(index, 1);

        io.to(data.chatId).emit("users_in_room", {
          users: users.filter((user) => user.chatId === data.chatId),
          disconnectedUser,
        });
      }
    });

    socket.on("send_message", async (data) => {
      const { chatId, text, userId, user } = data;

      await prisma.Message.create({
        data: {
          text: text,
          chatId: chatId,
          userId: userId,
          published: true,
        },
      });

      const messagesByChatId = await prisma.Message.findMany({
        where: { chatId: chatId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              nickname: true,
            },
          },
        },
      });

      io.to(chatId).emit("receive_message", messagesByChatId);
    });
  });
};
