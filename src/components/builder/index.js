import React, { Component } from 'react'
import styled from 'styled-components'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Row = styled.div`
  display: flex;
`
const Cell = styled.div`
  box-sizing: border-box;
  border: 1px solid blue;
  min-width: 5.5rem;
  background: red;
`

export default class Builder extends React.Component {
    state = {
        selectedDays: [],
    };
    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    };
    render() {
        return (
            <div>
              <h1>TypePlan. Choose awesomeness</h1>
              <form action="/save_dates.html" method="post">
                <label for="typeform-url" >Typeform url?</label>
                <input type="text" name="typeform-url" />
                <br/>
                <DayPicker
                    selectedDays={this.state.selectedDays}
                    onDayClick={this.handleDayClick}
                />
                <br/>
                Optional: add time slots:
                <fieldset>
                  <br/>
                  <label for="from-time-1" >Time slot 1?</label>
                  <input type="text" name="from-time-1" /> -
                  <input type="text" name="to-time-1" />
                  <br/>
                  <label for="from-time-2" >Time slot 2?</label>
                  <input type="text" name="from-time-2" /> -
                  <input type="text" name="to-time-2" />
                  <br/>
                  <br/>
                  <a href="#">+ add more slots</a>
                  <br/>
                </fieldset>
                <input type="submit" value="Submit" />

              </form>
            </div>
        );
    }
}
