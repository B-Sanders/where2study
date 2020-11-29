import React from "react";
import {FlexboxGrid, SelectPicker, Rate, Input} from 'rsuite';

const locationData = [
   {
    "label": "Geisel",
    "value": "Geisel"
  },
  {
    "label": "Price Center",
    "value": "Price Center"
  }
]
const inputStyles = { 
  width: 224, display: 'block', marginBottom: 10 
};

const classData = [
  {
    "label": "CSE 12",
    "value": "CSE 12"
  },
  {
    "label": "CSE 110",
    "value": "CSE 110"
  }
]

class SearchBar extends React.Component{
    render(){
        return(
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <SelectPicker
                  size="lg"
                  placeholder="Search by Location"
                  data={locationData}
                  style={inputStyles}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <SelectPicker
                  size="lg"
                  placeholder="Search by Class"
                  data={classData}
                  style={inputStyles}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Rate defaultValue={0} allowHalf />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Input style={{ width: 300 }} placeholder="Filter by end time" />;
                </FlexboxGrid.Item>
              </FlexboxGrid>
        )
    }
}

export default SearchBar;