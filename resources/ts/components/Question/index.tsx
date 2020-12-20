import React from "react";
import { Link } from "react-router-dom";

import { Button, Breadcrumbs, Typography } from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";
import { QuestionDetailComponent } from "./Detail";

interface Props {
}

interface States {
  questions: IQuestion[];
  editing: number;
}

export class QuestionComponent extends React.Component<Props, States> {
  questionService: QuestionService = new QuestionService;

  constructor(props: Props) {
    super(props);

    this.state = { questions: [], editing: -1 };
    this.questionService.list().then(res => {
      this.setState({ questions: res.data });
    });
  }

  private add() {
    const question: IQuestion = {} as IQuestion;
    const editing = this.state.questions.length;
    const questions = [ ...this.state.questions, question ];

    this.setState({ questions, editing });
  }

  render() {
    return (
      <div className="container mt-4">
        <Breadcrumbs>
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">問題作成</Typography>
        </Breadcrumbs>

        <div className="row justify-content-center my-3">
          {this.state.questions.map((question, i) => <QuestionDetailComponent key={i} question={question} editing={i === this.state.editing} />)}
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
