import { HttpService } from "./Http";
import { IQuestion } from "./Question";
import { IQuest } from "./Quest";

export interface IRecord {
  question: IQuestion;
  quest: IQuest;
  state: number;
};

export interface IGame {
  id: number;
  state: number;
  active: IRecord | null;
}

export class GameService extends HttpService {
  private basePath: string = "game";

  index() {
    return this.axios.get<IGame>(this.basePath);
  }

  start() {
    return this.axios.post<IGame>(this.basePath);
  }

  answer(answer: string) {
    return this.axios.post<IGame>(`${this.basePath}/answer`, { answer });
  }

  find(code: string) {
    return this.axios.post<IGame>(`${this.basePath}/find`, { code });
  }
}
