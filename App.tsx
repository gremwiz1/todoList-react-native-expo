import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import TaskManager from './src/components/taskManager';

export default function App()  {
  return (
    <Provider store={store}>
      <TaskManager />
    </Provider>
  );
};