import React, { Component } from 'react';
import { TextInput, Picker, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      textForTranslation: '', 
    isSpeaking: false, 
    pauseResumeText: 'Pause',
    languages: [
      { language: 'English', code: 'en' }, 
      { language: 'English US', code: 'us' }, 
      { language: 'Spain', code: 'es' },
      { language: 'French', code: 'fr' },
      { language: 'Italian', code: 'it' },
      { language: 'Chinese', code: 'zh' },
    ],
    language: 'en',
    }
  }

  componentDidMount() {
    Speech.speak('Welcome to akinmyde text to speech. Enter a word you would like me to pronounce, and select the language you want');
  }

  speak = () => {
    const { language, textForTranslation } = this.state;
    if (!textForTranslation) {
      return Speech.speak('You haven\'t provided anything for me to say');
    }
    Speech.speak(textForTranslation, { language, onDone: this.onDone });
    this.setState({ isSpeaking: true });
  }

  stop = () => {
    Speech.stop();
    this.setState({ isSpeaking: false });
  }

  onDone = () => this.setState({ isSpeaking: false });

  resume = () => {
    Speech.resume();
    this.setState({ isSpeaking: false, pauseResumeText: 'Pause' })
  }

  onChangeText = (text) => this.setState({ textForTranslation: text });

  render() {
    const { pauseResumeText, textForTranslation, isSpeaking, languages } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={text => this.onChangeText(text)}
          value={textForTranslation}
        />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          {languages.map(x => (
            <Picker.Item key={x.code} label={x.language} value={x.code} />
          ))}
        </Picker>
        <Button
          style={ styles.button }
          title="Start"
          disabled={isSpeaking}
          onPress={this.speak}
        />
        <Button
          style={ styles.button } 
          disabled={!isSpeaking}
          title='Stop' 
          onPress={this.stop} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    display: 'flex',
  }
});
