import React, { useState, useEffect } from 'react';

function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
    // console.log(history) //[FIRST, SECOND] because history state hasn't been updated yet - it is put aside at this point and will be updated at the end
    if (replace) {
      const newHistory = [...history]; // [FIRST, SECOND]
      
      // pop() returns a value, not an array
      // newHistory.pop().push(newMode);
      newHistory.pop() // [FIRST]
      
      newHistory.push(newMode); // [FIRST, THIRD]

      setHistory(newHistory)
    }
  }

  function back() {
    if (history.length > 1) {
      const newHistory = [...history]
      
      newHistory.pop();

      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return {
    mode,
    transition,
    back
  }
}

export default useVisualMode;