import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

class Separator extends Component {
  render() {
    return (
      <View style={styles.separator}></View>
    )
  }
};

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 15
  }
});

module.exports = Separator;
