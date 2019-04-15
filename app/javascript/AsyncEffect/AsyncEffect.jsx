import React from 'react'
import PropTypes from 'prop-types'

/**
 * AsyncEffect is a higher order component to facilitate performing an
 * asynchronous side-effect returning a promise (like an HTTP request), and
 * updating the UI showing a loading state, an error state and a success state.
 *
 * It works similarily to React Apollo `Mutation` component.
 *
 * The child component(s) to be rendered is specified by passing a function as
 * children, which will be called with `perform` as the first argument, and all
 * the other props as the second argument
 *
 * The child component(s) will be rendered with the following props:
 *
 *   - perform: a function that performs the side effect when called
 *   - loading: a boolean indicating whether the effect is being performed
 *   - error: the rejection error if the promise is rejected, otherwise null
 *   - data: the resolved value if the promise resolves, otherwise null
 *   - any other prop passed to AsyncEffect
 *
 * @example
 * <AsyncEffect perform={functionReturningPromise}>
 *   { (perform, props) => <MyChildComponent {...props} perform={perform} /> }
 * </AsyncEffect>
 */
class AsyncEffect extends React.PureComponent {
  constructor (props) {
    super(props)
    this.wrappedPerform = this.wrappedPerform.bind(this)
    this.state = { loading: false, error: null, data: null }
  }

  wrappedPerform (...args) {
    const { perform } = this.props
    const promise = perform(...args)
    this.setState({ loading: true })
    return promise.then(
      (data) => {
        this.setState({ loading: false, error: null, data })
        return data
      },
      (error) => {
        this.setState({ loading: false, data: null, error })
        throw error
      }
    )
  }

  render () {
    const { children, perform, component: ChildComponent, ...props } = this.props
    const { loading, error, data } = this.state
    return children(this.wrappedPerform, { ...props, loading, error, data })
  }
}

AsyncEffect.propTypes = {
  perform: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
}

export default AsyncEffect
