import React, { createRef, RefObject } from "react";

import { Grid, Paper, Typography, Snackbar } from "@material-ui/core";

import jsqr from "jsqr";

import { GameService, IRecord, IGame } from "../../service/Game";

interface Props {
  record: IRecord;
  refresh: (game: IGame) => void;
}

interface States {
  error: boolean;
}

export class GameFindComponent extends React.Component<Props, States> {
  private gameService: GameService = new GameService;
  private video: RefObject<HTMLVideoElement>;
  private canvas: RefObject<HTMLCanvasElement>;
  private timer: number;

  constructor(props: Props) {
    super(props);

    this.state = { error: false };
    this.video = createRef<HTMLVideoElement>();
    this.canvas = createRef<HTMLCanvasElement>();
    this.timer = +setInterval(this.qrReader.bind(this), 300);
  }

  componentDidMount() {
    if (this.video.current) {
      const video = this.video.current;

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "environment", width: 300, height: 260 },
      }).then(stream => {
        video.srcObject = stream;
        video.onloadedmetadata = () => video.play();
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  private offError() {
    this.setState({ error: false });
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
          this.gameService.find(code.data).then(res => {
            this.props.refresh(res.data);
          }).catch(() => {
            this.setState({ error: true });
          });
        }
      }
    }
  }

  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography color="secondary" variant="h2">せいかい</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h4">「{ this.props.record.quest.place }」にむかってね</Typography>
        </Grid>
        <Grid item xs>
          <Paper className="p-1" elevation={3}>
            <video width="300" height="260" ref={this.video}></video>
            <canvas width="300" height="260" ref={this.canvas} style={{ width: 0, height: 0 }}></canvas>
          </Paper>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.error}
          autoHideDuration={2000}
          onClose={this.offError.bind(this)}
          message="QRコードがちがいます"
        />
      </Grid>
    );
  }
}
