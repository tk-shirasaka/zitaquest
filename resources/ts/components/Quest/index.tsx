import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button, Breadcrumbs, Typography } from "@material-ui/core";

import { QuestService, IQuest } from "../../service/Quest";
import { QuestDetailComponent } from "./Detail";

interface Props {
}

interface States {
  quests: { [k: string]: IQuest };
  editing: string;
}

export class QuestComponent extends React.Component<Props, States> {
  questService: QuestService = new QuestService;

  constructor(props: Props) {
    super(props);

    this.state = { quests: {}, editing: "" };
    this.questService.list().then(res => {
      this.setState({ quests: res.data });
    });
  }

  private add() {
    const quest: IQuest = {} as IQuest;
    const editing = (Object.keys(this.state.quests).length + 1).toString();
    const { quests } = this.state

    quest.no = +editing;
    quests[editing] = quest;

    this.setState({ quests, editing });
  }

  render() {
    return (
      <>
        <Breadcrumbs className="mb-4">
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">ゲーム作成</Typography>
        </Breadcrumbs>

        <Grid container direction="column" spacing={2}>
          {Object.keys(this.state.quests).map(id => (
            <QuestDetailComponent key={id} quest={this.state.quests[id]} editing={id === this.state.editing} />
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={this.add.bind(this)}
          disabled={this.state.editing !== ""}
        >問題を追加</Button>
      </>
    );
  }
}
