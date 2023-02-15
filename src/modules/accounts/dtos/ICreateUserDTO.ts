interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: number;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
