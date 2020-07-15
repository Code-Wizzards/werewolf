const { assignRoles } = require('../assignRoles')

describe('assignRoles', () => {
  it('should assign correct roles', () => {
    const playerList = [
      {
        id: 1,
        name: '1'
      },
      {
        id: 2,
        name: '2'
      },
      {
        id: 3,
        name: '3'
      },
      {
        id: 4,
        name: '4'
      },
      {
        id: 5,
        name: '5'
      },
      {
        id: 6,
        name: '6'
      },
      {
        id: 7,
        name: '7'
      },
    ]

    const result = assignRoles(playerList)

    result.forEach(r => {
      expect(r).toHaveProperty('role')
    });
  })
})