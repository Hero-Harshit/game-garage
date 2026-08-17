import React from 'react';
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

export default function HomeScreen() {
  const router = useRouter();

  const handleGoToGame = () => {
    router.push('/tictactoe' as any);
  };

  const handleGoToRPS = () => {
    router.push('/rps' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1A0B2E" />
      {/* Playful Arcade Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleBg}>GAME GARAGE</Text>
          <Text style={styles.headerTitle}>GAME GARAGE</Text>
        </View>
        <Text style={styles.headerSubtitle}>INSERT COIN TO PLAY</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tic Tac Toe Game Card */}
        <Pressable
          onPress={handleGoToGame}
          style={({ pressed }) => [
            styles.cardContainer,
            pressed && styles.cardPressed
          ]}
        >
          <View style={styles.cardInner}>
            {/* Info Section */}
            <View style={styles.infoContainer}>
              <View style={styles.textDetails}>
                <Text style={styles.gameTitle}>Tic Tac Toe</Text>
              </View>

              {/* Status Label (Play Button) */}
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>PLAY</Text>
              </View>
            </View>
          </View>
        </Pressable>

        {/* Rock Paper Scissors Game Card */}
        <Pressable
          onPress={handleGoToRPS}
          style={({ pressed }) => [
            styles.cardContainer,
            pressed && styles.cardPressed,
          ]}
        >
          <View style={styles.cardInner}>
            {/* Info Section */}
            <View style={styles.infoContainer}>
              <View style={styles.textDetails}>
                <Text style={styles.gameTitle}>Rock Paper Scissors</Text>
              </View>
              {/* Status Label (Play Button) */}
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>PLAY</Text>
              </View>
            </View>
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
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 4,
    borderColor: '#FF007F',
    backgroundColor: '#120520',
  },
  headerTitleContainer: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleBg: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00FFFF',
    position: 'absolute',
    top: 3,
    left: 3,
    letterSpacing: 2,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFF00',
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#00FF66',
    fontWeight: 'bold',
    letterSpacing: 4,
    marginTop: 4,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
    height: 200,
    position: 'relative',
    marginBottom: 24,
  },
  cardPressed: {
    transform: [{ translateX: 3 }, { translateY: 3 }],
  },
  cardInner: {
    flex: 1,
    backgroundColor: '#2A1A4A',
    borderWidth: 4,
    borderColor: '#000000',
    borderRadius: 20,
    overflow: 'hidden',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#251540',
  },
  textDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  playButton: {
    backgroundColor: '#00FF66',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 1,
  },
});

