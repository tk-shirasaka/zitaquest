import React, { ChangeEvent } from "react";

import {
  Grid,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";

interface Props {
  question: IQuestion;
}

interface States {
  error: boolean;
  question: IQuestion;
}

export class QuestionDetailComponent extends React.Component<Props, States> {
  private questionService: QuestionService = new QuestionService;

  constructor(props: Props) {
    super(props);

    this.state = { error: false, question: { ...props.question }};
  }

  private onChangeLevel(event: ChangeEvent<{ value: unknown }>) {
    const question = { ...this.state.question, level: +(event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  private onChangeQuestion(event: ChangeEvent) {
    const question = { ...this.state.question, question: (event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  private onChangeHint(event: ChangeEvent) {
    const question = { ...this.state.question, hint: (event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  private onChangeAnswer(event: ChangeEvent) {
    const question = { ...this.state.question, answer: (event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  private offError() {
    this.setState({ error: false });
  }

  private save() {
    this.questionService.save(this.state.question).catch(() => {
      this.setState({ error: true });
    });
  }

  render() {
    return (
      <Grid item>
        <Paper className="p-3" elevation={3}>
          <form noValidate>
            <FormControl className="m-2" style={{ minWidth: 120 }}>
              <InputLabel>難易度</InputLabel>
              <Select value={this.state.question.level} onChange={this.onChangeLevel.bind(this)}>
                <MenuItem value="1">簡単</MenuItem>
                <MenuItem value="2">普通</MenuItem>
                <MenuItem value="3">難しい</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="m-2" style={{ minWidth: 120 }}>
              <TextField label="問題文" multiline rows={5} defaultValue={this.state.question.question} onChange={this.onChangeQuestion.bind(this)} />
            </FormControl>
            <FormControl className="m-2">
              <TextField label="ヒント" defaultValue={this.state.question.hint} onChange={this.onChangeHint.bind(this)} />
            </FormControl>
            <FormControl className="m-2" style={{ minWidth: 120 }}>
              <TextField label="回答" defaultValue={this.state.question.answer} onChange={this.onChangeAnswer.bind(this)} />
            </FormControl>
          </form>
          <Button variant="contained" color="primary" onClick={this.save.bind(this)}>保存</Button>
        </Paper>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.error}
          autoHideDuration={2000}
          onClose={this.offError.bind(this)}
          message="保存に失敗しました"
        />
      </Grid>
    );
  }
}
