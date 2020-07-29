import React, { FunctionComponent, Component, RefObject } from 'react';
import { Input, Button, Card, CardContent, CardActions, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

const styles = createStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        marginTop: 100,
        margin: "auto"
    },
});

interface IState {
    list: ListElement[]
}

class ListElement {
    constructor(public key: number, public text: string, public isFinished: boolean) { }
}

class ToDo extends Component<WithStyles<typeof styles>, IState> {

    constructor(props: WithStyles<typeof styles>) {
        super(props);
        this.state = { list: [new ListElement(1, 'element', false)] }
    }

    addElement(newVal: string) {
        let newList = this.state.list;
        newList.push(new ListElement(this.state.list.length + 1, newVal, false))
        console.log(newList)
        this.setState({ list: newList })
    }

    finish(key: number) {
        let el = this.state.list.find(el => el.key == key);
        if (el) {
            el.isFinished = true;
        }
        this.setState({ list: this.state.list })
    }

    render() {

        let input: any;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <form noValidate autoComplete="off">
                    <Grid container justify="center">
                        <Grid item xs={12}>
                            <Card>
                                <CardActions>
                                    <Input inputRef={node => input = node} />
                                    <Button onClick={ () => { this.addElement(input.value); } }> Add value</Button>
                                </CardActions>
                                <CardContent>
                                    <List>
                                        {this.state.list.map((item: ListElement) => (
                                            <ListItem onClick={ () => { this.finish(item.key) } } key={item.key}>
                                                <ListItemText style={{textDecoration: item.isFinished ? 'line-through' : 'none'}} primary={item.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(ToDo);
