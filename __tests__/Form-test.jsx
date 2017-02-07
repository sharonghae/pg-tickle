import React from 'react';
import { shallow } from 'enzyme'; //returns a copy of the component without needing the actual DOM
import Form from '../components/Form.jsx';
let conditions = require('../public/conditions.json');
conditions = conditions.conditions.filter(d => d.isActive);

describe('<Form />', () => {

    let root;
    beforeAll(() =>
        root = shallow(<Form />)
    );

    test("renders input field for name", () => {
        expect(root.find('input[name="name"]')).toHaveLength(1);
    });

    test("renders input field for age", () => {
        expect(root.find('input[name="age"]')).toHaveLength(1);
    });

    test("renders input field for gender", () => {
        expect(root.find('input[name="gender"]')).toHaveLength(2);
    });

    test("renders input field for location", () => {
        expect(root.find('input[name="location"]')).toHaveLength(1);
    });

    test("renders input field for health conditions", () => {
        expect(root.find('input[name="condition"]')).toHaveLength(5);
    });

    test("renders a submit button", () => {
        expect(root.find('button[type="submit"]')).toHaveLength(1);
    });

});

describe('when submitted', () => {

    let root = shallow(<Form />);

    test('returns expected output for not eligible age', () => {
        var testConditions = conditions;
        testConditions[4].checked = true;

        root.setState({
            name: "Petr",
            age: 10,
            gender: "male",
            location: "Los Angeles",
            conditions: testConditions
        });
        root.find('form').simulate('submit', { preventDefault() {} });
        setTimeout(() => {
            try {
                expect(root.state().output).toBe("Petr is not eligible for a life insurance policy");
            } catch (error) {
                done.fail(error);
            }
        });
    });
    
    test('returns expected output for east coast location and female', () => {
        var testConditions = conditions;
        testConditions[0].checked = true;

        root.setState({
            name: "Kelly",
            age: 50,
            gender: "female",
            location: "Boston",
            conditions: testConditions
        });

        root.find('form').simulate('submit', { preventDefault() {} });
        setTimeout(() => {
            try {
                expect(root.state().output).toBe("Kelly's policy is estimated at $199.09");
            } catch (error) {
                done.fail(error);
            }
        });
    });

    test('returns expected output for multiple conditions and female', () => {
        var testConditions = conditions;
        testConditions[2].checked = true;
        testConditions[3].checked = true;

        root.setState({
            name: "Jan",
            age: 30,
            gender: "female",
            location: "New York",
            conditions: testConditions
        });
        root.find('form').simulate('submit', { preventDefault() {} });
        setTimeout(() => {
           try {
               expect(root.state().output).toBe("Jan's policy is estimated at $154.25");
           } catch (error) {
               done.fail(error);
           }
        });
    });
    

});