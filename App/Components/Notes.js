import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableHighlight
} from 'react-native';

const Api = require('../Utils/Api');
const Separator = require('./Helpers/Separator');
const Badge = require('./Badge');

class Notes extends Component {
  propTypes: {
    userInfo: React.propTypes.object.isRequired,
    notes: React.propTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: '',
    };
  }
  handleChange(e) {
    this.setState({
      note: e,
    });
  }
  handleSubmit() {
    var note = this.state.note;
    this.setState({
      note: '',
    });

    Api.addNote(this.props.userInfo.login, note)
        .then((data) => {
          Api.getNotes(this.props.userInfo.login)
              .then((data) => {
                this.setState({
                  dataSource: this.ds.cloneWithRows(data),
                });
              });
        }).catch((err) => {
          console.log('Request failed', err);
          this.setState({error});
        });
  }
  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeHolder='New note' />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
      </View>
    )
  }
  renderRow(rowdata) {
    console.log(rowdata)
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}> {rowdata.user_id}: </Text>
          <Text style={styles.rowContent}> {rowdata.text} </Text>
        </View>
        <Separator />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo} />}
          enableEmptySections
        />
        {this.footer()}
      </View>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 19,
    marginTop: 8,
  },
  rowContent: {
    fontSize: 19,
    marginTop: 8,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

module.exports = Notes;
