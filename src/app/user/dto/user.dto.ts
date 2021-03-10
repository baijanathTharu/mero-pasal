export class ResponseUserDto {
  data: {
    user: User;
    message: string;
  };
}

type User = {
  id: string;
  username: string;
  password: string;
};
