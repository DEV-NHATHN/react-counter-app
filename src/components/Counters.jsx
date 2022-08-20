import Counter from './Counter.jsx';
import { useState } from 'react';

const stateObj = {
   counters:
      [
         { id: 1, value: 1 },
         { id: 2, value: 2 },
         { id: 3, value: 3 },
         { id: 4, value: 4 },
      ]
}

const Counters = () => {
   const [state, setState] = useState(stateObj)

   const handleDelete = (id) => {
      const counters = state.counters.filter(c => c.id !== id)
      setState({ counters })
   }

   const handleReset = () => {
      setState({ ...stateObj })
   }

   const handleIncrement = (counter) => {
      const counters = [...state.counters]
      const index = counters.indexOf(counter)
      counters[index] = { ...counter }
      counters[index].value++
      setState({ counters })
   }

   const handleDecrement = (counter) => {
      const counters = [...state.counters]
      const index = counters.indexOf(counter)
      counters[index] = { ...counter }
      counters[index].value--
      setState({ counters })
   }

   return (
      <>
         <button className="btn btn-primary btn-sm m-2"
            onClick={handleReset}
         >Reset</button>
         {state.counters.map((counter, counteridx) => {
            return (
               <Counter
                  key={counteridx}
                  counter={counter}

                  onDelete={handleDelete}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
               >
                  <h4>Counter #{counter.id}</h4>
               </Counter>
            )
         })}
      </>
   );
}

export default Counters;