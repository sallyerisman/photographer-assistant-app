const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
      <label className="checkbox-wrapper">
        <input className="checkbox" type={type} name={name} checked={checked} onChange={onChange}/>
        <span className="checkmark"></span>
      </label>
    );
};

export default Checkbox

