
const Counter = ({ counter, children, onDelete, onIncrement, onDecrement }) => {

   return (
      <div>
         {children}
         <span className={getBadgeClasses(counter.value)}>
            {counter.value === 0 ? 'Zero' : counter.value}
         </span>
         <button className="btn btn-secondary btn-sm"
            onClick={() => onIncrement(counter)}
         >Increment</button>
         <button className="btn btn-secondary btn-sm"
            onClick={() => onDecrement(counter)}
            disabled={counter.value === 0 ? true : false}
         >Decrement</button>
         <button className="btn btn-danger btn-sm"
            onClick={() => onDelete(counter.id)}
         >Delete</button>
      </div>
   );
}

export default Counter;


function getBadgeClasses(value) {
   let classes = "badge m-2 badge-";
   classes += value === 0 ? 'warning' : 'primary';
   return classes;
}
