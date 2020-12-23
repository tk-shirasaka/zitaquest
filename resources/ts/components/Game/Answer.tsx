import React, { ChangeEvent } from "react";

import { Grid, Button, Typography, TextField, Snackbar } from "@material-ui/core";

import { GameService, IRecord, IGame } from "../../service/Game";

interface Props {
  record: IRecord;
  refresh: (game: IGame) => void;
}

interface States {
  error: boolean;
  answer: string;
}

export class GameAnswerComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;

  constructor(props: Props) {
    super(props);

    this.state = { error: false, answer: "" };
  }

  private offError() {
    this.setState({ error: false });
  }

  private onChangeAnswer(event: ChangeEvent) {
    const answer = (event.target as HTMLInputElement).value;

    this.setState({ answer });
  }

  private sendAnswer() {
    this.gameService.answer(this.state.answer).then(res => {
      this.props.refresh(res.data);
    }).catch(() => {
      this.setState({ error: true, answer: "" });
    });
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">{ this.props.record.question.question }</Typography>
        </Grid>
        <Grid item xs>
          <TextField label="こたえ" helperText="ひらがなでこたえてね" defaultValue={this.state.answer} onChange={this.onChangeAnswer.bind(this)} />
        </Grid>
        <Grid item xs>
          <Button variant="contained" color="primary" onClick={this.sendAnswer.bind(this)}>回答</Button>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.error}
          autoHideDuration={2000}
          onClose={this.offError.bind(this)}
          message="ざんねん"
        />
      </Grid>
    );
  }
}
