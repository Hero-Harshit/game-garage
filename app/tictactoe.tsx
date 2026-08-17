import React, { useState, useEffect } from 'react';
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

type BoardState = (string | null)[];

export default function TicTacToeScreen() {
  const router = useRouter();

  // Tic Tac Toe game states
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null); // 'X' | 'O' | 'Draw' | null
  const [playerSymbol, setPlayerSymbol] = useState<'X' | 'O'>('X');
  
  // Track if we are waiting for the computer to make a move
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Win Detection Logic
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
    if (tempBoard.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    const symbols: ('X' | 'O')[] = ['X', 'O'];
    const chosen = symbols[Math.floor(Math.random() * 2)];
    setPlayerSymbol(chosen);
    setWinner(null);
    setIsXNext(true); // 'X' always starts
    setIsComputerThinking(false);
  };

  // Initial game setup and handling computer going first if it's 'X'
  useEffect(() => {
    // When the game starts (or resets) and 'X' goes first, 
    // if the player is 'O', the computer must play.
    const boardEmpty = board.every(cell => cell === null);
    if (boardEmpty && playerSymbol === 'O' && isXNext) {
      triggerComputerMove(board);
    }
  }, [playerSymbol, board, isXNext]);

  const triggerComputerMove = (currentBoard: BoardState) => {
    if (winner) return;
    setIsComputerThinking(true);
    
    setTimeout(() => {
      const emptyIndices = currentBoard
        .map((cell, i) => (cell === null ? i : null))
        .filter((i) => i !== null) as number[];
        
      if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newBoard = [...currentBoard];
        const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
        newBoard[randomIdx] = computerSymbol;
        
        setBoard(newBoard);
        
        const result = checkWinner(newBoard);
        if (result) {
          setWinner(result);
        } else {
          setIsXNext(playerSymbol === 'X'); // Turn goes back to player
        }
      }
      setIsComputerThinking(false);
    }, 600); // 600ms delay for "thinking"
  };

  const handleCellPress = (idx: number) => {
    if (winner || board[idx] || isComputerThinking) return;
    
    // Ensure it's actually the player's turn (e.g. if player is X, it must be X's turn)
    const isPlayerTurn = (isXNext && playerSymbol === 'X') || (!isXNext && playerSymbol === 'O');
    if (!isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[idx] = playerSymbol;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      return;
    }

    // Pass turn to computer
    setIsXNext(playerSymbol === 'O'); 
    triggerComputerMove(newBoard);
  };

  const handleGoHome = () => {
    router.back();
  };

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
        <View style={{ width: 68 }} />
      </View>

      <ScrollView contentContainerStyle={styles.gameContainer} scrollEnabled={false}>
        {/* Game Status Banner */}
        <View style={styles.statusBanner}>
          <Text style={styles.playerAssignedText}>YOU ARE: {playerSymbol}</Text>
          {winner ? (
            winner === 'Draw' ? (
              <Text style={styles.drawStatusText}>GAME IS A DRAW!</Text>
            ) : (
              <Text style={winner === 'X' ? styles.xWinnerStatusText : styles.oWinnerStatusText}>
                {winner === playerSymbol ? "YOU WIN!" : "COMPUTER WINS!"}
              </Text>
            )
          ) : (
            <Text style={isXNext ? styles.xTurnText : styles.oTurnText}>
              {((isXNext && playerSymbol === 'X') || (!isXNext && playerSymbol === 'O')) ? "YOUR TURN" : "COMPUTER'S TURN..."}
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
                  pressed && !cellValue && !winner && !isComputerThinking && styles.cellPressed,
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
  playerAssignedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  xTurnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFFF',
    letterSpacing: 1,
  },
  oTurnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF007F',
    letterSpacing: 1,
  },
  xWinnerStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#00FF66',
    letterSpacing: 1.5,
  },
  oWinnerStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFF00',
    letterSpacing: 1.5,
  },
  drawStatusText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#00FFFF',
    letterSpacing: 1.5,
  },
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
  symbolContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xSymbol: {
    fontSize: 54,
    fontWeight: '900',
    color: '#00FFFF',
  },
  oSymbol: {
    fontSize: 54,
    fontWeight: '900',
    color: '#FF007F',
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
