import React from "react";
import { Link } from "react-router-dom";

import { Grid, Button, Breadcrumbs, Typography } from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";
import { QuestionDetailComponent } from "./Detail";

interface Props {
}

interface States {
  questions: { [k: string]: IQuestion };
}

export class QuestionComponent extends React.Component<Props, States> {
  private questionService: QuestionService = new QuestionService;

  constructor(props: Props) {
    super(props);

    this.state = { questions: {} };
    this.questionService.list().then(res => {
      this.setState({ questions: res.data });
    });
  }

  private add() {
    const question: IQuestion = {} as IQuestion;
    const index = (Object.keys(this.state.questions).length + 1).toString();
    const { questions } = this.state;

    questions[index] = question;

    this.setState({ questions });
  }

  render() {
    return (
      <>
        <Breadcrumbs className="mb-4">
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">問題作成</Typography>
        </Breadcrumbs>

        <Grid container direction="column" spacing={2}>
          {Object.keys(this.state.questions).map(id => (
            <QuestionDetailComponent key={id} question={this.state.questions[id]} />
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.add.bind(this)}>問題を追加</Button>
          </Grid>
        </Grid>
      </>
    );
  }
}
