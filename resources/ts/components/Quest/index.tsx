import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button, Breadcrumbs, Typography } from "@material-ui/core";

import { QuestService, IQuest } from "../../service/Quest";
import { QuestDetailComponent } from "./Detail";

interface Props {
}

interface States {
  quests: IQuest[];
}

export class QuestComponent extends React.Component<Props, States> {
  questService: QuestService = new QuestService;

  constructor(props: Props) {
    super(props);

    this.state = { quests: [] };
    this.questService.list().then(res => {
      this.setState({ quests: res.data });
    });
  }

  private add() {
    const quest: IQuest = {} as IQuest;
    const quests = [ ...this.state.quests, quest ];

    this.setState({ quests });
  }

  save() {
    this.questService.save(this.state.quests).then(res => {
      this.setState({ quests: res.data });
    });
  }

  render() {
    return (
      <>
        <Breadcrumbs className="mb-4">
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">ゲーム作成</Typography>
        </Breadcrumbs>

        <Grid container direction="column" spacing={2}>
          {this.state.quests.map((quest, i) => (
            <QuestDetailComponent key={i} quest={quest} />
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.add.bind(this)}>問題を追加</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.save.bind(this)}>保存</Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
