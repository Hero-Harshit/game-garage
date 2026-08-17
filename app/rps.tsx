import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RockPaperScissorsScreen() {
  const router = useRouter();

  const [rpsPlayer, setRpsPlayer] = useState<string | null>(null);
  const [rpsComputer, setRpsComputer] = useState<string | null>(null);
  const [rpsResult, setRpsResult] = useState<string>('Make your choice!');

  const handleRPSChoice = (choice: 'rock' | 'paper' | 'scissors') => {
    const choices: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors'];
    const comp = choices[Math.floor(Math.random() * 3)];
    setRpsPlayer(choice);
    setRpsComputer(comp);
    if (choice === comp) {
      setRpsResult("It's a draw!");
    } else if (
      (choice === 'rock' && comp === 'scissors') ||
      (choice === 'paper' && comp === 'rock') ||
      (choice === 'scissors' && comp === 'paper')
    ) {
      setRpsResult('You win!');
    } else {
      setRpsResult('You lose!');
    }
  };

  const resetRPS = () => {
    setRpsPlayer(null);
    setRpsComputer(null);
    setRpsResult('Make your choice!');
  };

  const handleGoHome = () => {
    router.back();
  };

  const getEmoji = (choice: string | null) => {
    switch (choice) {
      case 'rock': return '✊';
      case 'paper': return '✋';
      case 'scissors': return '✌️';
      default: return '❔';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0B2E" />
      <View style={styles.gameHeader}>
        <Pressable onPress={handleGoHome} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}>
          <View style={styles.backButtonShadow} />
          <View style={styles.backButtonInner}>
            <Text style={styles.backButtonText}>BACK</Text>
          </View>
        </Pressable>
        <Text style={styles.gameHeaderTitle}>ROCK PAPER SCISSORS</Text>
        <View style={{ width: 68 }} />
      </View>
      <ScrollView contentContainerStyle={styles.gameContainer} scrollEnabled={false}>
        
        <View style={styles.arenaContainer}>
          <View style={styles.playerContainer}>
            <Text style={styles.playerLabel}>YOU</Text>
            <View style={styles.choiceBox}>
              <Text style={styles.choiceEmoji}>{getEmoji(rpsPlayer)}</Text>
            </View>
          </View>

          <Text style={styles.vsText}>VS</Text>

          <View style={styles.playerContainer}>
            <Text style={styles.playerLabel}>COMPUTER</Text>
            <View style={styles.choiceBox}>
              <Text style={styles.choiceEmoji}>{getEmoji(rpsComputer)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rpsInfo}>
          <Text style={styles.rpsResultText}>{rpsResult}</Text>
          <View style={styles.rpsChoices}>
            <Pressable onPress={() => handleRPSChoice('rock')} style={styles.rpsButton}>
              <Text style={styles.rpsButtonText}>✊ Rock</Text>
            </Pressable>
            <Pressable onPress={() => handleRPSChoice('paper')} style={styles.rpsButton}>
              <Text style={styles.rpsButtonText}>✋ Paper</Text>
            </Pressable>
            <Pressable onPress={() => handleRPSChoice('scissors')} style={styles.rpsButton}>
              <Text style={styles.rpsButtonText}>✌️ Scissors</Text>
            </Pressable>
          </View>
        </View>

        <Pressable onPress={resetRPS} style={({ pressed }) => [styles.resetButton, pressed && styles.resetButtonPressed]}>
          <View style={styles.resetButtonShadow} />
          <View style={styles.resetButtonInner}>
            <Text style={styles.resetButtonText}>RESET</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A0B2E',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 4,
    borderColor: '#00FFFF',
    backgroundColor: '#120520',
  },
  gameHeaderTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFF00',
    letterSpacing: 2,
    textAlign: 'center',
  },
  backButton: {
    width: 68,
    height: 36,
    position: 'relative',
  },
  backButtonPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  backButtonShadow: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: '#000000',
    borderRadius: 8,
  },
  backButtonInner: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  gameContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  arenaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  playerContainer: {
    alignItems: 'center',
    gap: 8,
  },
  playerLabel: {
    color: '#00FFFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  choiceBox: {
    width: 100,
    height: 100,
    backgroundColor: '#2A1A4A',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceEmoji: {
    fontSize: 50,
  },
  vsText: {
    color: '#FF007F',
    fontWeight: '900',
    fontSize: 24,
    fontStyle: 'italic',
  },
  rpsInfo: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#251540',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  rpsResultText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFF00',
    letterSpacing: 1,
    textAlign: 'center',
    minHeight: 30,
  },
  rpsChoices: {
    flexDirection: 'row',
    gap: 12,
  },
  rpsButton: {
    backgroundColor: '#00FFFF',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  rpsButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1,
  },
  resetButton: {
    width: '100%',
    maxWidth: 320,
    height: 56,
    position: 'relative',
  },
  resetButtonPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  resetButtonShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: '#000000',
    borderRadius: 16,
  },
  resetButtonInner: {
    flex: 1,
    backgroundColor: '#00FF66',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
