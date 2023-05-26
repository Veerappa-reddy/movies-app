import {Switch, Route, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import AccountDetails from './components/AccountDetails'
import SearchResults from './components/SearchResults'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/search" component={SearchResults} />
    <ProtectedRoute exact path="/account" component={AccountDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
