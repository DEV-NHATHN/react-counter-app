
const Like = ({ liked, onToggleLike }) => {
   let classes = "fa fa-heart"
   if (!liked) classes += "-o"

   return (
      <>
         <i className={classes} aria-hidden="true"
            onClick={onToggleLike}
            style={{ cursor: "pointer" }}
         ></i>
      </>
   );
}

export default Like;
