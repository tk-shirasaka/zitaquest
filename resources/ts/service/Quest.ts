import { HttpService } from "./Http";

export interface IQuest {
  id: number;
  question_id: number;
  no: number;
  place: string;
}

export class QuestService extends HttpService {
  private basePath: string = "quest";

  list() {
    return this.axios.get<IQuest[]>(this.basePath);
  }

  save(data: IQuest[]) {
    return this.axios.post<IQuest[]>(this.basePath, data);
  }
}
