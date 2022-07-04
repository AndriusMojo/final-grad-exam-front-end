import css from './Grid.module.css';

function Grid(props) {
  return (
    <div className={css.grid}>
        {props.children}
        
    </div>
  )
}

export default Grid;