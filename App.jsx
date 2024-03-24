import { StyleSheet } from 'react-native'
import React from 'react'
import { GlobalProvider } from './Context/GlobalContext'
import Router from './Router';


const App = () => {
    return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  )
}

export default App

const styles = StyleSheet.create({

})