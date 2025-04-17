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

export type QuestionOption = {
  options: string;
};

export type QuestionInterface = {
  uuid?: string;
  type: string;
  answer: string;
  question: string;
  weight: string;
  options: QuestionOption[];
};

export type ExamsInterface = {
  uuid: string;
  name: string;
  code: string;
  access: string;
  expired: string;
  quest: [];
};
