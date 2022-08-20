import React from 'react'
import PropTypes from 'prop-types'

const ListGroup = props => {
   const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props

   return (
      <ul className="list-group" style={{ color: '#000000d9' }}>
         {items.map(item => {
            return (
               <li key={item[valueProperty]} className={item === selectedItem ? 'list-group-item active' : 'list-group-item'} style={{ cursor: "pointer" }}
                  onClick={() => onItemSelect(item)}
               >
                  {item[textProperty]}
               </li>
            )
         })}
      </ul>
   )
}

ListGroup.propTypes = {
   items: PropTypes.array.isRequired,
   textProperty: PropTypes.string.isRequired,
   valueProperty: PropTypes.string.isRequired,
   onItemSelecte: PropTypes.func.isRequired,

}

ListGroup.defaultProps = {
   items: [],
   textProperty: "name",
   valueProperty: "_id",
   onItemSelecte: function () { }

}

export default ListGroup