import { useState } from 'react';

const UseForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = () => setTick((tick) => tick + 1);
  return update;
};

export default UseForceUpdate;
