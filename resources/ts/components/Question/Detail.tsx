import React, { ChangeEvent } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
} from "@material-ui/core";

import { QuestionService, IQuestion } from "../../service/Question";

interface Props {
  question: IQuestion;
  editing: boolean;
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

  onChangeLevel(event: ChangeEvent) {
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
      <Box className="col-12 p-3" boxShadow={2}>
        {this.props.editing
          ? (
            <form noValidate>
              <div>
                <FormControl component="fieldset">
                  <FormLabel component="legend">難易度</FormLabel>
                  <RadioGroup name="level" value={this.state.question.level} onChange={this.onChangeLevel.bind(this)}>
                    <FormControlLabel value="1" control={<Radio />} label="簡単" />
                    <FormControlLabel value="2" control={<Radio />} label="普通" />
                    <FormControlLabel value="3" control={<Radio />} label="難しい" />
                  </RadioGroup>
                </FormControl>
                <TextField className="m-2" label="問題文" multiline rows={5} defaultValue={this.state.question.question} onChange={this.onChangeQuestion.bind(this)} />
                <TextField className="m-2" label="ヒント" multiline rows={5} defaultValue={this.state.question.hint} onChange={this.onChangeHint.bind(this)} />
              </div>
              <Button variant="contained" color="primary" onClick={this.save.bind(this)}>保存</Button>
            </form>
          ) : (
            <>
              {!this.props.question.id ? null : (
                <Button variant="contained" color="primary">変更</Button>
              )}
            </>
          )
        }
      </Box>
    );
  }
}
