const Day = (props) => {
  return (
    <div className="day">
      <p>{props.day}</p>
      <img className="image-weather" src={props.image} />
      <p><span>min : {props.min.toFixed(1)}</span>, <span>max : {props.max.toFixed(1)}</span></p>
  

    </div>
  )
}


export default Day

