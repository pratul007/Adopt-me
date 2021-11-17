import { StrictMode, useState} from "react";
import ReactDOM  from "react-dom";
// import Pet from './Pet'
import SearchBar from "./SearchBar"
import Details from './Details'
import { Route, Switch, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";


//below is how we use code Splitting
// const Details =lazy(()=> import("./Details"))
// const SearchBar =lazy(()=> import("./SearchBar"))


const App = () => {
    const theme = useState("darkblue");
    return(
        <StrictMode>
        <ThemeContext.Provider value={theme}>
        <div>
            {/* <h2> this h2 won't go away</h2>
            <Suspense fallback={<h2>Loading ...</h2>}>  for code splitting*/}
            
            <header>
                <Link to ="/">
                    <h1>Adopt Me!</h1>                
                </Link>
            </header>
                <Switch>
                <Route path="/details/:id">
                    <Details theme={theme} />
                </Route>
                <Route>
                    <SearchBar />
                </Route>
                </Switch>
            
            {/* </Suspense> for code splitting*/} 
        </div>
        </ThemeContext.Provider>
        </StrictMode>
    )
}

export default App;