export type UsersInterface = {
  id: string;
  username: string;
  name: string;
  password: string;
  exam: string;
};

export type UsersProps = {
  username: string;
  name: string;
  password: string;
  exam: string;
};

export type AuthInterface = {
  token: string | null;
  name: string | null;
};
