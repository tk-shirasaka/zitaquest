import { HttpService } from "./Http";

export interface IQuestion {
  id: number;
  level: number;
  question: string;
  hint: string;
  answer: string;
}

export class QuestionService extends HttpService {
  private basePath: string = "question";

  list() {
    return this.axios.get<{ [k: string]: IQuestion }>(this.basePath);
  }

  save(data: IQuestion) {
    return this.axios.post<IQuestion>(this.basePath, data);
  }
}
