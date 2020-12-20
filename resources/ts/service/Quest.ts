import { HttpService } from "./Http";

export interface IQuest {
  id: number;
  question_id: number;
  no: number;
  place: string;
}

export class QuestService extends HttpService {
  protected basePath: string = "quest";

  list() {
    return this.axios.get<{ [k: string]: IQuest }>(this.basePath);
  }

  detail(id: number) {
    return this.axios.get<IQuest>(`{this.basePath}/${id}`);
  }

  save(data: IQuest) {
    return this.axios.post<IQuest>(this.basePath, data);
  }
}
