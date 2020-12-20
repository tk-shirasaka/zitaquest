import { HttpService } from "./Http";

export interface IQuestion {
  id: number;
  level: number;
  question: string;
  hint: string;
}

export class QuestionService extends HttpService {
  private basePath: string = "question";

  list() {
    return this.axios.get<{ [k: string]: IQuestion }>(this.basePath);
  }

  detail(id: number) {
    return this.axios.get<IQuestion>(`{this.basePath}/${id}`);
  }

  save(data: IQuestion) {
    return this.axios.post<IQuestion>(this.basePath, data);
  }
}
