import React, { ChangeEvent } from "react";

import { Box, Button, TextField } from "@material-ui/core";

import { QuestService, IQuest } from "../../service/Quest";

interface Props {
  quest: IQuest;
  editing: boolean;
}

interface States {
  quest: IQuest;
}

export class QuestDetailComponent extends React.Component<Props, States> {
  questService: QuestService = new QuestService;

  constructor(props: Props) {
    super(props);

    this.state = { quest: { ...props.quest }};
  }

  onChangePlace(event: ChangeEvent) {
    const quest = { ...this.state.quest, place: (event.target as HTMLInputElement).value };

    this.setState({ quest });
  }

  save() {
    this.questService.save(this.state.quest);
  }

  render() {
    return (
      <Box className="col-12 p-3" boxShadow={2}>
        {this.props.editing
          ? (
            <form noValidate>
              <div>
                <TextField className="m-2" label="次の場所" defaultValue={this.state.quest.place} onChange={this.onChangePlace.bind(this)} />
              </div>
              <Button variant="contained" color="primary" onClick={this.save.bind(this)}>保存</Button>
            </form>
          ) : (
            <>
              {!this.props.quest.id ? null : (
                <Button variant="contained" color="primary">変更</Button>
              )}
            </>
          )
        }
      </Box>
    );
  }
}
