const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <input className="checkbox" type={type} name={name} checked={checked} onChange={onChange}/>
    );
};

export default Checkbox