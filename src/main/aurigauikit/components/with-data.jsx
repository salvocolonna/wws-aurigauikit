import React from 'react'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'

export default mappers => Component => {
  const isLoading = (key, loading) => {
    const boolean = loading === true || loading === false
    const array = loading => Array.from({ ...loading, length: mappers[key].fetch.length })
    return boolean ? loading : array(loading).reduce((a, n) => a && n, true)
  }

  const load = (key, i) => ({ data }) => {
    if (i || i === 0) {
      const loading = { ...data.loading, [key]: { ...data.loading[key], [i]: true } }
      return { data: { ...data, loading } }
    } else return { data: { ...data, loading: { ...data.loading, [key]: true } } }
  }

  const unload = (key, i) => ({ data }) => {
    if (i || i === 0) {
      const loading = { ...data.loading, [key]: { ...data.loading[key], [i]: false } }
      return { data: { ...data, loading } }
    } else return { data: { ...data, loading: { ...data.loading, [key]: false } } }
  }

  const loadError = (key, error) => ({ data }) => {
    const errors = { ...data.errors, [key]: error }
    return { data: { ...data, errors } }
  }

  const loadSuccess = (key, response) => ({ data }) => {
    const original = { ...data.original, [key]: response }
    return { data: { ...data, [key]: response, original } }
  }

  const initialize = instance => (data, key) => ({
    ...data,
    loading: {
      ...data.loading,
      [key]: isArray(mappers[key].fetch)
        ? mappers[key].fetch.reduce((l, _, i) => ({ ...l, [i]: false }), {})
        : false,
    },
    errors: { ...data.errors, [key]: null },
    original: { ...data.original, [key]: null },
    update: { ...data.update, [key]: value => instance.update(key, value) },
    restore: { ...data.restore, [key]: () => instance.restore(key) },
    submit: { ...data.submit, [key]: () => instance.submit(key) },
    saving: { ...data.saving, [key]: false },
    [key]: mappers[key].value || null,
  })

  return class extends React.Component {
    state = {
      data: Object.keys(mappers).reduce(initialize(this), {
        loading: {},
        errors: {},
        original: {},
        update: {},
        restore: {},
        submit: {},
        saving: {},
      }),
    }

    componentDidMount() {
      this.fetch()
    }

    update = (key, value) => {
      const loading = this.state.data.loading[key]
      if (!isLoading(key, loading))
        this.setState(({ data }) => ({ data: { ...data, [key]: value } }))
    }

    restore = key => {
      const loading = this.state.data.loading[key]
      if (!isLoading(key, loading))
        this.setState(({ data }) => ({ data: { ...data, [key]: data.original[key] } }))
    }

    submit = async key => {
      const mapper = mappers[key]
      this.setState(({ data }) => ({
        data: { ...data, saving: { ...data.saving, [key]: true } },
      }))
      try {
        const res = await mapper.submitter.submit(this.props, this.state.data)
        mapper.submitter.success(this.props, res)
      } catch (e) {
        mapper.submitter.error(this.props, e)
      } finally {
        this.setState(({ data }) => ({
          data: { ...data, saving: { ...data.saving, [key]: false } },
        }))
      }
    }

    fetch = () => {
      const keys = Object.keys(mappers)
      const fetch = key => {
        const mapper = mappers[key]
        const fetchList = (fetcher, i) => {
          return new Promise(async resolve => {
            this.setState(load(key, i))
            try {
              const responder = await fetcher(this.props)
              if (responder) {
                const response = isFunction(responder) ? responder(this.state.data) : responder
                this.setState(loadSuccess(key, response))
              }
            } catch (error) {
              this.setState(loadError(key, error))
              if (mapper.error) {
                if (isArray(mapper.error)) mapper.error[i](this.props, error)
                else if (isFunction(mapper.error)) mapper.error(this.props, error)
              }
            } finally {
              this.setState(unload(key, i), () => resolve(this.state.data[key]))
            }
          })
        }
        return new Promise(async resolve => {
          if (isArray(mapper.fetch)) {
            await Promise.all(mapper.fetch.filter(Boolean).map(fetchList))
            resolve(this.state.data[key])
          } else if (isFunction(mapper.fetch)) {
            this.setState(load(key))
            try {
              const responder = await mapper.fetch(this.props)
              if (responder) {
                const response = isFunction(responder) ? responder(this.state.data) : responder
                this.setState(loadSuccess(key, response))
              }
            } catch (error) {
              this.setState(loadError(key, error))
              if (mapper.error) mapper.error(this.props, error)
            } finally {
              this.setState(unload(key), () => resolve(this.state.data[key]))
            }
          }
        })
      }
      return Promise.all(keys.map(fetch))
    }

    render() {
      const { data } = this.state
      return <Component {...this.props} fetcher={data} />
    }
  }
}
