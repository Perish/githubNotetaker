import React, {
  Component,
  View,
  WebView,
  StyleSheet
} from 'react-native';

class Web extends Component {
  propTypes: {
    url: React.propTypes.string.isRequired,
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

module.exports = Web;
