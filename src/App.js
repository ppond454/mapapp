import { useEffect, useState, createContext } from "react"
import Login from "./components/Login"
import Home from "./components/Home"
import { auth } from "./config/firebase"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Signup from "./components/Signup"
import Loading from "./container/Loading"

// import { getLocation } from "./Locations/getLocation"

const contextSession = createContext()

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMassage: null,
  })

  useEffect(() => {
    // getLocation()
    auth.onAuthStateChanged((data) => {
      if (data) {
        setSession({
          isLoggedIn: true,
          currentUser: data,
          errorMassage: null,
        })

        sessionStorage.setItem("session", 1)
      }
    })
  }, [])

  return (
    <contextSession.Provider value={{ session, setSession }}>
      <Router>
        <div className="App">
          {session.isLoggedIn ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Redirect to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              {!sessionStorage.getItem("session") ? (
                <Redirect to="/login" />
              ) : (
                <Loading />
              )}
            </Switch>
          )}

          {/* {session.isLoggedIn && <Bottom/> } */}
        </div>
      </Router>
    </contextSession.Provider>
  )
}

export { contextSession }
export default App
