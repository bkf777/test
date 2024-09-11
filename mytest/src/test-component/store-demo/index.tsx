import React, { useEffect, useState } from 'react';
import store from './store';
import { addItem, removeItem } from './actions';

const App: React.FC = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const handleChange = () => {
      setState(store.getState());
    };
    store.subscribe(handleChange);
    return () => {
      // 取消订阅
    };
  }, []);

  const handleAddItem = () => {
    store.dispatch(addItem('New Item'));
  };

  const handleRemoveItem = (index: number) => {
    store.dispatch(removeItem(index));
  };

  return (
    <div>
      <ul>
        {state.items.map((item: string, index: number) => (
          <li key={index}>
            {item} <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default App;