import React from "react";
import { Link } from "react-router-dom";

import { Button, Breadcrumbs, Typography } from "@material-ui/core";

import { QuestService, IQuest } from "../../service/Quest";
import { QuestDetailComponent } from "./Detail";

interface Props {
}

interface States {
  quests: IQuest[];
  editing: number;
}

export class QuestComponent extends React.Component<Props, States> {
  questService: QuestService = new QuestService;

  constructor(props: Props) {
    super(props);

    this.state = { quests: [], editing: -1 };
    this.questService.list().then(res => {
      this.setState({ quests: res.data });
    });
  }

  private add() {
    const quest: IQuest = {} as IQuest;
    const editing = this.state.quests.length;
    const quests = [ ...this.state.quests, quest ];

    quest.no = this.state.quests.length + 1;

    this.setState({ quests, editing });
  }

  render() {
    return (
      <div className="container mt-4">
        <Breadcrumbs>
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">ゲーム作成</Typography>
        </Breadcrumbs>

        <div className="row justify-content-center my-3">
          {this.state.quests.map((quest, i) => <QuestDetailComponent key={i} quest={quest} editing={i === this.state.editing} />)}
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={this.add.bind(this)}
          disabled={this.state.editing >= 0}
        >問題を追加</Button>
      </div>
    );
  }
}
