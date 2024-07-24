import { atom } from 'recoil';

export const currentTripAtom = atom({
  key: 'currentTrip',
  default: {
    trip: {},
    car: {},
    tickets: [],
    totalPrices: 0,
    start_point: '',
    end_point: '',
    break_point_id: null
  }
});
