import React, { createRef, RefObject } from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import jsqr from "jsqr";

import { GameService } from "../../service/Game";

interface Props {
}

interface States {
  point: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class GameFindComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;
  private video: RefObject<HTMLVideoElement>;
  private canvas: RefObject<HTMLCanvasElement>;
  private timer1: number;
  private timer2: number;

  constructor(props: Props) {
    super(props);

    this.state = { point: 0, hours: 0, minutes: 0, seconds: 0 };
    this.video = createRef<HTMLVideoElement>();
    this.canvas = createRef<HTMLCanvasElement>();
    this.timer1 = +setInterval(this.countUp.bind(this), 1000);
    this.timer2 = +setInterval(this.qrReader.bind(this), 300);
  }

  componentDidMount() {
    if (this.video.current) {
      const video = this.video.current;

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 300, height: 260 },
      }).then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => video.play();
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }

  private countUp() {
    const seconds = (this.state.seconds + 1) % 60;
    const minutes = (this.state.minutes + (seconds ? 0 : 1)) % 60;
    const hours = this.state.hours + (seconds || minutes ? 0 : 1);
    const point = (hours === 0 && minutes < 1) ? 10 : (hours === 0 && minutes < 3 ? 5 : 3);

    this.setState({ seconds, minutes, hours, point });
  }

  private qrReader() {
    if (this.video.current && this.canvas.current) {
      const video = this.video.current
      const ctx = this.canvas.current.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, video.width, video.height);

        const image = ctx.getImageData(0, 0, video.width, video.height);
        const code =  jsqr(image.data, video.width, video.height);

        if (code) {
          console.log(code.data);
        }
      }
    }
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
          <Paper className="p-1" elevation={3}>
            <video width="300" height="260" ref={this.video}></video>
            <canvas width="300" height="260" ref={this.canvas} style={{ width: 0, height: 0 }}></canvas>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
