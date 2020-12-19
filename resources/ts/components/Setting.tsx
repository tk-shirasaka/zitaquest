import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumbs, Typography } from "@material-ui/core";

import { HttpService } from "../service/Http";

interface Props {
}

interface States {
}

export class SettingComponent extends React.Component<Props, States> {
  http: HttpService = new HttpService;

  constructor(props: Props) {
    super(props);

    this.http.get('settings');
  }

  render() {
    return (
      <div className="container mt-4">
        <Breadcrumbs>
          <Link to="/top">Top</Link>
          <Typography color="textPrimary">ゲーム作成</Typography>
        </Breadcrumbs>
        <div className="row justify-content-center">aaa</div>
      </div>
    );
  }
}
