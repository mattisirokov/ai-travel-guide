import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

import { useChatCompletion } from "../services/useChatCompletion";

export function AIButton() {
  const { isGenerating, generatedText, error, generateChatCompletion, reset } =
    useChatCompletion();

  const handlePress = () => {
    generateChatCompletion(
      [
        {
          role: "user",
          content: "Tell me a knock-knock joke",
        },
      ],
      {
        model: "gpt-4o-mini",
        max_tokens: 100,
        temperature: 0.5,
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generate Text to the console</Text>
      <Button title="Generate" onPress={handlePress} />

      {isGenerating && <Text style={styles.text}>Generating...</Text>}
      {generatedText && <Text style={styles.text}>{generatedText}</Text>}
      {error && <Text style={styles.text}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
  },
});
