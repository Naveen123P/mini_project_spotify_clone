import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import PlayListsDetails from './components/PlayListsDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'
import AlbumDetails from './components/AlbumDetails'
import './App.css'

// write your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/playlist/:id"
          component={PlayListsDetails}
        />
        <ProtectedRoute
          exact
          path="/category/:id/playlists"
          component={CategoryPlaylistsDetails}
        />
        <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
        <Route path="/bad-path" component={NotFound} />
        <Redirect to="bad-path" />
      </Switch>
    )
  }
}
export default App
