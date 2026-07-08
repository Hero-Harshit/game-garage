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

type Screen = 'home' | 'tictactoe' | 'rps';
type BoardState = (string | null)[];

export default function HomeScreen() {
  // Navigation state to toggle screens
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  // Tic Tac Toe game states
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null); // 'X' | 'O' | 'Draw' | null
  // Player's chosen symbol (X or O). Randomly assigned each new game.
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O'>('X');

  // Rock Paper Scissors state
  const [rpsPlayer, setRpsPlayer] = useState<string | null>(null);
  const [rpsComputer, setRpsComputer] = useState<string | null>(null);
  const [rpsResult, setRpsResult] = useState<string>('');

  // Win Detection Logic
  // Combines 8 winning lines: 3 rows, 3 columns, and 2 diagonals
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (tempBoard: BoardState): string | null => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (tempBoard[a] && tempBoard[a] === tempBoard[b] && tempBoard[a] === tempBoard[c]) {
        return tempBoard[a]; // Returns 'X' or 'O'
      }
    }
    // If all cells are filled and there's no winner, it's a Draw
    if (tempBoard.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    // Randomly assign player symbol each new game
    const symbols: ('X' | 'O')[] = ['X', 'O'];
    const chosen = symbols[Math.floor(Math.random() * 2)];
    setPlayerSymbol(chosen);
    // Set isXNext based on who should start (player starts)
    setIsXNext(chosen === 'X'); // Player starts with their chosen symbol
    setWinner(null);
  };

  // Computer makes a move on its turn, using the board state passed in
  const computerMove = (currentBoard: BoardState) => {
    if (winner) return;
    const emptyIndices = currentBoard
      .map((cell, i) => (cell === null ? i : null))
      .filter((i) => i !== null) as number[];
    if (emptyIndices.length === 0) return;
    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...currentBoard];
    // Computer uses the opposite symbol of the player
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    newBoard[randomIdx] = computerSymbol;
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      // After computer move, set turn back to player
      setIsXNext(playerSymbol === 'X');
    }
  };

  // Handles player's tap on a board cell
  const handleCellPress = (idx: number) => {
    // Ignore taps if the game is over or cell already occupied
    if (winner || board[idx]) return;

    // Place player's symbol on the board
    const newBoard = [...board];
    newBoard[idx] = playerSymbol;
    setBoard(newBoard);

    // Check for win/draw after player's move
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      return;
    }

    // No winner yet – let the computer make its move
    setIsXNext(false);
    computerMove(newBoard);
  };

  const handleGoToGame = () => {
    resetGame();
    setCurrentScreen('tictactoe');
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
  };

  const handleGoToRPS = () => {
    // Reset RPS state
    setRpsPlayer(null);
    setRpsComputer(null);
    setRpsResult('');
    setCurrentScreen('rps');
  };

  // --- RENDER HOME MENU SCREEN ---
  if (currentScreen === 'home') {
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

  // --- RENDER TIC TAC TOE GAME SCREEN ---
  if (currentScreen === 'tictactoe') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#1A0B2E" />

        {/* Game Screen Header with Back Button */}
        <View style={styles.gameHeader}>
          <Pressable
            onPress={handleGoHome}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed
            ]}
          >
            <View style={styles.backButtonShadow} />
            <View style={styles.backButtonInner}>
              <Text style={styles.backButtonText}>BACK</Text>
            </View>
          </Pressable>
          <Text style={styles.gameHeaderTitle}>TIC-TAC-TOE</Text>
          <View style={{ width: 68 }} />{/* Placeholder to balance header alignment */}
        </View>

        <ScrollView contentContainerStyle={styles.gameContainer} scrollEnabled={false}>
          {/* Game Status Banner */}
          <View style={styles.statusBanner}>
            {winner ? (
              winner === 'Draw' ? (
                <Text style={styles.drawStatusText}>GAME IS A DRAW!</Text>
              ) : (
                <Text style={winner === 'X' ? styles.xWinnerStatusText : styles.oWinnerStatusText}>
                  PLAYER {winner} WINS!
                </Text>
              )
            ) : (
              <Text style={isXNext ? styles.xTurnText : styles.oTurnText}>
                PLAYER {isXNext ? 'X' : 'O'}{"'S"} TURN
              </Text>
            )}
          </View>
          <View style={styles.gridOuterContainer}>
            <View style={styles.boardGrid}>
              {board.map((cellValue, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleCellPress(idx)}
                  style={({ pressed }) => [
                    styles.cell,
                    pressed && !cellValue && !winner && styles.cellPressed,
                  ]}
                >
                  {cellValue === 'X' && (
                    <View style={styles.symbolContainer}>
                      <Text style={styles.xSymbol}>X</Text>
                    </View>
                  )}
                  {cellValue === 'O' && (
                    <View style={styles.symbolContainer}>
                      <Text style={styles.oSymbol}>O</Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Play Again / Action Button */}
          <Pressable
            onPress={resetGame}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.resetButtonPressed
            ]}
          >
            <View style={styles.resetButtonShadow} />
            <View style={styles.resetButtonInner}>
              <Text style={styles.resetButtonText}>RESET BOARD</Text>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- RENDER ROCK PAPER SCISSORS GAME SCREEN ---
  if (currentScreen === 'rps') {
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
      setRpsResult('');
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
          <View style={styles.rpsInfo}>
            <Text style={styles.rpsResultText}>{rpsResult}</Text>
            <View style={styles.rpsChoices}>
              <Pressable onPress={() => handleRPSChoice('rock')} style={styles.rpsButton}>
                <Text style={styles.rpsButtonText}>Rock</Text>
              </Pressable>
              <Pressable onPress={() => handleRPSChoice('paper')} style={styles.rpsButton}>
                <Text style={styles.rpsButtonText}>Paper</Text>
              </Pressable>
              <Pressable onPress={() => handleRPSChoice('scissors')} style={styles.rpsButton}>
                <Text style={styles.rpsButtonText}>Scissors</Text>
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

  // Fallback (should never reach here)
  return null;
}

const styles = StyleSheet.create({
  // Global Styles
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

  // Home Screen Card styles
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
  cardShadow: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: '#000000',
    borderRadius: 20,
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

  // --- TIC TAC TOE GAME SCREEN STYLES ---
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
    backgroundColor: '#FF3B30', // Neon Red back button
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
  statusBanner: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#251540',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  xTurnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF', // Cyan
    letterSpacing: 1,
  },
  oTurnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF007F', // Neon Pink
    letterSpacing: 1,
  },
  xWinnerStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#00FF66', // Lime green victory
    letterSpacing: 1.5,
  },
  oWinnerStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFF00', // Gold victory
    letterSpacing: 1.5,
  },
  drawStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#00FFFF', // Cyan draw text
    letterSpacing: 1.5,
  },
  // Game Board Styling
  gridOuterContainer: {
    width: 320,
    height: 320,
    position: 'relative',
  },
  boardGrid: {
    flex: 1,
    backgroundColor: '#120520',
    borderWidth: 4,
    borderColor: '#000000',
    borderRadius: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  cell: {
    width: 92,
    height: 92,
    backgroundColor: '#2A1A4A',
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellPressed: {
    backgroundColor: '#35215E',
  },
  // Retro 3D layered letters inside cells
  symbolContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xSymbolShadow: {
    fontSize: 54,
    fontWeight: '900',
    color: '#000000',
    position: 'absolute',
    top: 3,
    left: 3,
  },
  xSymbol: {
    fontSize: 54,
    fontWeight: '900',
    color: '#00FFFF', // Neon Cyan X
  },
  oSymbolShadow: {
    fontSize: 54,
    fontWeight: '900',
    color: '#000000',
    position: 'absolute',
    top: 3,
    left: 3,
  },
  oSymbol: {
    fontSize: 54,
    fontWeight: '900',
    color: '#FF007F', // Neon Pink O
  },
  // Reset Action Button
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
    backgroundColor: '#00FF66', // Bright Neon Green
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

  // --- ROCK PAPER SCISSORS STYLES ---
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
});
