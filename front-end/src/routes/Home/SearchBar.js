import React from "react";
import {FlexboxGrid, SelectPicker, Rate, Input, Button, Icon, InputPicker, DatePicker, Divider} from 'rsuite';
import locationData from "../locations.json";
import classData from "../courses.json";
const inputStyles = { 
  width: 224, display: 'block', marginBottom: 10 
};


const noiseData = [
    {
        "label": <Rate readOnly defaultValue={1} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": <Rate readOnly defaultValue={1} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
    },
    {
        "label": <Rate readOnly defaultValue={2} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": <Rate readOnly defaultValue={2} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
    },
    {
        "label": <Rate readOnly defaultValue={3} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": <Rate readOnly defaultValue={3} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
    },
    {
        "label": <Rate readOnly defaultValue={4} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": <Rate readOnly defaultValue={4} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
    },
    {
        "label": <Rate readOnly defaultValue={5} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} />,
        "value": <Rate readOnly defaultValue={5} size="x-sm" character={<Icon icon="volume-up" style={{ color: 'rgba(0, 106, 150, 0.75)' }} />} /> 
    }

]

class SearchBar extends React.Component{
    render(){
        return(
          <Divider>
            <FlexboxGrid justify="center" >
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
                  <InputPicker
                  size="lg"
                  placeholder="Search by Noise Level"
                  data={noiseData}
                  style={inputStyles}
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                   <DatePicker size="lg" placeholder="Search by Estimated End Time" format="HH:mm" ranges={[]} />
                </FlexboxGrid.Item>
            </FlexboxGrid>
          </Divider>
        )
    }
}

export default SearchBar;