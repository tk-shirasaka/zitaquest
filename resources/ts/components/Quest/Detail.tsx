import React, { ChangeEvent } from "react";

import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";
import { IQuest } from "../../service/Quest";

interface Props {
  quest: IQuest;
}

interface States {
  quest: IQuest;
  questions: { [k:string]: IQuestion };
}

export class QuestDetailComponent extends React.Component<Props, States> {
  private questionService: QuestionService = new QuestionService;

  constructor(props: Props) {
    super(props);

    this.state = { quest: props.quest, questions: {} };
    this.questionService.list().then(res => {
      this.setState({ questions: res.data });
    });
  }

  private onChangeQuestion(event: ChangeEvent<{ value: unknown }>) {
    const quest = this.state.quest;
    quest.question_id = +(event.target as HTMLInputElement).value;

    this.setState({ quest });
  }

  private onChangePlace(event: ChangeEvent) {
    const quest = this.state.quest;
    quest.place = (event.target as HTMLInputElement).value;

    this.setState({ quest });
  }

  render() {
    return (
      <Grid item>
        <Paper className="p-3" elevation={3}>
          <form noValidate>
            <FormControl className="m-2" style={{ minWidth: 120 }}>
              <InputLabel>問題</InputLabel>
              <Select value={this.state.quest.question_id} onChange={this.onChangeQuestion.bind(this)}>
                {Object.keys(this.state.questions).map((id, i) => (
                  <MenuItem key={id} value={id}>問題 { i + 1 }</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="m-2" style={{ minWidth: 120 }}>
              <TextField label="次の場所" defaultValue={this.state.quest.place} onChange={this.onChangePlace.bind(this)} />
            </FormControl>
          </form>
          <Grid container spacing={2}>
          {this.state.questions[this.state.quest.question_id] && (
            <Grid item xs>
              問題文
              <Paper className="bg-light">
                <pre className="p-2">{ this.state.questions[this.state.quest.question_id].question }</pre>
              </Paper>
            </Grid>
          )}
          {this.state.quest.code && (
            <Grid item xs>
              QRコード
              <Paper className="bg-light">
                <p className="p-2">{ this.state.quest.code }</p>
              </Paper>
            </Grid>
          )}
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
