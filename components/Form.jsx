import React from 'react';
import axios from 'axios';
const conditions = require('../public/conditions.json');

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conditions: conditions.conditions.filter(d => d.isActive)
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { type, value, name, checked } = event.target;
        if(type === 'checkbox') {
            var newConditions = this.state.conditions;
            newConditions[value].checked = checked;
            this.setState({conditions: newConditions});
        }
        else this.setState({[name]: value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const { name, age, gender, location, conditions } = this.state;
        if(age < 18) {
            this.setState({output: name + " is not eligible for a life insurance policy"})
        } else {
            var base = 100, rate, state, temp = 0,
                states = ["ME", "NH", "MA", "RI", "CT", "NY", "NJ", "DE", "DC", "MD", "VA", "NC", "SC", "GA", "FL"];
            rate = Math.floor((age - 18)/5) * 20 + base;
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyCrRMYADJecCTHqAl-AVRZ4-lG9rlxovYA")
                .then(response => {
                    var ac = response.data.results[0].address_components;
                    for(var i = 0; i < ac.length; i++) {
                        if(ac[i].types[0] === "administrative_area_level_1") {
                            state = ac[i].short_name;
                            break;
                        }
                    }
                    if(states.includes(state)) rate *= 0.95;
                    conditions.forEach(condition => {
                        if(condition.checked) temp += (rate * condition.cost);
                    });
                    rate += temp;
                    if(gender === 'female') rate -= 12;
                    this.setState({output: name + "'s policy is estimated at $" + rate.toFixed(2)});
                });
        }
    }
    
    render() {
        const { conditions, output } = this.state;
        return (
            <div>
                <h1>T.I.C.K.L.E.</h1>
                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                    <legend>Please provide your information</legend>
                    <div className="pure-control-group">
                        <label>First name:</label>
                        <input type="text" name="name" onChange={this.handleChange} required />
                    </div>
                    <div className="pure-control-group">
                        <label>Age:</label>
                        <input type="number" name="age" onChange={this.handleChange} required />
                    </div>
                    <div className="pure-control-group">
                        <label>Gender:</label>
                        <input type="radio" name="gender" value="male" onChange={this.handleChange} required /> Male
                        <input type="radio" name="gender" value="female" onChange={this.handleChange} required /> Female
                    </div>
                    <div className="pure-control-group">
                        <label>Location:</label>
                        <input type="text" name="location" onChange={this.handleChange} required />
                    </div>
                    <div  className="pure-controls">
                        {conditions.map((condition, idx) => (
                            <div key={idx}>
                                <input type="checkbox" name="condition" value={condition.id} onChange={this.handleChange} />
                                {condition.label}
                            </div>
                        ))}
                    </div>
                    <div className="pure-controls">
                        <button type="submit" className="pure-button pure-button-primary">Submit</button>
                    </div>
                </form>
                {output?
                    <div className="result">{output}</div>
                    :
                    <div></div>
                }
            </div>
        )
    }

}