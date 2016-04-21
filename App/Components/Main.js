
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

const Api = require('../Utils/Api');
const Dashboard = require('./Dashboard');
const Toast = require('@remobile/react-native-toast');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false,
    };
  }
  handleChange(event) {
    this.setState({
      username: event,
    });
  }
  handleSubmit() {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true,
    });
    Api.getBio(this.state.username)
          .then((res) => {
            if (res.message === 'Not Found') {
              this.setState({
                error: '没有找到该用户',
                isLoading: false,
              });
              this.showError();
            } else {
              this.props.navigator.push({
                title: res.name || 'Select an option',
                component: Dashboard,
                passProps: {userInfo: res},
              });
              this.setState({
                isLoading: false,
                error: false,
                username: '',
              });
            }
          });
  }
  showError() {
    let errorSearch = this.state.error;
    this.setState({
      error: false,
    });
    if (errorSearch) {
      Toast.showLongBottom(errorSearch);
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Search for a Github User </Text>
        <TextInput
          style={styles.searchInput}
          onChangeText={this.handleChange.bind(this)}
          value={this.state.username}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='white'>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111"
          size="large">
        </ActivityIndicatorIOS>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  textError: {
    color: 'white',
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center'
  }
})

module.exports = Main;
