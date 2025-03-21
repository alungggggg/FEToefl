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
  uuid: string;
  id_question: string;
  option: string;
};

export type QuestionInterface = {
  uuid: string;
  type: string;
  answer: string;
  option: QuestionInterface[];
};
