import { HttpService } from "./Http";

interface IRecord {
  state: number;
  find_point: number;
  find_time: string;
  answer_point: number;
  answer_time: string;
};

export interface IGame {
  id: number;
  state: number;
  active: IRecord | null;
  records: IRecord[];
}

export class GameService extends HttpService {
  private basePath: string = "game";

  time2str(hours: number, minutes: number, seconds: number) {
    return [
      !hours ? "" : `${hours}時間`,
      !hours && !minutes ? "" : `${minutes}分`,
      `${seconds}秒`,
    ].join("");
  }

  index() {
    return this.axios.get<IGame>(this.basePath);
  }

  start() {
    return this.axios.post<IGame>(this.basePath);
  }

  find(point: number, time: string, code: string) {
    return this.axios.post<IGame>(`{this.basePath}/find`, { point, time, code });
  }

  answer(point: number, time: string, answer: string) {
    return this.axios.post<IGame>(`{this.basePath}/answer`, { point, time, answer });
  }
}
