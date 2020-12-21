import React, { ChangeEvent } from "react";

import { Grid, Button, Typography, TextField } from "@material-ui/core";

import { GameService } from "../../service/Game";

interface Props {
}

interface States {
  point: number;
  hours: number;
  minutes: number;
  seconds: number;
  answer: string;
}

export class GameAnswerComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;
  private timer1: number;

  constructor(props: Props) {
    super(props);

    this.state = { point: 0, hours: 0, minutes: 0, seconds: 0, answer: "" };
    this.timer1 = +setInterval(this.countUp.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer1);
  }

  private countUp() {
    const seconds = (this.state.seconds + 1) % 60;
    const minutes = (this.state.minutes + (seconds ? 0 : 1)) % 60;
    const hours = this.state.hours + (seconds || minutes ? 0 : 1);
    const point = (hours === 0 && minutes < 1) ? 10 : (hours === 0 && minutes < 3 ? 5 : 3);

    this.setState({ seconds, minutes, hours, point });
  }

  private onChangeAnswer(event: ChangeEvent) {
    const answer = (event.target as HTMLInputElement).value;

    this.setState({ answer });
  }

  render() {
    const { point, hours, minutes, seconds } = this.state;
    const color = point === 10 ? "success" : (point === 5 ? "warning" : "danger");

    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography className={`text-${color}`} variant="h2">{ point } ポイント</Typography>
        </Grid>
        <Grid item xs>
          <Typography className="text-center" variant="h2">
            { this.gameService.time2str(hours, minutes, seconds) }
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField label="こたえ" helperText="ひらがなでこたえてね" defaultValue={this.state.answer} onChange={this.onChangeAnswer.bind(this)} />
        </Grid>
        <Grid item xs>
          <Button variant="contained" color="primary">回答</Button>
        </Grid>
      </Grid>
    );
  }
}
