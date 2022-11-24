import Dexie from 'dexie';

export const db = new Dexie('Subnets');
db.version(13).stores({
  subnet: '++id, collection, name, subnet, vlan, vrf, gw, location, state',
  user: '++id, username, password, salt'
});
