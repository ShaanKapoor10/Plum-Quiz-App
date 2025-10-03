import React, { useEffect ,useState} from 'react';
import { useQuiz } from './context/QuizContext';
import TopicScreen from './screens/TopicScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';
import './App.css';
import Pattern from "./components/Pattern";
import SplashScreen from "./components/SplashScreen";
import logo from "./assets/logo.png";
function App() {
  const { gameState, theme } = useQuiz();
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  

  const [showSplash, setShowSplash] = useState(true);

  const renderGameState = () => {
    switch (gameState) {
      case 'topic':
        return <TopicScreen />;
      case 'loading':
        return <Loader message="Generating your quiz..." />;
      case 'quiz':
        return <QuizScreen />;
      case 'results':
        return <ResultScreen />;
      default:
        return <TopicScreen />;
    }
  };

  return (<>
  {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
  <>
  <Pattern /> 

  <div
    style={{
      position: "relative",
      zIndex: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <header
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        width: "100%",
       
      }}
      className="app-header"
    >
      <img
  src={logo}
  alt="AI Quiz Logo"
  style={{
    height: "100px",
    width: "100px",
    objectFit: "cover",
    borderRadius: "50%",        
    boxShadow: "0 0 10px rgba(0,0,0,0.3)", 
    cursor: "pointer",
  }}
  onClick={() => window.location.reload()}
/>
      <ThemeToggle />
    </header>

    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        marginTop: "-20px",  
      }}
    >
      {renderGameState()}
    </main>
  </div>
  </>)}
  
</>

    
  );
}

export default App;

