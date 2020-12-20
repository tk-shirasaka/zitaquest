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
} from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";

interface Props {
  question: IQuestion;
}

interface States {
  question: IQuestion;
}

export class QuestionDetailComponent extends React.Component<Props, States> {
  questionService: QuestionService = new QuestionService;

  constructor(props: Props) {
    super(props);

    this.state = { question: { ...props.question }};
  }

  onChangeLevel(event: ChangeEvent<{ value: unknown }>) {
    const question = { ...this.state.question, level: +(event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  onChangeQuestion(event: ChangeEvent) {
    const question = { ...this.state.question, question: (event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  onChangeHint(event: ChangeEvent) {
    const question = { ...this.state.question, hint: (event.target as HTMLInputElement).value };

    this.setState({ question });
  }

  save() {
    this.questionService.save(this.state.question);
  }

  render() {
    return (
      <Grid item>
        <Paper className="p-3" elevation={3}>
          <form noValidate>
            <FormControl className="m-2">
              <InputLabel>難易度</InputLabel>
              <Select value={this.state.question.level} onChange={this.onChangeLevel.bind(this)}>
                <MenuItem value="1">簡単</MenuItem>
                <MenuItem value="2">普通</MenuItem>
                <MenuItem value="3">難しい</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="m-2">
              <TextField label="問題文" multiline rows={5} defaultValue={this.state.question.question} onChange={this.onChangeQuestion.bind(this)} />
            </FormControl>
            <FormControl className="m-2">
              <TextField label="ヒント" multiline rows={5} defaultValue={this.state.question.hint} onChange={this.onChangeHint.bind(this)} />
            </FormControl>
          </form>
          <Button variant="contained" color="primary" onClick={this.save.bind(this)}>保存</Button>
        </Paper>
      </Grid>
    );
  }
}
