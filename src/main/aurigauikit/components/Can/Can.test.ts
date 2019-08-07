import { isUserAllowed, ProfilePermission } from './Can'

const permissions1: ProfilePermission = {
  profile: 'admin',
  permissions: [
    { object: 'order', actions: [{ action: 'read', level: 1 }] },
    { object: 'cashpoint', actions: [{ action: 'read', level: 1 }] },
    { object: 'branch', actions: [{ action: 'read', level: 1 }] },
  ],
  exceptions: ['fancyButton'],
}

describe('isUserAllowed', () => {
  it('check permissions', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      actions: ['read'],
      objects: ['order'],
    })
    expect(allowed).toBe(true)
  })

  it('check permissions - fail', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      actions: ['edit'],
      objects: ['order'],
    })
    expect(allowed).toBe(false)
  })

  it('check permissions with exception', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      exception: 'fancyButton',
    })
    expect(allowed).toBe(true)
  })

  it('check permissions with exception - fail', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      exception: 'uglyButton',
    })
    expect(allowed).toBe(false)
  })

  it('check permissions with exception and actions', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      actions: ['read'],
      objects: ['order'],
      exception: 'uglyButton',
    })
    expect(allowed).toBe(true)
  })

  it('check permissions with exception and actions - fail', () => {
    const allowed = isUserAllowed({
      profilePermission: permissions1,
      actions: ['edit'],
      objects: ['order'],
      exception: 'fancyButton',
    })
    expect(allowed).toBe(true)
  })
})
