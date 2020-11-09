import { useStaticRendering } from 'mobx-react';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

class RootStore {
  constructor() {
    
  }
}

export default function initializeStore() {
  if (isServer) {
    return new RootStore()
  } else {
    if (store === null) {
      store = new RootStore()
    }
    return store
  }
}