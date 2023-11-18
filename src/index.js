import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LoaderProvider } from './global-context/LoaderContext'
import { GlobalProvider } from './global-context/GlobalContext'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <LoaderProvider>
        <GlobalProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </GlobalProvider>
      </LoaderProvider>
    </QueryClientProvider>
  </Provider>,
)

reportWebVitals()
