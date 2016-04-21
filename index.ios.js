/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const Main = require('./App/Components/Main');

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

class githubNotetaker extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: Main,
          title: 'GNT'
        }}
      />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
