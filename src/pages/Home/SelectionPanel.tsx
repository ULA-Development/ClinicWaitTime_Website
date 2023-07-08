import React from "react";
import "./SelectionPanel.css";

const SelectionPanel: React.FC = () => {
    const [selectedRadioBtn, setSelectedRadioBtn] = React.useState('Walk-In Clinics') //sets default selection
    const isRadioSelected = (value: string): boolean => selectedRadioBtn === value;
    const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => setSelectedRadioBtn(e.currentTarget.value);

    return (
    <div className="selection-panel">
        <h2 className="panel-heading">Select healthcare type</h2>
        <label>
        <input 
            type='radio'
            name="selection-radio-btn"
            value="Walk-In Clinics"
            checked={isRadioSelected('Walk-In Clinics')}
            onChange={handleRadioClick}
            className="radio-button"
        />
            Walk-In Clinics
        </label>
        <label>
        <input 
            type='radio'
            name="selection-radio-btn"
            value="Hospitals"
            checked={isRadioSelected('Hospitals')}
            onChange={handleRadioClick}
            className="radio-button"
        />
            Hospitals
        </label>
        
        <label>
        <input 
            type='radio'
            name="selection-radio-btn"
            value="Specialists"
            checked={isRadioSelected('Specialists')}
            onChange={handleRadioClick}
            className="radio-button"
        />
            Specialists
        </label>
        <label>
        <input 
            type='radio'
            name="selection-radio-btn"
            value="Family Physician"
            checked={isRadioSelected('Family Physician')}
            onChange={handleRadioClick}
            className="radio-button"
        />
            Family Physicians
        </label>
    </div>
    );
}

export default SelectionPanel;